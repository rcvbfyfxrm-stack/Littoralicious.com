# SOCIAL-POSTS.md — the post canon

> Inherits DNA.md (voice, pillars, banned words, no emoji) and ATTENTION-PLAYBOOK.md
> (unique angle, ownable move, sameness audit). This file adds the rules specific to
> posts. It governs data/social-posts.json and every future automated drop.

## The law

**Better three posts than lose the substance. One is enough if the angle is perfect.**

1. **Max 3 posts per article. Minimum 1.** Volume is not reach — a weak post teaches
   the algorithm and the reader to skip you.
2. **Every post teaches a yacht chef something.** Each post carries a `fact` field:
   the ONE thing a working chef learns or the curiosity hook that makes them need the
   article. If you cannot state the fact in one sentence, the post does not ship.
3. **The fact must be true and traceable to the article.** No invented numbers, no
   "studies show". If the article grades evidence, the post inherits the caution.
4. **Hooks are unique across the whole corpus.** Never reuse a device (the "30% squeeze"
   rule: one article owns a number-hook, the next must find its own). Max 6 words,
   no exclamation marks, no questions-as-clickbait.
5. **No self-promo posts.** A post about how rigorous the series is, or how much time a
   tool saves you, is noise. The product is the fact.
6. **Design = the litto poster.** White card, Georgia serif hook, sea-blue kicker,
   LITTORALICIOUS wordmark — built to sit beside a black-and-white photo
   (grayscale is forced in the renderer). The `brief` field art-directs the pairing:
   what B&W image or pencil plate completes the post.
7. **Honesty gate** (Playbook §V): if the reader saw the tactic named, would they feel
   respected or tricked? If tricked, cut it.

## Schema (data/social-posts.json)

```json
{
  "generated": "YYYY-MM-DD",
  "articles": {
    "<slug>": {
      "title": "...", "cat": "Section label",
      "posts": [{
        "id": "<slug>__0",
        "hook": "≤6 words, serif headline",
        "subhook": "one italic line under the hook (optional)",
        "caption": "150–220 words. Opens on the fact, not the article. Concrete numbers. Closes: The full piece is on Littoralicious @littoralicious — link in bio.",
        "fact": "The one thing a yacht chef learns — one sentence.",
        "brief": "B&W art direction: what photo/pencil plate pairs with this card.",
        "hashtags": ["yachtchef", "..."],
        "type": "single | carousel | reel-idea",
        "slot": "weekday-midday | weekday-evening | weekend-morning | weekend-evening",
        "why": "one-line marketing rationale"
      }]
    }
  }
}
```

## Process

- Posts are generated FROM the published article (never from the idea), reviewed in
  /studio-social.html, favourited into the weekly schedule, exported as 4:5 / 1:1 PNG.
- Regeneration replaces an article's posts wholesale; favourites reset — favourite
  only what you would actually publish.
- The corpus-level sameness audit runs before any batch lands: no duplicate hooks,
  no repeated opening device within the last 5 scheduled posts.
