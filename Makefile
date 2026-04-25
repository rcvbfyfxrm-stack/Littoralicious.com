# Littoralicious — Content Operations
# Run targets with: make [target]

REVIEW_DIR := content/review
DATE := $(shell date +%Y-%m-%d)
WEEK := $(shell date +%V)

.PHONY: weekly review clean-review list-review sitemap help lint status publish validate links pages review-stale extract-suppliers

## Generate weekly brief — creates dated folder and triggers agent
weekly:
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "LITTORALICIOUS WEEKLY BRIEF"
	@echo "Week $(WEEK) — $(DATE)"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@mkdir -p $(REVIEW_DIR)
	@echo ""
	@echo "Review folder ready: $(REVIEW_DIR)/"
	@echo ""
	@echo "Run the agent:"
	@echo "  claude 'Follow .claude/agents/weekly-brief.md to generate this week's brief.'"
	@echo ""
	@echo "Templates:  content/template/01-13"
	@echo "Badges:     content/BADGES.md"
	@echo "Agent:      .claude/agents/weekly-brief.md"
	@echo "Output:     $(REVIEW_DIR)/"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

## List articles in review
review:
	@echo "Articles pending review:"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@ls -1 $(REVIEW_DIR)/*.md 2>/dev/null | sort || echo "  (none)"
	@echo ""
	@echo "Total: $$(ls -1 $(REVIEW_DIR)/*.md 2>/dev/null | wc -l | tr -d ' ') articles"

## List review articles with their thesaurus badges
list-review:
	@echo "Review articles — Thesaurus entries:"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@for f in $(REVIEW_DIR)/*.md; do \
		if [ -f "$$f" ]; then \
			title=$$(grep '^title:' "$$f" | head -1 | sed 's/title: *"*//;s/"*$$//'); \
			thesaurus=$$(grep 'thesaurus:' "$$f" | head -1 | sed 's/.*thesaurus: *//'); \
			printf "  %-50s → %s\n" "$$title" "$$thesaurus"; \
		fi \
	done 2>/dev/null || echo "  (none)"

## Remove all review articles (use with caution)
clean-review:
	@echo "Clearing review folder..."
	@rm -f $(REVIEW_DIR)/*.md
	@echo "Done."

## Regenerate sitemap.xml and feed.xml from data/articles.json
sitemap:
	@python3 scripts/regen-sitemap-feed.py

## Lint one draft against DNA (banned words, word count, structure). Usage: make lint FILE=content/review/foo.md
lint:
	@if [ -z "$(FILE)" ]; then echo "Usage: make lint FILE=content/review/<file>.md"; exit 1; fi
	@python3 scripts/dna-lint.py "$(FILE)"

## Regenerate review dashboard at logs/review-status.html
status:
	@python3 scripts/build-review-dashboard.py
	@echo "Open: logs/review-status.html"

## Publish one draft end-to-end (currently: lint only — use /publish-article skill for full pipeline)
publish:
	@if [ -z "$(FILE)" ]; then echo "Usage: make publish FILE=content/review/<file>.md"; exit 1; fi
	@echo "→ Linting $(FILE)"
	@python3 scripts/dna-lint.py "$(FILE)" || (echo "Lint FAILED — fix hard failures before publishing."; exit 1)
	@echo "→ Pass. Run /publish-article in Claude Code to finish (md-to-html, articles.json, sitemap, move)."

## Validate data/articles.json against the filesystem (orphan HTML, missing entries, dup slugs, bad dates)
validate:
	@python3 scripts/validate-articles-json.py

## Check every external link in articles/ (writes logs/link-check-YYYY-MM-DD.md). Slow — runs in parallel.
links:
	@python3 scripts/check-links.py

## Regenerate category pages from data/articles.json (pages must contain <!-- ARTICLES:BEGIN --> markers)
pages:
	@python3 scripts/regen-category-pages.py

## List drafts in content/review/ older than 30 days (mtime) — stale candidates to resurface or retire
review-stale:
	@echo "Drafts in content/review/ older than 30 days:"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@find content/review -name "*.md" -type f -mtime +30 -print 2>/dev/null | sort | while read f; do \
		age=$$(( ($$(date +%s) - $$(stat -f %m "$$f")) / 86400 )); \
		printf "  %3dd  %s\n" $$age "$${f#content/review/}"; \
	done
	@total=$$(find content/review -name "*.md" -type f -mtime +30 2>/dev/null | wc -l | tr -d ' '); \
		echo ""; echo "Total stale: $$total"

## Extract supplier rows from existing Port Call drafts to data/suppliers-proposed.json (dry-run)
extract-suppliers:
	@python3 scripts/extract-suppliers.py

## Show available targets
help:
	@echo "Littoralicious Content Operations"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  make weekly        Generate weekly brief (agent + templates)"
	@echo "  make review        List articles pending review"
	@echo "  make list-review   List articles with thesaurus badges"
	@echo "  make clean-review  Clear review folder"
	@echo "  make sitemap       Regenerate sitemap.xml + feed.xml from data/articles.json"
	@echo "  make lint FILE=... Lint one draft (banned words, word count, structure)"
	@echo "  make status        Regenerate review dashboard (logs/review-status.html)"
	@echo "  make publish FILE= Publish one draft (lint; use /publish-article for full flow)"
	@echo "  make validate      Sanity-check articles.json vs. filesystem"
	@echo "  make links         Check every external link (slow, writes logs/)"
	@echo "  make pages         Regenerate category pages from articles.json"
	@echo "  make review-stale  List content/review/ drafts older than 30 days"
	@echo "  make extract-suppliers  Parse Port Call drafts → data/suppliers-proposed.json (dry-run)"
	@echo "  make help          Show this help"
	@echo ""
	@echo "Templates:  content/template/"
	@echo "Agent:      .claude/agents/weekly-brief.md"
	@echo "Badges:     BADGES.md"
	@echo "Output:     content/review/"
