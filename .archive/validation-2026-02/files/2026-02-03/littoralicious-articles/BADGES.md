# Littoralicious Badge Taxonomy

Badges classify every piece of content for the long-term Chef Thesaurus. Each article carries badges in its frontmatter. Badges are namespaced — `category:value` — so they can be filtered, sorted, and cross-referenced.

---

## How Badges Work

```yaml
badges:
  season: winter
  region: mediterranean
  type: fish
  technique: curing
  difficulty: advanced
  thesaurus: salt-cod
```

Every article gets badges. The `thesaurus` badge is the canonical entry name — the term this article would file under in a physical chef's reference book.

---

## Badge Categories

### `season:`
When the content is most relevant.

| Badge | Months (Northern Hemisphere) |
|-------|------------------------------|
| `spring` | March — May |
| `summer` | June — August |
| `autumn` | September — November |
| `winter` | December — February |
| `year-round` | No seasonal dependency |

*For Southern Hemisphere cruising grounds, invert. Note both if the ingredient has different seasons by region.*

### `region:`
Where the content originates or applies.

| Badge | Scope |
|-------|-------|
| `mediterranean` | Western Med, Adriatic, Aegean, Levantine |
| `atlantic-europe` | Bay of Biscay, Channel, North Sea, Scandinavia |
| `caribbean` | Caribbean Sea, Gulf of Mexico |
| `pacific` | US West Coast, Hawaii, South Pacific, Oceania |
| `indian-ocean` | Maldives, Seychelles, East Africa, Western Australia |
| `southeast-asian` | Thailand, Vietnam, Indonesia, Philippines, Malaysia |
| `nordic` | Norway, Sweden, Denmark, Finland, Iceland |
| `east-asian` | Japan, Korea, China |
| `middle-eastern` | Levant, Gulf States, North Africa |
| `south-american` | Brazil, Argentina, Chile, Peru |
| `global` | Not region-specific |

### `type:`
Primary ingredient classification.

| Badge | Covers |
|-------|--------|
| `fish` | Finfish — wild and farmed |
| `shellfish` | Crustaceans, bivalves, cephalopods |
| `meat` | Beef, pork, lamb, goat |
| `poultry` | Chicken, duck, game birds |
| `game` | Venison, boar, rabbit, wild birds |
| `dairy` | Milk, cream, butter, cheese, yogurt |
| `vegetable` | All vegetables including roots and tubers |
| `fruit` | Fresh and dried fruits |
| `grain` | Wheat, rice, corn, ancient grains, pasta |
| `legume` | Beans, lentils, chickpeas |
| `herb` | Fresh and dried herbs |
| `spice` | Dried spices, seeds, bark, blends |
| `fungi` | Mushrooms, truffles, yeasts |
| `seaweed` | Kelp, nori, kombu, sea vegetables |
| `oil-fat` | Olive oil, butter, rendered fats, nut oils |
| `fermented` | Miso, soy sauce, vinegar, kimchi, preserved items |
| `sugar-chocolate` | Sugars, honey, chocolate, confectionery |

### `technique:`
Primary cooking or preparation method.

| Badge | Covers |
|-------|--------|
| `raw` | Crudo, ceviche, tartare, sashimi |
| `cure` | Salt-curing, sugar-curing, gravlax |
| `smoke` | Hot smoke, cold smoke, wood types |
| `ferment` | Lacto-fermentation, vinegar, koji, kombucha |
| `preserve` | Confit, jam, pickle, dehydration |
| `emulsion` | Vinaigrettes, mayo, hollandaise, beurre blanc |
| `sear` | Pan-sear, griddle, plancha, wok |
| `roast` | Oven roast, spit, rotisserie |
| `grill` | Open flame, charcoal, wood-fired |
| `braise` | Low-slow wet heat, stew, daube |
| `sous-vide` | Precision water bath, low-temp cooking |
| `fry` | Deep fry, shallow fry, tempura |
| `bake` | Bread, pastry, gratin |
| `steam` | Steaming, en papillote, pressure cook |
| `freeze` | Cryogenic, ice cream, granita, frozen prep |
| `extract` | Stock, broth, infusion, reduction, consomme |
| `butchery` | Fabrication, portioning, yield optimization |
| `pastry` | Dough, batter, lamination, sugar work |

### `difficulty:`
Assumed skill level for execution.

| Badge | Meaning |
|-------|---------|
| `fundamental` | Any trained cook. Mise en place and basic heat control. |
| `intermediate` | Requires timing, multi-component coordination. |
| `advanced` | Precision-dependent. Failure likely without practice. |
| `master` | Years of specific practice. Specialist territory. |

### `service:`
Where in the meal this applies.

| Badge | Covers |
|-------|--------|
| `canape` | Passed bites, amuse-bouche |
| `starter` | First course, antipasti |
| `main` | Centre plate |
| `dessert` | Sweet course, petit fours |
| `breakfast` | Morning service |
| `buffet` | Spread, family-style, deck lunch |
| `crew-meal` | Crew feeding — value, volume, satisfaction |
| `pantry` | Cheese course, charcuterie, grazing boards |

### `science:`
For Evidence and research-linked content.

| Badge | Covers |
|-------|--------|
| `food-chemistry` | Maillard, denaturation, emulsification, oxidation |
| `nutrition` | Macros, micros, bioavailability, dietary science |
| `food-safety` | HACCP, temperature control, pathogens, shelf life |
| `physics` | Heat transfer, fluid dynamics, pressure, crystallization |
| `microbiology` | Fermentation, culture, spoilage, preservation |
| `sensory` | Flavor perception, aroma, texture, umami |

### `industry:`
For Trade Winds and Horizon content.

| Badge | Covers |
|-------|--------|
| `regulation` | MLC, STCW, flag state, food safety law |
| `employment` | Salary, hiring, agencies, contracts |
| `certification` | Courses, qualifications, EHO, Ship San |
| `event` | Competitions, conferences, gatherings |
| `market` | Charter trends, fleet data, economic signals |
| `technology` | Equipment standards, platforms, galley tech |
| `award` | Michelin, 50 Best, regional awards, recognition |
| `sustainability` | Ocean health, sourcing ethics, waste reduction |

### `thesaurus:`
The canonical entry name. Lowercase, hyphenated. This is the term the article would file under in the Chef Thesaurus.

Examples: `salt-cod`, `emulsion-stability`, `maillard-reaction`, `ikejime`, `bouillabaisse`, `knife-sharpening`, `caribbean-provisioning`

---

## Badge Rules

1. Every article gets at minimum: `season`, `region`, `thesaurus`
2. Ingredient articles add: `type`
3. Technique articles add: `technique`, `difficulty`
4. Recipe/Heritage articles add: `type`, `technique`, `service`, `difficulty`
5. Evidence articles add: `science`
6. News articles add: `industry`
7. The `thesaurus` badge is always singular — one canonical term per article
8. If an article spans multiple regions or seasons, list the primary one and note others in the body
