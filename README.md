# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

L'outil est utilisé par l'assistant d'une pépinière pédagogique. Il désire faire un inventaire structé qui lui permettra de retrouver une espèce, lire son groupe botanique et voir la quantité de plants disponible pour cette espèce. L'outil renvoie le nombre total de plants, le nombre d'espèce et de plants par groupe botanique, et un nouveau tableau avec les espèces dont le nombre de plant est inférieur ou égal à 10. l'outil n'observe pas les étiquettes, les photos ou les specimens pour réperer un organe végétatif et un organe reproducteur.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

- [X] Données lues et enregistrées dans `donnees/plants.json`
- [X] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [X] Lister l'inventaire, message si l'inventaire est vide
- [X] Rechercher par code ou par nom ; filtrer par groupe botanique
- [X] Trier par nombre de plants
- [X] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [X] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni

## Données
Fichier : donnees/plants.json
Nombre de lignes : 72 lignes 

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Ebenezer François Konan DIBY , EDIBY. Entraide : YOBOUE Grace Danielle
