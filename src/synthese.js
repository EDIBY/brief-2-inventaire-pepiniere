// Synthèse des quantités disponibles.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese

import { versNombre } from "./outils.js";

// Seuil de suivi des stocks faibles, en nombre de plants. C'est un repère pédagogique,
// pas une recommandation de production.
export const SEUIL_STOCK_FAIBLE = 10;

// Renvoie le nombre total de plants. Liste vide : 0.
export function totalPlants(plants) {
  return plants.reduce((somme, plant) => somme + plant.nombrePlants, 0);
}

// Renvoie un objet : pour chaque groupe, le nombre d'espèces (de lignes) et le total de plants.
// Exemple : { angiosperme: { especes: 8, plants: 222 }, gymnosperme: { especes: 2, plants: 18 } }
// Liste vide : {} (un objet vide).
export function syntheseParGroupe(plants) {
  const classement = {};
  for(const plant of plants){
    if(!classement[plant.groupe]) {
      classement[plant.groupe]= { especes: 0, plants: 0 }
    }
    classement[plant.groupe].especes+= 1;
    classement[plant.groupe].plants += plant.nombrePlants;
  }
  return classement;
}

// Renvoie un NOUVEAU tableau avec les plants dont le nombre est INFÉRIEUR OU ÉGAL au seuil.
// Exemple : stocksFaibles(donnees, 10) → N09 (8 plants) et N10 (10 plants)
export function stocksFaibles(plants, seuil) {
  const newtableau = [];
  for(const nplant of plants ){
    if(nplant.nombrePlants <= seuil){
      newtableau.push(nplant);
    }
  }
  return newtableau
}

// Renvoie le plant (la ligne d'inventaire) qui a le plus grand nombre de plants,
// le premier rencontré en cas d'égalité, ou null si l'inventaire est vide.
// Exemple : especeLaPlusAbondante(donnees) → N04 (tomate, 50 plants)
export function especeLaPlusAbondante(plants) {
  if(plants.length === 0){
    return null;
  }
  let abondante = plants[0]
  for(const plant of plants){
    if(plant.nombrePlants > abondante.nombrePlants){
      abondante = plant
    }
    }
    return abondante;
  }