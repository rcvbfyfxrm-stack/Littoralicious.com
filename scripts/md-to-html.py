#!/usr/bin/env python3
"""
Markdown → Littoralicious article HTML.

Converts a reviewed draft markdown into an HTML file that matches the existing
article template (same masthead, nav, article header, and annotation classes as
`articles/garlic-the-immortal-bulb.html`).

Status: SCAFFOLD. The frontmatter parsing + page shell are implemented. Inline
annotation parsing (blockquote → `.note--*`) is a TODO. For now this emits the
full page chrome + a straight markdown-rendered body, so a human still polishes
the annotations by hand — a meaningful reduction from today's "author the
entire HTML file" baseline but not yet zero-touch.

Usage:
    python3 scripts/md-to-html.py <input.md> --out articles/<slug>.html
"""
from __future__ import annotations

import argparse
import html
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    import markdown  # type: ignore
except ImportError:
    markdown = None

from dna_lint_parse import parse_frontmatter  # local helper below


CATEGORY_LABELS = {
    "shore-larder": "Shore Larder",
    "the-method": "The Method",
    "littoral-heritage": "Littoral Heritage",
    "the-evidence": "The Evidence",
    "the-bridge": "The Bridge",
    "port-call": "Port Call",
    "signal-fire": "Signal Fire",
    "the-locker": "The Locker",
    "trade-winds": "Trade Winds",
    "tight-ship": "Tight Ship",
    "the-horizon": "The Horizon",
    "recipe": "The Blueprint",
}


def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s).strip("-")
    return s


ANNOTATION_TYPES = {"science", "key", "action", "warning", "quote"}

ANNOTATION_BLOCK_RE = re.compile(
    r"""
    ^>\s*\[!(?P<type>\w+)\](?P<label>[^\n]*)\n   # opening line: > [!type] optional label
    (?P<body>(?:^>\s?.*\n?)*)                    # continuation lines starting with >
    """,
    re.MULTILINE | re.VERBOSE,
)


def _render_annotation(annotation_type: str, label: str, inner_md: str) -> str:
    if markdown is not None:
        inner_html = markdown.markdown(inner_md, extensions=["extra"])
    else:
        paragraphs = [p.strip() for p in inner_md.split("\n\n") if p.strip()]
        inner_html = "\n".join(f"<p>{html.escape(p)}</p>" for p in paragraphs)
    label_attr = f' data-label="{html.escape(label)}"' if label else ""
    return (
        f'<aside class="note note--{annotation_type}"{label_attr}>\n'
        f"{inner_html}\n"
        f"</aside>"
    )


SENTINEL_RE = re.compile(r"@@ANNOTATION:(\d+)@@")


def _fallback_render(md: str) -> str:
    """Very small markdown fallback — used when the `markdown` lib is unavailable.
    Splits on blank lines. Blocks that are already raw HTML (start with <) are
    emitted as-is. Lines starting with `# `..`###### ` become headings.
    Everything else becomes <p>...</p> with inline **bold** and *em* handling.
    """
    out: list[str] = []
    for block in re.split(r"\n\s*\n", md.strip()):
        block = block.strip()
        if not block:
            continue
        if block.startswith("<"):
            out.append(block)
            continue
        heading = re.match(r"^(#{1,6})\s+(.*)$", block)
        if heading:
            level = len(heading.group(1))
            out.append(f"<h{level}>{html.escape(heading.group(2))}</h{level}>")
            continue
        text = html.escape(block)
        text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
        text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
        text = re.sub(r"`(.+?)`", r"<code>\1</code>", text)
        out.append(f"<p>{text}</p>")
    return "\n\n".join(out)


def render_body(md_body: str) -> str:
    """Convert body markdown → HTML. Annotation blocks are swapped via a
    non-markup sentinel so neither the markdown parser nor the fallback
    escapes them."""
    annotations: list[str] = []

    def stash(m: re.Match) -> str:
        annotation_type = m.group("type").lower()
        if annotation_type not in ANNOTATION_TYPES:
            return m.group(0)
        label = m.group("label").strip()
        body_raw = m.group("body")
        body_lines = [re.sub(r"^>\s?", "", line) for line in body_raw.splitlines()]
        inner_md = "\n".join(body_lines).strip()
        idx = len(annotations)
        annotations.append(_render_annotation(annotation_type, label, inner_md))
        return f"\n\n@@ANNOTATION:{idx}@@\n\n"

    prepped = ANNOTATION_BLOCK_RE.sub(stash, md_body)

    if markdown is None:
        out = _fallback_render(prepped)
    else:
        out = markdown.markdown(
            prepped,
            extensions=["extra", "tables", "fenced_code", "sane_lists"],
        )

    def swap(m: re.Match) -> str:
        idx = int(m.group(1))
        return annotations[idx] if 0 <= idx < len(annotations) else m.group(0)

    # Handle the case where the parser wrapped the sentinel in <p>...</p>.
    out = re.sub(r"<p>\s*@@ANNOTATION:(\d+)@@\s*</p>", lambda m: swap(m), out)
    out = SENTINEL_RE.sub(swap, out)
    return out


ARTICLE_TEMPLATE = """<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{description}">
    <title>{title} — LITTORALICIOUS</title>
    <meta property="og:title" content="{title} — LITTORALICIOUS">
    <meta property="og:description" content="{og_description}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.littoralicious.com/articles/{slug}.html">
    <meta property="og:site_name" content="Littoralicious">
    <meta property="og:image" content="https://www.littoralicious.com/assets/logo/og-image.png">
    <link rel="alternate" type="application/rss+xml" title="Littoralicious" href="https://www.littoralicious.com/feed.xml">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="icon" type="image/svg+xml" href="../assets/logo/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
    <header class="masthead">
        <div class="container">
            <div class="masthead__inner">
                <div class="masthead__brand">
                    <a href="/" class="masthead__logo"><img src="../assets/logo/logo.svg" alt="Littoralicious" style="height: 60px; display: block; margin: 0 auto;">LITTORALICIOUS</a>
                    <span class="masthead__tagline">Modern Science &middot; Regional Recipes &middot; From the Sea</span>
                    <span class="masthead__description">Sailing Around The Plate &mdash; Littoraly Delicious</span>
                </div>
                <nav class="masthead__nav">
                    <a href="../shore-larder.html">Shore Larder</a>
                    <a href="../the-method.html">The Method</a>
                    <a href="../littoral-heritage.html">Heritage</a>
                    <a href="../the-evidence.html">The Evidence</a>
                    <a href="../the-bridge.html">The Bridge</a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <article class="article">
            <header class="article__header container">
                <div class="article__meta">
                    <span class="article__category">{category_label}</span>
                    <time class="article__date">{date_pretty}</time>
                    <span class="article__reading-time">{read_time} min read</span>
                </div>
                <h1 class="article__title">{title}</h1>
                <p class="article__lede">{lede}</p>
            </header>

            <div class="article__body container">
{body}
            </div>
        </article>
    </main>

    <footer class="site-footer">
        <div class="container">
            <p>&copy; {year} Littoralicious. An independent publication for yacht chefs.</p>
        </div>
    </footer>
</body>
</html>
"""


def build(md_path: Path, out_path: Path) -> None:
    raw = md_path.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(raw)

    title = fm.get("title") or md_path.stem
    slug = fm.get("slug") or slugify(title)
    category = fm.get("category", "shore-larder")
    category_label = CATEGORY_LABELS.get(category, category.replace("-", " ").title())
    date_str = fm.get("date") or datetime.today().strftime("%Y-%m-%d")
    try:
        date_pretty = datetime.strptime(date_str, "%Y-%m-%d").strftime("%B %-d, %Y")
    except ValueError:
        date_pretty = date_str
    read_time = fm.get("read_time", 10)

    # Lede = first paragraph of body (after stripping the # H1 if present).
    body_clean = re.sub(r"^#\s+.+?\n+", "", body.lstrip(), count=1)
    paragraphs = [p.strip() for p in body_clean.split("\n\n") if p.strip()]
    lede = paragraphs[0] if paragraphs else ""
    # Strip markdown emphasis from the lede for the header render.
    lede_text = re.sub(r"[*_`]", "", lede)

    description = fm.get("description") or lede_text[:280]
    og_description = description[:200]

    rendered = render_body(body_clean)

    html_out = ARTICLE_TEMPLATE.format(
        title=html.escape(str(title)),
        slug=slug,
        description=html.escape(description),
        og_description=html.escape(og_description),
        category_label=html.escape(category_label),
        date_pretty=html.escape(date_pretty),
        read_time=read_time,
        lede=rendered and paragraphs and f"{html.escape(lede_text)}" or "",
        body=rendered,
        year=datetime.today().year,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html_out, encoding="utf-8")
    print(f"wrote {out_path}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("input", help="Path to draft markdown")
    ap.add_argument("--out", required=True, help="Output HTML path")
    args = ap.parse_args()

    md_path = Path(args.input)
    if not md_path.exists():
        print(f"md-to-html: input not found: {md_path}", file=sys.stderr)
        return 2
    out_path = Path(args.out)
    if out_path.exists():
        print(f"md-to-html: refusing to overwrite existing {out_path} — pass a different --out or delete it first.",
              file=sys.stderr)
        return 3
    build(md_path, out_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
