"""The editor's reconciliations on the research packs (24 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Faro|Portugal|Algarve|Olhão|Tavira|Loulé|Estói|Albufeira|Porches|Lagoa|Silves|Monchique|Sagres|Culatra)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # Faz Gostos is cut (venue pack 1, 24 Oct: no 2026 trace; CHECKin has occupied its rooms since July 2022)
 ("CHECKin by Leonel Pereira or Faz Gostos, both inside the walls", "CHECKin by Leonel Pereira, on Rua do Castelo"),
 # the island boat's pier: the packs disagree (Porta Nova vs Cais das Portas do Mar) — printed as a dispute, not resolved
 ("Estaminé on Ilha Deserta, by boat from the Cais das Portas do Mar;", "Estaminé on Ilha Deserta, by the Animaris boat from the old-town waterfront (listings name the Porta Nova pier or the Cais das Portas do Mar: ask when you book);"),
]
CARD_SET = {       # key -> {field: value} overrides
}
CARD_DROP_FACTS = {}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 24 Oct re-check
 "v03-estamin-ilha-deserta": {"address": "Ilha da Barreta (Ilha Deserta), Faro; Animaris boats from the old-town waterfront (listings name the Porta Nova pier or the Cais das Portas do Mar)"},
}
LANE_STORY_SET = {  # the stories lane re-cut after the packs: Faz Gostos is gone
 "street": {"title": "Two markets and a bifana", "where": "Mercado Municipal de Faro, Faro Centro; Mercado de Olhão, Olhão; Snack Bar da Xica, Mercado Municipal de Faro",
  "story": "The street food of this coast is bought where the fish comes in, and eaten before noon. Faro's own Mercado Municipal is the plain city market off the Largo Dr. Francisco Sá Carneiro, its present building nineteen years old in February 2026: fish and shellfish on one side, fruit and greens on the other. At its counter Snack Bar da Xica opens at seven and sells the bifana for cash. Ten minutes east by train, Olhão's two waterfront halls are the fishing port's own market and the one to show a chef. All three are morning places: by early afternoon the stalls are closing."},
 "stories": {"title": "An island and a street", "where": "Estaminé, Ilha Deserta; CHECKin by Leonel Pereira, Cidade Velha",
  "story": "Two of Faro's tables with a past sit at opposite ends of a boat ride. Estaminé is the only building on Ilha da Barreta, the sand island across the Ria Formosa that the boats call Ilha Deserta; it burned in March 2021 and Animaris, which runs the boats, rebuilt it to work on solar power and make its own water. Inside the walls, on Rua do Castelo, Leonel Pereira left the starred kitchen of São Gabriel in 2020 to open CHECKin, a smaller room that won a Bib Gourmand in 2021 and moved into its present rooms in 2022. One is lunch only and depends on the boat; the other is dinner, Monday to Saturday."},
}
HOT_DROP = ["Feira de Santa Iria, last day Sun 25 October"]   # told once: the fair lives on its calendar card (the audit found the two sharing 13 shingles); it ends on 25 Oct
HOT_SET = {}
# the packs' venue_hot lines quoted the May record's hours where the 24 Oct venue packs found conflicts: rewritten to what the packs support
VENUE_HOT = {
 "v11-mercado-de-olh-o": "Mornings from about 07:00: go before 09:00 for the boats' fish and the lagoon's clams and oysters; on Saturday the outdoor market is on the front.",
 "v12-mercado-municipal-de-faro": "A morning market: the day's fish and shellfish, then a bifana at the counter before the boats go out.",
 "v-snack-bar-da-xica": "The bifana and a small beer on a market morning: the warm bite for a cool late-October start.",
 "v08-adega-nova": "Grilled fish, or the picanha on its hot stone, in the big walk-in room for the first cool evenings; its listed days disagree, so call.",
 "v04-tasca-do-ricky": "The cataplana for the first cool evenings; summer's no-booking rule is over, so call ahead — dinner Monday to Saturday by its listings.",
}

def cards(C):
    C.pop("provisioning:Krater", None)   # the wine shop could not be found trading anywhere (rewrite pack 2): cut
    for k, labs in CARD_DROP_FACTS.items():
        C[k]["facts"] = [f for f in C[k]["facts"] if f[0] not in labs]
    for k, c in C.items():
        for f in ("teaser", "story", "why", "name"):
            for a, b in EDITS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
        for fa in c.get("facts") or []:
            for a, b in EDITS:
                if a in fa[1]: fa[1] = fa[1].replace(a, b)
        c.update(CARD_SET.get(k, {}))
    for k, c in C.items():   # every Maps query carries a local token (the gate's wrong-continent check)
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + ", Faro, Portugal"

def hot(H):
    H["venue_hot"] = VENUE_HOT   # A Venda dropped: it may close for the winter
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Faro, Portugal"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
