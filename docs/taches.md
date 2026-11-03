# Tableau des tâches

> Planifiez vous-même, puis tenez le tableau à jour. Une preuve : un commit, un test vert, un document.

| Tâche | Prévu | Fait le | Preuve |
| --- | --- | --- | --- |
| Poste et dépôt prêts ; besoin compris ; documents commencés | 11-02-2026| 11-03-2026 | |
| Fiche 2 : lire et écrire le JSON | 02-11-2026 | 03-11-2026 | |
| Fiche 3 : ajouter et lister ; choix 1 et 2 ; erreurs | 03-11-2026 | 04-11-2026 | |
| Fiche 4 : rechercher et trier ; choix 3 et 4 | 03-11-2026|04-2026 | |
| Fiche 5 : synthèse ; choix 5 |03-11-2026 | 04-11-2026| |
| Tests par un camarade ; mes propres tests | 04-11-2026 | 05-11-2026 | |
| Fiche agronomique ; README ; documents | 02-11-2026 | 03-11-2026 | |
| Dépôt cloné et lancé ailleurs ; démonstration répétée |04-11-2026 | 05-11-2026 | |
| Bonus | 03-11-2026 | 04-11-2026 | |

**Blocages** (le message exact, ce que j'ai essayé, la solution) : 
Message exact : ✔ extension : enregistrerJson écrit un JSON indenté de 2 espaces (8.1645ms)
✖ extension : chargerJson relit ce qu’enregistrerJson a écrit (2.4458ms)
✖ extension : chargerJson laisse remonter l’erreur « fichier absent » (ENOENT) (2.8084ms)
ℹ Error: Test "extension : chargerJson relit ce qu’enregistrerJson a écrit" at test\stockage.test.js:23:1 generated asynchronous activity after the test ended. This activity created the error "ReferenceError: error is not defined" and would have caused the test to fail, but instead triggered an unhandledRejection event.
ℹ Error: Test "extension : chargerJson laisse remonter l’erreur « fichier absent » (ENOENT)" at test\stockage.test.js:30:1 generated asynchronous activity after the test ended. This activity created the error "ReferenceError: error is not defined" and would have caused the test to fail, but instead triggered an unhandledRejection event.

Ce que j'ai essayé : // Lire et écrire les données dans un fichier JSON. À coder EN PREMIER : le menu en a besoin pour démarrer.
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

Solution : 
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
