"""Which hub each town belongs to (Arnaud, 5 Oct 2026: three guides — Siracusa + Val di Noto ·
Catania + Etna south · Taormina + Etna north)."""
SIRACUSA = {"Siracusa", "Ortigia", "Palazzolo Acreide", "Noto", "Modica", "Ragusa", "Marina di Ragusa", "Marzamemi",
            "Rosolini", "Vittoria", "Avola", "Pachino", "Sortino", "Scicli", "Portopalo", "Cassibile", "Augusta"}
CATANIA = {"Catania", "Acireale", "Aci Trezza", "Aci Castello", "Gravina di Catania", "Viagrande", "Milo", "Zafferana Etnea",
           "Nicolosi", "Aci Sant'Antonio", "Bronte", "Caltagirone", "Santa Venerina", "Misterbianco"}
TAORMINA = {"Taormina", "Castelmola", "Giardini Naxos", "Linguaglossa", "Castiglione di Sicilia", "Randazzo", "Riposto",
            "Giarre", "Motta Camastra", "Savoca", "Forza d'Agrò", "Messina", "Ganzirri", "Passopisciaro", "Solicchiata"}
def hub(town):
    t = (town or "").strip()
    for name, s in (("siracusa", SIRACUSA), ("catania", CATANIA), ("taormina", TAORMINA)):
        if t in s: return name
    return None
