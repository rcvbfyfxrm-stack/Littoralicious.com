# Draft review surface — `drafts.html`

Auto-updating private page that lists every draft and lets the review team leave
notes that persist online. Built on the rebuild's single-`main` + `"draft": true`
model — no per-draft branches, no manual JSON editing.

## How it works

1. An article is a **draft** when its entry in `data/articles.json` has `"draft": true`.
2. `npm run build` regenerates `data/draft-articles.json` from that flag (see `tools/build.mjs`).
3. **`drafts.html`** fetches `data/draft-articles.json` at runtime and renders one card
   per draft, each linking to the article (`?draft=1`).
4. A **GitHub Action** (`.github/workflows/drafts-deploy.yml`) runs the build and deploys
   to a fixed Firebase Hosting **preview channel `drafts`** on every push to `rebuild/publishing-system`
   (plus a weekly keep-alive so the 30-day channel never lapses).
5. **Review notes** live in Firestore at `draft-notes/{slug}/notes/{id}` and update live
   via `onSnapshot`. They are gated to a **reviewer email allowlist** in `firestore.rules`.

The flag *is* the auto-update: flip it, push, the page reflects it. No branch merging.

## One-time setup (manual — needs console/CLI access; not done by the build)

1. **Enable Google sign-in:** Firebase console → Authentication → Sign-in method → enable Google.
2. **Set the reviewer allowlist:** edit the emails in `firestore.rules` (`isReviewer()`),
   then deploy the rules: `firebase deploy --only firestore:rules`.
   (`firebase.json` already has the `firestore` block pointing at `firestore.rules`.)
3. **Create the deploy secret:** run `firebase init hosting:github` once, or add a service-
   account JSON as the repo secret **`FIREBASE_SERVICE_ACCOUNT_LITTORALICIOUS_WEB_ECEED`**.
4. **Authorize the channel domain (if the sign-in popup is blocked):** Firebase console →
   Authentication → Settings → Authorized domains → add the `--drafts` channel `*.web.app` host.
5. **Push to `rebuild/publishing-system`.** The Action deploys and prints the channel URL
   (`https://littoralicious-web-eceed--drafts-<hash>.web.app/drafts.html`). Bookmark it.

## Privacy model (read this)

- The channel URL is **unlisted, not authenticated** — never rely on URL secrecy.
- `drafts.html` and `data/draft-articles.json` are `robots.txt`-blocked + `noindex`.
- The **real privacy boundary is the Firestore allowlist**: only allowlisted emails can read
  or write `draft-notes/**`. The draft *list* (titles/ledes) is not secret; the *notes* are.
- `articles/**` rules are left open to preserve existing public comments/reactions. Tighten
  later if needed — do not remove without migrating `community.js`.

## Caveats

- **Channel expiry:** 30 days of no deploy kills the URL. The weekly `schedule:` cron re-arms it;
  trigger `workflow_dispatch` manually if drafts go quiet for long.
- **Orphan drafts:** `articles/draft-*.html` files that aren't registered in `articles.json`
  with `"draft": true` will NOT appear. Reconcile or delete them during the rebuild migration.
- **The three recipe Blueprints** (focaccia, quiche, pita) currently live on their own
  `draft/*-blueprint` branches as `articles/draft-*.html`. To surface them here, add each as a
  normal `articles/<slug>.html` + an `articles.json` entry with `"draft": true` when the
  rebuild lands.
- This page is part of the **publication only** — keep the Sextant game fully separate.
