# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | `N09` |
| `nomCommun` | Nom vernaculaire de l'espèce | texte | non vide, absent des données | - |`tomate`|
| `groupe` | groupe botanique de la plante | texte | l'un des deux `angiosperme` ou `gynomsperme` |- |`angiosperme`|
| `nombrePlants` |nombre de plants | entier | positif ou 0 | - | `8` |
|`dateReleve`| date d'ajout des information à la base de donnée | date | Année-mois-jour | - |`2026-10-20`|

**Listes de valeurs autorisées** : id : écrit en majuscule  (`N01`,`N02`, `N03`, `N04`, `N09`, `N10`)
nomCommun : nom vernaculaire écrit en miniscule (`cacao`, `maïs`, `riz`, `tomate`, `citronnier`, `pin`, `cycas`)
groupe(`angiosperme`,`gymnosperme`)
nombrePlants( valeur minimal = 0, valeur maximal: pas de limite, pas de valeur négatif ou décimal)
date (suivant la notation anneé-mois-jour)
**Sources** : données du fichier plants.json.