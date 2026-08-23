#!/usr/bin/env python3
"""Minimal Chrome DevTools Protocol driver — stdlib only, no pip, no puppeteer.

Why this exists: Chrome 151 dropped `--headless=old` and `--dump-dom` never returns for
the terroir guides (verified against the live Diani build too, so it is the browser, not
the page). The render gate is not optional — the two load-bearing data contracts fail
SILENTLY — so we drive Chrome over CDP instead and read the DOM ourselves.

Usage:
    from cdp import render_dom
    html = render_dom("http://127.0.0.1:1234/page.html", settle_ms=2500, timeout=60)
"""
import base64, json, os, re, shutil, socket, struct, subprocess, tempfile, time, urllib.request

CHROME = next((p for p in (
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome", "/usr/bin/chromium",
) if os.path.exists(p)), None)


class WS:
    """A websocket client just capable enough for CDP: text frames, client-masked, no
    extensions, no continuation frames beyond reassembly."""

    def __init__(self, url, timeout=30):
        m = re.match(r"ws://([^:/]+):(\d+)(/.*)", url)
        if not m:
            raise ValueError(f"bad ws url {url}")
        host, port, path = m.group(1), int(m.group(2)), m.group(3)
        self.sock = socket.create_connection((host, port), timeout=timeout)
        self.sock.settimeout(timeout)
        key = base64.b64encode(os.urandom(16)).decode()
        req = (f"GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nUpgrade: websocket\r\n"
               f"Connection: Upgrade\r\nSec-WebSocket-Key: {key}\r\n"
               f"Sec-WebSocket-Version: 13\r\n\r\n")
        self.sock.sendall(req.encode())
        self.buf = b""
        while b"\r\n\r\n" not in self.buf:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise ConnectionError("handshake failed")
            self.buf += chunk
        head, self.buf = self.buf.split(b"\r\n\r\n", 1)
        if b"101" not in head.split(b"\r\n")[0]:
            raise ConnectionError(f"handshake refused: {head[:120]}")
        self._id = 0

    # ---- frame plumbing ----
    def _recv_exact(self, n):
        while len(self.buf) < n:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise ConnectionError("socket closed")
            self.buf += chunk
        out, self.buf = self.buf[:n], self.buf[n:]
        return out

    def send(self, text):
        payload = text.encode()
        mask = os.urandom(4)
        masked = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        n = len(payload)
        if n < 126:
            hdr = struct.pack("!BB", 0x81, 0x80 | n)
        elif n < (1 << 16):
            hdr = struct.pack("!BBH", 0x81, 0x80 | 126, n)
        else:
            hdr = struct.pack("!BBQ", 0x81, 0x80 | 127, n)
        self.sock.sendall(hdr + mask + masked)

    def recv(self):
        data, fin = b"", False
        while not fin:
            b0, b1 = self._recv_exact(2)
            fin = bool(b0 & 0x80)
            opcode = b0 & 0x0F
            ln = b1 & 0x7F
            if ln == 126:
                ln = struct.unpack("!H", self._recv_exact(2))[0]
            elif ln == 127:
                ln = struct.unpack("!Q", self._recv_exact(8))[0]
            chunk = self._recv_exact(ln)
            if opcode == 0x8:                       # close
                raise ConnectionError("server closed")
            if opcode == 0x9:                       # ping -> pong
                self.sock.sendall(struct.pack("!BB", 0x8A, 0x80 | len(chunk))
                                  + b"\x00\x00\x00\x00" + chunk)
                fin = False
                continue
            if opcode == 0xA:                       # pong
                fin = False
                continue
            data += chunk
        return data.decode(errors="replace")

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
        raise TimeoutError(method)

    def close(self):
        try:
            self.sock.close()
        except Exception:
            pass


def _launch(profile, extra_flags=()):
    """Start headless Chrome with an ephemeral debug port; return (proc, port)."""
    proc = subprocess.Popen(
        [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
         "--disable-dev-shm-usage", "--disable-extensions", "--disable-sync",
         "--disable-background-networking", "--disable-component-update",
         "--metrics-recording-only", "--mute-audio", "--window-size=1400,2000",
         f"--user-data-dir={profile}", "--remote-debugging-port=0", *extra_flags,
         "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # A loaded machine (or a pile of stray headless Chromes from other jobs) can push
    # startup well past 20 s, so wait generously before giving up.
    portfile = os.path.join(profile, "DevToolsActivePort")
    for _ in range(900):                                    # up to ~90 s
        if os.path.exists(portfile):
            txt = open(portfile).read().split("\n")
            if txt and txt[0].strip().isdigit():
                return proc, int(txt[0].strip())
        if proc.poll() is not None:
            raise RuntimeError("chrome exited during startup")
        time.sleep(0.1)
    proc.terminate()
    raise TimeoutError("chrome never published a debug port")


def render_dom(url, settle_ms=2500, timeout=75, quiet_hosts=True, tries=2):
    """Retry once: browser startup is the flaky part, not the page."""
    last = None
    for attempt in range(tries):
        try:
            return _render_once(url, settle_ms, timeout, quiet_hosts)
        except (TimeoutError, RuntimeError, ConnectionError, OSError) as ex:
            last = ex
            time.sleep(3)
    raise last


def _render_once(url, settle_ms=2500, timeout=75, quiet_hosts=True):
    """Navigate, let the page's own scripts build the DOM, then return outerHTML.

    We do NOT wait for network idle: these guides hold an open Firestore channel and map
    tiles, so idle never arrives. We wait for DOMContentLoaded plus a settle window, and
    additionally poll until the organiser has actually built cards (or the window expires).
    """
    if not CHROME:
        raise RuntimeError("no Chrome binary found")
    profile = tempfile.mkdtemp(prefix="terroir-cdp-")
    flags = []
    if quiet_hosts:
        # keep loopback and the Leaflet CDN reachable; blackhole the rest so nothing hangs
        flags.append("--host-resolver-rules=MAP * 0.0.0.0, EXCLUDE 127.0.0.1, EXCLUDE unpkg.com")
    proc = None
    try:
        proc, port = _launch(profile, flags)
        tabs = json.load(urllib.request.urlopen(
            f"http://127.0.0.1:{port}/json/list", timeout=15))
        page = next(t for t in tabs if t.get("type") == "page")
        ws = WS(page["webSocketDebuggerUrl"], timeout=timeout)
        try:
            ws.call("Page.enable")
            ws.call("Runtime.enable")
            ws.call("Page.navigate", {"url": url}, timeout=timeout)
            deadline = time.time() + min(timeout - 5, 45)
            best = ""
            time.sleep(settle_ms / 1000)
            while time.time() < deadline:
                r = ws.call("Runtime.evaluate",
                            {"expression": "document.documentElement.outerHTML",
                             "returnByValue": True}, timeout=30)
                html = (r.get("result") or {}).get("value") or ""
                if len(html) > len(best):
                    best = html
                # the organiser building cards is the signal the kit has finished
                if "gx-torg__card" in html and "gx-card__full" in html:
                    return html
                time.sleep(0.75)
            return best
        finally:
            ws.close()
    finally:
        if proc:
            proc.terminate()
            try:
                proc.wait(timeout=10)
            except subprocess.TimeoutExpired:
                proc.kill()
        shutil.rmtree(profile, ignore_errors=True)


if __name__ == "__main__":
    import sys
    dom = render_dom(sys.argv[1])
    print(f"{len(dom)} bytes")
    for k in ("gx-torg__group", "gx-torg__card", "gx-card__full", 'class="fcard"',
              "leaflet-marker-icon", "gembox", "gxb-door"):
        print(f"  {k}: {dom.count(k)}")
