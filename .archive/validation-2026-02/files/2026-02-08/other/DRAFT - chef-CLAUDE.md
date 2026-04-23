# CLAUDE.md — Chef's Thesaurus

Vault professionnel de chef yacht. Obsidian, 1,700+ fichiers (markdown, PDFs, images).

**Point d'entree**: `_References/VAULT-INDEX.md`

## Structure du Vault

```
chef/
  01-Cuisines/           Maitrise regionale par tier (Pinnacle/Core/Arsenal)
  02-Flavors/            Ingredients par famille, vins, fromages, matrices
  03-Techniques/         Methodes par discipline (Classic, Modernist, Efficiency...)
  04-Recipes/            Collection par type de service
  05-Yacht-Operations/   Menus, provisions, guests, suppliers, protocols
  _References/           PDFs, equipment, allergens, conversions, seasonal calendars
```

## Systeme de Tiers (01-Cuisines)

| Tier | Role |
|------|------|
| **Pinnacle** | Niveau 3 etoiles, yachts 100m+ (French-Classic, Japanese-Kaiseki) |
| **Core** | 95% des demandes guests (Italian-Riviera, Mediterranean, Thai) |
| **Arsenal** | Variete semaines 4-10, specialisations en developpement |

## Conventions de Nommage

| Type | Format | Exemple |
|------|--------|---------|
| Contenu | `Title-Case-Hyphen.md` | `French-Classic.md` |
| Index | `_Index.md` | chaque dossier en a un |
| Templates | `_Template-Name.md` | `_Template-Ingredient.md` |
| Donnees | `SCREAMING_SNAKE.txt` | `CUISINE_FRENCH_BEST.txt` |
| Dossiers support | `_FolderName` | `_References` |

## Templates

Templates dans leurs dossiers respectifs, pas de repertoire central.

| Template | Emplacement |
|----------|-------------|
| `_Template-Cuisine.md` | `01-Cuisines/` |
| `_Template-Ingredient.md` | `02-Flavors/Ingredients/` |
| `_Template-Technique.md` | `03-Techniques/` |
| `_Template-Recipe.md` | `04-Recipes/` — structure complete pour population de recettes |
| `_Template-Trip.md` | `05-Yacht-Operations/` |

## Operations Courantes

### Ajouter une cuisine
1. Determiner le tier (Pinnacle/Core/Arsenal)
2. Creer `01-Cuisines/{Tier}/{Cuisine-Name}.md` depuis `_Template-Cuisine.md`
3. Mettre a jour `_Index.md` du tier et de `01-Cuisines/`

### Documenter une technique
1. Identifier la discipline dans `03-Techniques/` (Classic, Modernist, Efficiency, etc.)
2. Copier `_Template-Technique.md` — remplir: Discipline, Difficulty, Yacht Feasibility, Science, Protocol
3. Ajouter a `_Index.md` de la discipline

### Ajouter un ingredient
1. Identifier la famille dans `02-Flavors/Ingredients/` (Sea, Land, Garden, Dairy, Spices, Pantry, Grains, Legumes, Live)
2. Copier `_Template-Ingredient.md` — remplir: At a Glance, Story, Selection, Preparations
3. Ajouter a `_Index.md` de la famille

### Creer une recette
1. Copier `04-Recipes/_Template-Recipe.md` — structure complete yacht-adapted
2. Lier ingredients vers `02-Flavors/` et techniques vers `03-Techniques/`

## Frontmatter par Type

- **Cuisine**: YAML avec `tier`, `region`, `tags`
- **Ingredient**: Pas de YAML. Table "At a Glance" (Family, Origin, Season, Terroir)
- **Technique**: Header metadata (Discipline, Difficulty, Time Investment, Yacht Feasibility)
- **Recipe**: YAML avec `cuisine`, `course`, `servings`, `difficulty`, `tags`

## Integration NEXUS

Agents et templates chef dans le projet NEXUS: `NEXUS/agent-library/Agent - Chef - *.md` et `NEXUS/template-library/Template - Chef - *.md`.

## Proprietaire

Arnaud Callier
