// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import { versNombre } from './outils.js';
import { trouverParId, verifierPlant } from './registre.js';
import { syntheseParGroupe } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['nomCommun', 'groupe', 'nombrePlants', 'dateReleve'];

// Supprime de l'inventaire le plant qui a cet identifiant.
// Renvoie le plant supprimé, ou undefined s'il n'existe pas (l'inventaire ne change pas).
export function supprimerPlant(plants, id) {
  const index = plants.findIndex((plant)=> plant.id === id);
  if(index === -1){
    return undefined;
  }
  const resultat = plants.splice(index, 1);
  return resultat [0];
}

// Modifie un champ d'un plant. valeur arrive sous forme de TEXTE, comme dans le menu.
// Renvoie un tableau d'erreurs : [] si la modification est faite.
// Erreurs : identifiant inconnu · champ 'id' (l'identifiant n'est pas modifiable) · champ absent de
// CHAMPS_MODIFIABLES · valeur refusée par les règles de l'ajout. S'il y a une erreur, rien ne change.
// nombrePlants est enregistré comme un nombre.
export function modifierPlant(plants, id, champ, valeur) {
  const plant = trouverParId(plants, id);
  if(!plant){
    return ['Identifiant inconnu'];
  }
  if(champ === 'id'){
    return [`l'identifiant n'est pas modifiable`];
  }
  if(!CHAMPS_MODIFIABLES.includes(champ)){
    return [`Champ absent des CHAMPS_MODIFIABLES`];
  }
  const copie = {...plant};
  if(champ === 'nombrePlants') {
    copie[champ] = versNombre(valeur);
  }
  else if(champ === 'nomCommun' || champ === 'groupe'){
    copie[champ] = valeur.toLowerCase();
  }
  else {
    copie[champ] = valeur;
  }
  const autresplants = plants.filter((a) => a.id !== id);
  const erreurs = verifierPlant(copie, autresplants);
  if(erreurs.length>0) {
    return erreurs
  };
  plant[champ] = copie[champ];
  return [];
}

// Renvoie une COPIE triée par nombre de plants décroissant.
// Deux plants de même nombre gardent leur ordre d'origine. Le tableau reçu ne change pas.
export function trierParNombrePlantsDecroissant(plants) {
  const copie = [...plants];
  return copie.sort ((a,b) => b.nombrePlants - a.nombrePlants);
}

// Renvoie { groupe, plants } pour le groupe botanique qui a le plus de plants au total,
// le premier rencontré en cas d'égalité, ou null si l'inventaire est vide.
// Exemple : groupeLePlusFourni(donnees) → { groupe: 'angiosperme', plants: 222 }
export function groupeLePlusFourni(plants) {
  if(plants.length === 0){
    return null;
  }
  const groupes = syntheseParGroupe(plants);
  let groupepfourni = null;
  let nombrefourni = -1;
  for(const groupe in groupes){
    if(groupes[groupe].plants > nombrefourni){
      nombrefourni = groupes[groupe].plants;
      groupepfourni = groupe
    }
  }
  return{
    groupe: groupepfourni,
    plants: nombrefourni
  };
}
