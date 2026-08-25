#!/usr/bin/env python3
"""Serve a guide, render it in real Chrome, read the DOM back, screenshot it.

Why this is not `curl` plus grep: the guides assemble themselves in JS, and the two
load-bearing data contracts fail SILENTLY — a guide whose organiser never ran looks
identical on disk to one that works. The only honest check is the rendered DOM.

Why this is not `--dump-dom`: Chrome 151 dropped `--headless=old` and `--dump-dom`
never returns for these pages. See cdp.py's docstring. We drive CDP instead.

    python3 render_smoke.py http://127.0.0.1:8811/terroir/Diani-Kwale/ /tmp/out
    python3 render_smoke.py <url> <out-prefix> [ready-js] [scroll-to-selector]

Writes <out-prefix>.html (the rendered DOM) and <out-prefix>.png, and prints any
console errors and failed loads. Exits 1 if the ready expression never came true.
"""
import base64, json, os, sys, tempfile, time, urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cdp

# The organiser has finished when it has built cards. NOT "gx-torg__card": those are
# legacy Girona-era classes and nothing emits them (checks_gold4.py says so in as many
# words), so cdp.render_dom's own fast path can never fire and it always burns its full
# deadline. `.fcard__name` is the signal that actually fires.
READY_DEFAULT = "document.querySelectorAll('.fcard__name').length>0"

# Loopback must resolve (that's the guide) and unpkg must resolve (that's Leaflet).
# Everything else is blackholed: these guides hold an open Firestore channel and pull
# map tiles, so network-idle never arrives and an unblocked render hangs instead of
# failing. It also guarantees a local render can never touch anything live.
HOST_RULES = "--host-resolver-rules=MAP * 0.0.0.0, EXCLUDE 127.0.0.1, EXCLUDE unpkg.com"


class EvWS(cdp.WS):
    """cdp.WS.call discards every message that isn't its own reply, which throws away
    the console errors and failed loads that are the whole point of watching a render.
    Keep them."""

    def __init__(self, *a, **k):
        super().__init__(*a, **k)
        self.events = []

    def call(self, method, params=None, timeout=30):
        self._id += 1
        mid = self._id
        self.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        deadline = time.time() + timeout
        while time.time() < deadline:
            msg = json.loads(self.recv())
            if msg.get("id") == mid:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})
            if "method" in msg:
                self.events.append(msg)
        raise TimeoutError(method)


def render(url, out, ready=READY_DEFAULT, scroll_to=None, settle=3.0, wait=30):
    profile = tempfile.mkdtemp(prefix="render-smoke-")
    proc, port = cdp._launch(profile, [HOST_RULES])
    try:
        tabs = json.load(urllib.request.urlopen(
            f"http://127.0.0.1:{port}/json/list", timeout=15))
        page = next(t for t in tabs if t.get("type") == "page")
        ws = EvWS(page["webSocketDebuggerUrl"], timeout=90)
        try:
            for d in ("Page", "Runtime", "Log", "Network"):
                ws.call(f"{d}.enable")
            ws.call("Page.navigate", {"url": url}, timeout=60)
            time.sleep(settle)

            def ev(expr):
                r = ws.call("Runtime.evaluate",
                            {"expression": expr, "returnByValue": True}, timeout=45)
                return (r.get("result") or {}).get("value")

            ok, deadline = not ready, time.time() + wait
            while not ok and time.time() < deadline:
                if ev(ready):
                    ok = True
                    break
                time.sleep(0.75)
            if scroll_to:
                ev(f"(document.querySelector({scroll_to!r})||document.body)"
                   ".scrollIntoView({block:'start'})")
                time.sleep(0.8)

            dom = ev("document.documentElement.outerHTML") or ""
            shot = ws.call("Page.captureScreenshot", {"format": "png"}, timeout=60)
            open(out + ".html", "w").write(dom)
            open(out + ".png", "wb").write(base64.b64decode(shot["data"]))

            problems = []
            for e in ws.events:
                m, p = e.get("method"), e.get("params", {})
                if m == "Runtime.exceptionThrown":
                    d = p.get("exceptionDetails", {})
                    problems.append("EXCEPTION " + str(
                        (d.get("exception") or {}).get("description") or d.get("text"))[:200])
                elif m == "Log.entryAdded" and p.get("entry", {}).get("level") == "error":
                    problems.append("LOG " + p["entry"].get("text", "")[:200])
                elif m == "Network.loadingFailed":
                    problems.append("NETFAIL " + str(p.get("errorText")))
            return {"ready": ok, "dom": dom, "problems": problems}
        finally:
            ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except Exception:
            proc.kill()


if __name__ == "__main__":
    url, out = sys.argv[1], sys.argv[2]
    ready = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] != "-" else READY_DEFAULT
    scroll = sys.argv[4] if len(sys.argv) > 4 and sys.argv[4] != "-" else None
    r = render(url, out, ready=ready, scroll_to=scroll)
    print(f"URL   {url}")
    print(f"READY {r['ready']}   DOM {len(r['dom'])} bytes -> {out}.html / {out}.png")
    # 404s on local assets are the interesting ones and the server log names them;
    # CDP only reports that something failed. /favicon.ico is expected noise.
    for line in dict.fromkeys(r["problems"]):
        print("  !", line)
    if not r["problems"]:
        print("  (no console errors, no failed loads)")
    sys.exit(0 if r["ready"] else 1)
