#!/usr/bin/env python3
"""Fetch the 3 chosen CC photos and convert to true B&W grayscale JPGs.

Input:  photos.json — [{subject, file_url, author, licence, caption}] (from verified story pack)
        argv[1] = out img dir
Writes: <out>/piraeus-<n>-<slug>.jpg  + a manifest build/photos-manifest.json (re-wire without re-fetch)
"""
import json, sys, pathlib, urllib.request, re
from PIL import Image, ImageOps

HERE = pathlib.Path(__file__).parent
photos = json.load(open(HERE / "photos.json"))
OUT = pathlib.Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)

manifest = []
for n, p in enumerate(photos, 1):
    slug = re.sub(r"[^a-z0-9]+", "-", p["subject"].lower())[:24].strip("-")
    dest = OUT / f"piraeus-{n}-{slug}.jpg"
    if not dest.exists():
        req = urllib.request.Request(p["file_url"], headers={"User-Agent": "littoralicious-terroir/1.0 (contact: arnaudcallier@pm.me)"})
        raw = HERE / f"raw-{n}.tmp"
        raw.write_bytes(urllib.request.urlopen(req, timeout=60).read())
        img = Image.open(raw).convert("RGB")
        img.thumbnail((1600, 1600))
        ImageOps.grayscale(img).save(dest, "JPEG", quality=82)
        raw.unlink()
    manifest.append({"src": f"/terroir/Athens-Attiki/img/{dest.name}",
                     "caption": p["caption"], "credit": f'{p["author"]} / Wikimedia Commons · {p["licence"]}'})
    print(f"{dest.name}: {dest.stat().st_size} bytes")
json.dump(manifest, open(HERE / "photos-manifest.json", "w"), ensure_ascii=False, indent=1)
print("manifest written")
