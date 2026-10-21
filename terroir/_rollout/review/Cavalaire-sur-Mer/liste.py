"""La liste for Cavalaire-sur-Mer (21 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish articles, gem stories, drink cards and the
verified venue packs; every 'where' is a venue kept in the tables or a card kept in the larder or the bars."""
LISTE = [
 ("Soupe de poissons de roche", "soop de pwa-SON de rosh", True, "Rockfish simmered and sieved into a rust-coloured broth, with rouille and croutons.",
  "What the coast actually eats when it is not eating bouillabaisse.", "Maurin des Maures, Le Rayol-Canadel — on the corniche, open year-round per its listings; call", "Maurin des Maures Rayol-Canadel Var France"),
 ("Bouillabaisse", "boo-ya-BESS", True, "Several rockfish cooked one after another in a saffron broth; the broth first, the fish after.",
  "Marseille’s dish, but this bay orders it the day before, for at least two people.", "Maurin des Maures, Le Rayol-Canadel — order it the day before", "Maurin des Maures Rayol-Canadel Var France"),
 ("The morning catch", "lah PESH doo ZHOOR", True, "Rascasse, girelle and chapon for soup, bream and bass, sometimes a spider crab.",
  "Bought off the boat on the quay, the way the port has always sold it.", "The fishermen’s stand, Quai Marc Pajot — mid-morning, weather and catch permitting", "Quai Marc Pajot Cavalaire-sur-Mer Var France"),
 ("Grand aïoli", "grahn eye-OH-lee", False, "Garlic emulsion with salt cod, boiled vegetables, snails and egg.",
  "Provence stops for it; eat it once, slowly.", "Le Comptoir des Saveurs, Nouveau Port — seasonal; check it is open", "Le Comptoir des Saveurs Cavalaire-sur-Mer Var France"),
 ("Tapenade and anchoïade", "ta-pe-NAD · an-sho-YAD", False, "Olive-and-caper paste, and anchovy-and-garlic paste, on bread with the first glass.",
  "The two smears of the apéro; the name tapenade comes from the Provençal for the caper.", "The Wednesday market, Place Jean Moulin — mornings, year-round", "Place Jean Moulin Cavalaire-sur-Mer Var France"),
 ("Panisses", "pa-NEESS", False, "Fried batons of set chickpea flour, eaten with salt.",
  "Marseille street food with Ligurian roots, sold on this coast too.", "The Wednesday market, Place Jean Moulin — if a stall fries them that morning", "Place Jean Moulin Cavalaire-sur-Mer Var France"),
 ("Daube provençale", "dohb pro-vahn-SAL", False, "Beef braised for hours in red wine with orange peel and olives.",
  "The winter dish of the hills; on the port it comes as beef cheek.", "Le Comptoir des Saveurs, Nouveau Port — the daube of beef cheek; seasonal", "Le Comptoir des Saveurs Cavalaire-sur-Mer Var France"),
 ("Tarte tropézienne", "tart tro-pay-ZYEN", True, "A sugar-crusted brioche filled with two creams.",
  "Named, the story goes, at Bardot’s suggestion on a film set in 1955.", "La Tarte Tropézienne, the house Alexandre Micka founded, Saint-Tropez", "La Tarte Tropezienne Saint-Tropez Var France"),
 ("Marrons glacés", "ma-RON gla-SAY", False, "Whole chestnuts candied slowly in syrup; and the crème de marrons, the jar you carry home.",
  "The Maures’ single-kernel chestnut, turned into sugar in the village that grows it.", "The confectioners of Collobrières, forty minutes inland", "Collobrieres Var France"),
 ("Côtes de Provence rosé", "koht de pro-VAHNS ro-ZAY", True, "Pale, dry pink from Grenache, Cinsault and friends, drunk young and cold.",
  "Nine bottles in ten of the appellation are pink; buy it at the estate, not the beach club.", "Domaine de la Croix, La Croix-Valmer — at the cellar", "Domaine de la Croix La Croix-Valmer Var France"),
 ("Cru Classé rosé", "krew kla-SAY", False, "A rosé from one of the estates ranked in 1955.",
  "A classified growth you can drink in sight of the vines that made it.", "Château Minuty, Gassin — at the cellar door", "Chateau Minuty Gassin Var France"),
 ("Tibouren", "tee-boo-REN", False, "The peninsula’s old red grape, made into a savoury, garrigue-scented rosé.",
  "The one Provence pink that tastes of this coast rather than of fashion.", "Ask for it at the estates of the peninsula; La Grange à Vins, La Croix-Valmer, can pour one", "La Grange a Vins La Croix-Valmer Var France"),
 ("Rolle", "ROLL", False, "Vermentino by its local name: a white of citrus pith and salt.",
  "The partner the morning catch actually wants.", "Domaine La Tourraque, Ramatuelle — inside the protected capes", "Domaine La Tourraque Ramatuelle Var France"),
 ("Pastis", "pas-TEESS", False, "Anise spirit with five parts cold water, poured before lunch in the shade.",
  "Marseille’s drink, and the hour the whole coast keeps.", "Any port café; Ô Petit Bar on the marina for the hour", "O Petit Bar Cavalaire-sur-Mer Var France"),
]
DISH_WHERE = {
 "Soupe de poissons de roche": '<a href="#venue-v-maurin-des-maures">Maurin des Maures</a>, Le Rayol-Canadel',
 "Bouillabaisse": '<a href="#venue-v-maurin-des-maures">Maurin des Maures</a>, ordered the day before',
 "Grand aïoli": '<a href="#venue-v-le-comptoir-des-saveurs">Le Comptoir des Saveurs</a>, on the Nouveau Port, in season',
 "Tapenade": '<a href="#venue-v-marche-place-jean-moulin">the Wednesday market</a>, Place Jean Moulin',
}
