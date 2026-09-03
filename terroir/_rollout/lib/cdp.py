#!/usr/bin/env python3
"""Playwright-backed drop-in for the hand-rolled CDP driver.

Same public surface as the original (render_dom); the original is kept beside this
file as cdp.py.orig. Chrome 151 dropped --headless=old and --dump-dom never returns,
which is why the CDP driver existed. Playwright handles both.
"""
import os, subprocess

_HERE = os.path.dirname(os.path.abspath(__file__))
_JS = os.path.join(_HERE, "render_playwright.cjs")
_NODE_PATH = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()


def render_dom(url, settle_ms=2500, timeout=60):
    env = dict(os.environ, NODE_PATH=_NODE_PATH)
    r = subprocess.run(["node", _JS, url, str(settle_ms)],
                       capture_output=True, text=True, timeout=timeout + 30, env=env)
    if r.returncode != 0:
        raise RuntimeError(f"playwright render failed: {r.stderr.strip()[:300]}")
    return r.stdout
