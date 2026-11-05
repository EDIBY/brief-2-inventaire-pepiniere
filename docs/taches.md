# Tableau des tâches

> Planifiez vous-même, puis tenez le tableau à jour. Une preuve : un commit, un test vert, un document.

| Tâche | Prévu | Fait le | Preuve |
| --- | --- | --- | --- |
| Poste et dépôt prêts ; besoin compris ; documents commencés | 11-02-2026| 11-03-2026 | https://github.com/EDIBY/brief-2-inventaire-pepiniere/tree/e1f9495a78ab9f71bdcfbc9af213af9d0c86ae72 https://github.com/EDIBY/brief-2-inventaire-pepiniere/tree/fe95301a5862606bdb51bc8e8f7e3baf55e4f199   |
| Fiche 2 : lire et écrire le JSON | 02-11-2026 | 03-11-2026 | https://github.com/EDIBY/brief-2-inventaire-pepiniere/tree/84a51028d6ce1b399dce32dcb9fb1b50c721abb1  |
| Fiche 3 : ajouter et lister ; choix 1 et 2 ; erreurs | 03-11-2026 | 04-11-2026 | https://github.com/EDIBY/brief-2-inventaire-pepiniere/tree/43ba2a79efcfd6470d6ca773ea79d2fdf60d9e51 |
| Fiche 4 : rechercher et trier ; choix 3 et 4 | 03-11-2026|04-2026 |https://github.com/EDIBY/brief-2-inventaire-pepiniere/tree/708ed75c52380d77d1f649a3643f18e44177f5f6 |
| Fiche 5 : synthèse ; choix 5 |03-11-2026 | 04-11-2026| https://github.com/EDIBY/brief-2-inventaire-pepiniere/tree/8be656586d10648848841b354f1416ec36c80f45|
| Tests par un camarade ; mes propres tests | 04-11-2026 | 05-11-2026 | |
| Fiche agronomique ; README ; documents | 02-11-2026 | 03-11-2026 | |
| Dépôt cloné et lancé ailleurs ; démonstration répétée |04-11-2026 | 05-11-2026 | |
| Bonus | 03-11-2026 | 04-11-2026 | |

**Blocages** (le message exact, ce que j'ai essayé, la solution) : 
**Message exact** : 
✔ extension : enregistrerJson écrit un JSON indenté de 2 espaces (8.1645ms)
✖ extension : chargerJson relit ce qu’enregistrerJson a écrit (2.4458ms)
✖ extension : chargerJson laisse remonter l’erreur « fichier absent » (ENOENT) (2.8084ms)
ℹ Error: Test "extension : chargerJson relit ce qu’enregistrerJson a écrit" at test\stockage.test.js:23:1 generated asynchronous activity after the test ended. This activity created the error "ReferenceError: error is not defined" and would have caused the test to fail, but instead triggered an unhandledRejection event.
ℹ Error: Test "extension : chargerJson laisse remonter l’erreur « fichier absent » (ENOENT)" at test\stockage.test.js:30:1 generated asynchronous activity after the test ended. This activity created the error "ReferenceError: error is not defined" and would have caused the test to fail, but instead triggered an unhandledRejection event.

**Ce que j'ai essayé** : // Lire et écrire les données dans un fichier JSON. À coder EN PREMIER : le menu en a besoin pour démarrer.
// Fiche : fiches/2-donnees-json.md · Vérifier : npm run test:stockage
import { readFile, writeFile } from 'node:fs/promises';
import { join } from "node:path";
// Lit le fichier JSON et renvoie le tableau qu'il contient.
// Si le fichier n'existe pas ou n'est pas du JSON valide, laissez l'erreur remonter : le menu l'affichera.
 export async function lireJson(chemin) {
  try{
    const texteJson = await readFile(chemin, `utf8`);
    return texteJson;
  }
  catch (erreur){
    throw new error({cause: erreur});
  }
  }
  
export async function chargerJson(chemin) {
  const [plant] = await Promise([
    lireJson(join(chemin, "plants.json"))
  ])
  return { plant }
}

// Écrit le tableau dans le fichier, au format JSON indenté de 2 espaces.
export async function enregistrerJson(chemin, enregistrements) {
  const enregistre = await lireJson(chemin);
  enregistre.push(enregistrements);
  const textJson = JSON.stringify(enregistrements, null, 2);
}

**Solution** : 
// Lire et écrire les données dans un fichier JSON. À coder EN PREMIER : le menu en a besoin pour démarrer.
// Fiche : fiches/2-donnees-json.md · Vérifier : npm run test:stockage
import { readFile, writeFile } from 'node:fs/promises';
// Lit le fichier JSON et renvoie le tableau qu'il contient.
// Si le fichier n'existe pas ou n'est pas du JSON valide, laissez l'erreur remonter : le menu l'affichera.
 export async function lireJson(chemin) {
    const texteJson = await readFile(chemin, `utf8`);
    return texteJson;
  }
  
export async function chargerJson(chemin) {
  const chargedonnee = await lireJson(chemin);
  return JSON.parse(chargedonnee)
}

// Écrit le tableau dans le fichier, au format JSON indenté de 2 espaces.
export async function enregistrerJson(chemin, enregistrements) {
  const tableauE = JSON.stringify(enregistrements, null, 2);
  return await writeFile(chemin, tableauE, `utf8`)
}

**Message exact** : ✔ formaterPlant écrit un plant sur une ligne (1.5505ms)
✔ listerPlants écrit une ligne par plant (0.3854ms)
✔ listerPlants affiche un message si l’inventaire est vide (0.173ms)
✖ trouverParId : la recherche N09 affiche pin, gymnosperme, 8 plants (0.4145ms)
✔ trouverParId : N99 est introuvable (undefined) (0.2324ms)
✖ verifierPlant accepte une saisie valide (0.2976ms)
✖ verifierPlant refuse une quantité décimale, négative ou non numérique (0.1604ms)
✖ verifierPlant refuse un code déjà utilisé (0.1176ms)
✖ creerPlant convertit le nombre de plants en nombre (2.6306ms)
✖ ajouterPlant ajoute une saisie valide à la fin de l’inventaire (0.576ms)
✖ ajouterPlant refuse un deuxième N01 : l’inventaire reste à dix lignes (0.2868ms)
ℹ tests 11
ℹ suites 0
ℹ pass 4
ℹ fail 7
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 150.61

✖ failing tests:

**Ce que j'ai essayé** : 
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des groupes botaniques acceptés, fournie et validée par le coach agronomie.
export const GROUPES = ['angiosperme', 'gymnosperme'];

// Renvoie une ligne de texte qui décrit le plant.
// Exemple : 'N09 | pin | gymnosperme | 8 plants | 2026-10-24'
export function formaterPlant(plant) {
  return `${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`
  throw new Error('TODO : coder formaterPlant dans src/registre.js');
}


// Renvoie un texte avec un plant par ligne (lignes séparées par '\n'),
// ou 'Aucun plant enregistré.' si la liste est vide.
export function listerPlants(plants) {
  if(plants.length === 0){
    return `Aucun plant enregistré.`
  }
  return plants.map(formaterPlant).join('\n');
  throw new Error('TODO : coder listerPlants dans src/registre.js');
}

// Renvoie le plant qui a ce code (identifiant), ou undefined s'il n'existe pas.
export function trouverParId(plants, id) {
  return plants.find((id) => plants.id===id)
  throw new Error('TODO : coder trouverParId dans src/registre.js');
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · nomCommun obligatoire · groupe présent dans GROUPES
// · nombrePlants nombre ENTIER positif ou nul · dateReleve réelle au format AAAA-MM-JJ.
export function verifierPlant(saisie, plants) {
  const erreurs = []
  const idN = saisie.id
  if(!idN || idN.trim()===''){
    erreurs.push('id obligatoire et unique');
  };
  const nomCommunN = saisie.nomCommun
  if(!nomCommunN || nomCommunN.trim()===''){
    erreurs.push('nomCommun obligatoire')
  };
  const groupeN = saisie.groupe
  if(groupeN!== GROUPES){
    erreurs.push('groupe présent dans GROUPES')
  };
  const nombrePlantsN = saisie.nombrePlants;
  if(Number.isInteger(nombrePlantsN) && Nombres >= 0){
    erreurs.push('nombrePlants nombre ENTIER positif ou nul')
  };
  const dateN= saisie.date
  if(!dateN){
    erreurs.push('dateReleve réelle au format AAAA-MM-JJ')
  };
   throw new Error('TODO : coder verifierPlant dans src/registre.js')
}

// Fabrique le plant à enregistrer à partir d'une saisie VALIDE : nombrePlants devient un nombre.
export function creerPlant(saisie) {
  const nombreplants = Number(saisie.nombrePlants);
  return{
    id: saisie.id,
    nomCommun: saisie.nomCommun,
    groupe : saisie.groupe,
    nombrePlants : nombreplants,
    dateReleve: saisie.dataReleve,
  };
  throw new Error('TODO : coder creerPlant dans src/registre.js');
}

// Ajoute la saisie à l'inventaire si elle est valide (verifierPlant, puis creerPlant).
// Renvoie les erreurs : [] si le plant a été ajouté ; sinon les messages, et rien n'est ajouté.
export function ajouterPlant(plants, saisie) {
  const erreurs = []
  if(erreurs === 0){
    return []
  }
  else{
    return erreurs
  }
  throw new Error('TODO : coder ajouterPlant dans src/registre.js');
}

**Solution** : 
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des groupes botaniques acceptés, fournie et validée par le coach agronomie.
export const GROUPES = ['angiosperme', 'gymnosperme'];

// Renvoie une ligne de texte qui décrit le plant.
// Exemple : 'N09 | pin | gymnosperme | 8 plants | 2026-10-24'
export function formaterPlant(plant) {
  return `${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`
  throw new Error('TODO : coder formaterPlant dans src/registre.js');
}


// Renvoie un texte avec un plant par ligne (lignes séparées par '\n'),
// ou 'Aucun plant enregistré.' si la liste est vide.
export function listerPlants(plants) {
  if(plants.length === 0){
    return `Aucun plant enregistré.`
  }
  return plants.map(formaterPlant).join('\n');
  throw new Error('TODO : coder listerPlants dans src/registre.js');
}

// Renvoie le plant qui a ce code (identifiant), ou undefined s'il n'existe pas.
export function trouverParId(plants, id) {
  return plants.find((plant) => plant.id===id)
  throw new Error('TODO : coder trouverParId dans src/registre.js');
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · nomCommun obligatoire · groupe présent dans GROUPES
// · nombrePlants nombre ENTIER positif ou nul · dateReleve réelle au format AAAA-MM-JJ.
export function verifierPlant(saisie, plants) {
  const erreurs = []
  const idN = saisie.id
  if(!idN || idN.trim()===''){
    erreurs.push('id obligatoire');
  }
  const idExiste = plants.some((plant) => plant.id === idN);
    if(idExiste){
      erreurs.push(`id unique`)
  }
  const nomCommunN = saisie.nomCommun
  if(!nomCommunN || nomCommunN.trim()===''){
    erreurs.push('nomCommun obligatoire')
  }
  const groupeN = saisie.groupe;
  if(!GROUPES.includes(groupeN)){
    erreurs.push('groupe présent dans GROUPES')
  }
  const nombrePlantsN = versNombre(saisie.nombrePlants);
  if(!Number.isInteger(nombrePlantsN) || nombrePlantsN <0){
    erreurs.push('nombrePlants nombre ENTIER positif ou nul')
  }
  const dateN= saisie.dateReleve
  if(!estDateValide(dateN)){
    erreurs.push('dateReleve réelle au format AAAA-MM-JJ')
  }
  return erreurs
}

// Fabrique le plant à enregistrer à partir d'une saisie VALIDE : nombrePlants devient un nombre.
export function creerPlant(saisie) {
  const nombreplants = versNombre(saisie.nombrePlants);
  return{
    id: saisie.id,
    nomCommun: saisie.nomCommun,
    groupe : saisie.groupe,
    nombrePlants : nombreplants,
    dateReleve: saisie.dateReleve,
  }
}

// Ajoute la saisie à l'inventaire si elle est valide (verifierPlant, puis creerPlant).
// Renvoie les erreurs : [] si le plant a été ajouté ; sinon les messages, et rien n'est ajouté.
export function ajouterPlant(plants, saisie) {
  const erreurs = verifierPlant(saisie, plants);
  if(erreurs.length > 0){
    return erreurs;
  }
  const nouveauplant = creerPlant(saisie);
  plants.push(nouveauplant);
  return [];
  }


**Message de Blocage** : 
// Rechercher et trier les plants.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les plants dont le nom commun CONTIENT le texte cherché,
// sans tenir compte des majuscules : 'PALM' trouve 'palmier à huile'. Éventuellement vide.
export function rechercherParNom(plants, texte) {
  const caratere = texte.toLowerCase();
  return plants.filter((nom) => nom.nomCommun.toLowerCase().includes(caratere));
}

// Renvoie un NOUVEAU tableau avec les plants de ce groupe botanique (éventuellement vide).
export function filtrerParGroupe(plants, groupe) {
  return plants.filter((G) => G.groupe === groupe);
}

// Renvoie une COPIE triée par nombre de plants croissant, avec un comparateur numérique.
// Deux plants de même nombre gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParNombrePlants(plants) {
  const copie = [...plants];
  return copie.sort((d, e) => d.ParNombrePlants - e.ParNombrePlants)
}

**Ce que j'ai essayé** :
// Rechercher et trier les plants.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les plants dont le nom commun CONTIENT le texte cherché,
// sans tenir compte des majuscules : 'PALM' trouve 'palmier à huile'. Éventuellement vide.
export function rechercherParNom(plants, texte) {
  const caratere = texte.toLowerCase();
  return plants.filter((nom) => nom.nomCommun.toLowerCase().includes(caratere));
}

// Renvoie un NOUVEAU tableau avec les plants de ce groupe botanique (éventuellement vide).
export function filtrerParGroupe(plants, groupe) {
  return plants.filter((G) => G.groupe === groupe);
}

// Renvoie une COPIE triée par nombre de plants croissant, avec un comparateur numérique.
// Deux plants de même nombre gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParNombrePlants(plants) {
  const copie = [...plants];
  return copie.sort((d, e) => d.ParNombrePlants - e.ParNombrePlants)
}

**Solution** : 
remplacer dans return copie Parnombresplants pat nombrePlants              