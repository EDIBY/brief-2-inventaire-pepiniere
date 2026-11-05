// Ajouter et lister les plants.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des groupes botaniques acceptés, fournie et validée par le coach agronomie.
export const GROUPES = ['angiosperme', 'gymnosperme'];

// Renvoie une ligne de texte qui décrit le plant.
// Exemple : 'N09 | pin | gymnosperme | 8 plants | 2026-10-24'
export function formaterPlant(plant) {
  return `${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`
}


// Renvoie un texte avec un plant par ligne (lignes séparées par '\n'),
// ou 'Aucun plant enregistré.' si la liste est vide.
export function listerPlants(plants) {
  if(plants.length === 0){
    return `Aucun plant enregistré.`
  }
  return plants.map(formaterPlant).join('\n');
}

// Renvoie le plant qui a ce code (identifiant), ou undefined s'il n'existe pas.
export function trouverParId(plants, id) {
  return plants.find((plant) => plant.id===id)
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
    erreurs.push('Le nombre de plants doit être un entier positif ou nul')
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
 

