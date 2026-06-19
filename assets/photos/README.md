# Article photo library

Drop article images here (`.jpg` / `.png` / `.webp`). They become searchable in the
Studio photo picker — open a draft's **Notes** in the Studio and click **Add photo**.

After adding or removing images, refresh the manifest the picker reads:

```
node tools/photos.mjs
```

That regenerates `data/photo-library.json`. Keep images on-brand per `content/DNA.md`
(monochrome, no stock photography). This README is not deployed; image files are.
