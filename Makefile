# Littoralicious — Content Operations
# Run targets with: make [target]

REVIEW_DIR := content/review
DATE := $(shell date +%Y-%m-%d)
WEEK := $(shell date +%V)

.PHONY: weekly review clean-review list-review help

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
	@echo "  claude 'Follow agents/weekly-brief.md to generate this week's brief.'"
	@echo ""
	@echo "Templates:  content/template/01-12"
	@echo "Badges:     BADGES.md"
	@echo "Agent:      agents/weekly-brief.md"
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

## Show available targets
help:
	@echo "Littoralicious Content Operations"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  make weekly        Generate weekly brief (agent + templates)"
	@echo "  make review        List articles pending review"
	@echo "  make list-review   List articles with thesaurus badges"
	@echo "  make clean-review  Clear review folder"
	@echo "  make help          Show this help"
	@echo ""
	@echo "Templates:  content/template/"
	@echo "Agent:      agents/weekly-brief.md"
	@echo "Badges:     BADGES.md"
	@echo "Output:     content/review/"
