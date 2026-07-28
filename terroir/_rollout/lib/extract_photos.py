#!/usr/bin/env python3
"""Pull the 3 chosen photos out of verified/story.json into build/photos.json
(the input fetch_photos.py expects). Normalises field names."""
import json, pathlib
HERE = pathlib.Path(__file__).parent
story = json.load(open(HERE.parent / "verified" / "story.json", encoding="utf-8"))
photos = story.get("photos") or []
out = []
for p in photos[:3]:
    out.append({
        "subject": p.get("subject") or p.get("name") or "athens",
        "file_url": p.get("file_url") or p.get("url"),
        "author": p.get("author") or p.get("credit") or "Unknown",
        "licence": p.get("licence") or p.get("license") or "CC BY-SA 4.0",
        "caption": p.get("caption") or p.get("caption_candidate") or "",
    })
json.dump(out, open(HERE / "photos.json", "w"), ensure_ascii=False, indent=1)
print(f"photos.json: {len(out)} chosen")
for p in out:
    print(f"  {p['subject'][:40]:40s} | {p['licence']:14s} | {'OK url' if p['file_url'] else 'NO URL'}")
