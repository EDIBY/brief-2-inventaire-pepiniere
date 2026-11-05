// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';
import { supprimerPlant, modifierPlant, trierParNombrePlantsDecroissant, groupeLePlusFourni } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/plants.json';

async function main() {
  ouvrirSaisie();
  try{
  console.log(`
      ==============================================
              INVENTAIRE DE LA PEPINIERE 
              Pépinière pédagogique
      ==============================================

    `);
  let plants = [];

  try{
    plants = await chargerJson(FICHIER_DONNEES);
    console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  }
  catch (erreur){
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. L'inventaire demarre vide`);
  }
  let choix = '';

  while (choix !=='0' && choix !== null){
    console.log(`
      ------------------- Menu -----------------
      1. Ajouter un plant
      2. Lister l'inventaire
      3. Rechercher (code, nom, groupe)
      4. Trier (nombre de plants)
      5. Synthèse des quantités
      6. supprimer un plant
      7. modifier un plant
      0. Quitter
      `);

      choix = await demander(`Votre choix :`);
      if(choix === null) {
         break;
        }
  try{
    switch(choix){
      case '1' :{
        console.log('------ Ajouter un plant ------')
        console.log(`Groupes autorisés : ${GROUPES.join(' ou ')}`);

        const saisie = {};

        saisie.id = await demander('Code du plant :');
          if(saisie.id === null) {
            console.log('Ajout annulé.');
            choix = null;
            break;
          }

          saisie.nomCommun = await demander('Nom commun :');
          if(saisie.nomCommun === null) {
            console.log('Ajout annulé.');
            choix = null;
            break;
          } 

          saisie.groupe = await demander('Groupe botanique (angiosperme ou gymnosperme) :');
          if(saisie.groupe === null) {
            console.log('Ajout annulé.');
            choix = null;
            break;
          }

          saisie.nombrePlants = await demander('Nombre de plants (entier) :');
          if(saisie.nombrePlants === null) {
            console.log('Ajout annulé.');
            choix = null;
            break;
          }

          saisie.dateReleve = await demander('Date de releve AAAA-MM-JJ :');
          if(saisie.dateReleve === null) {
            console.log('Ajout annulé.');
            choix = null;
            break;
          }

        //Normaliser les informations
        saisie.id = saisie.id.toUpperCase();
        saisie.nomCommun = saisie.nomCommun.toLowerCase();
        saisie.groupe = saisie.groupe.toLowerCase();

        // Vérifier et ajouter le plant
        const erreurs = ajouterPlant(plants, saisie);

        if(erreurs.length > 0){
          console.log(erreurs.join('\n'));
        }
        else{
          await enregistrerJson(FICHIER_DONNEES, plants);
          console.log(`Plant ${saisie.id} ajouté. L'inventaire compte ${plants.length} espèce(s).`);
        }
        break;
      }

      case '2' :
        console.log(`--- Inventaire (${plants.length} espèce(s)) ---`);
        console.log(listerPlants(plants));
        break;

      case '3':{
        console.log('1. Trouver par Id');
        console.log('2. Rechercher par Nom');
        console.log('3. Filtrer par groupe');
        
        const critere = await demander('Votre choix :');

        if(critere === null){
          
          break;
        }

        if(critere === '1'){
          const id = await demander('Code du plant :');

          if(id === null){
            choix = null;
            break;
          }

          const resultat = trouverParId(plants, id.toUpperCase());

          console.log(resultat ? formaterPlant(resultat): 'Aucun plant trouvé');
        }
        else if(critere === '2'){
          const nom = await demander('Nom du plant :');

          if(nom === null){
            
            break;
          }
          const resultat = rechercherParNom(plants, nom);

          console.log(resultat.map(formaterPlant).join('\n') || 'Aucun plant trouvé');
        }
        else if(critere==='3'){
          const groupe = await demander('Groupe botanique du plant :');

          if(groupe === null){
            
            break;
          }
          const resultat = filtrerParGroupe(plants, groupe.toLowerCase());
           console.log(resultat.map(formaterPlant).join('\n') || 'Aucun plant trouvé');
        }
        else{
          console.log('Critère inconnu.');
        }
      }
        break;

      case '4' :{
        console.log('1. Par nombre de plants croissant');
        console.log('2. Par nombre de plants décroissant')
        
        const tri = await demander('Votre choix :');
        if(tri === '1'){
          console.log(trierParNombrePlants(plants).map(formaterPlant).join('\n') || 'Aucun plant enregistré');
      }
       else if(tri === '2'){
        console.log(trierParNombrePlantsDecroissant(plants).map(formaterPlant).join('\n') || 'Aucun plant enregistré');
      }
      else if(tri !== null){
        console.log('Choix de tri inconnu.')
      }
  
    }
        break;

      case '5' :{
        console.log(`1. Nombre d'espèces : ${plants.length}`);

        console.log(`2. Nombre total de plants : ${totalPlants(plants)}`);

        const groupes =syntheseParGroupe(plants);

        console.log('3. Synthèse par groupe botanique : ');

        for(const groupe in groupes){
          console.log(`${groupe} : ${groupes[groupe].especes} espèce(s), ${groupes[groupe].plants} plants`);
        }
        const groupefourni = groupeLePlusFourni(plants);
        if(groupefourni === null){
          console.log('Aucun groupe est plus fourni')
        }
        else {
          console.log(`Groupe le plus fourni : ${groupefourni.groupe} (${groupefourni.plants} plants)`);
        }
        console.log('4. Synthèse des espèces :');
        const abondante = especeLaPlusAbondante(plants);
        if(abondante === null){
          console.log('Aucune espèce abondante');
        }
        else{
          console.log(`Espèce la plus abondante : ${formaterPlant(abondante)}`);
        }
        const faibles = stocksFaibles(plants, SEUIL_STOCK_FAIBLE);
        console.log(`Stocks faibles (<= ${SEUIL_STOCK_FAIBLE} plants) : ${faibles.length}`);
        for(const plant of faibles){
          console.log(formaterPlant(plant));
        }
      }
        break;

      case '6' : {
        const id =await demander('Identifiant : ');
        if(id === null){
          choix = null;
          break;
        }
        const resultat = supprimerPlant(plants, id.toUpperCase());
        if(resultat === undefined){
          console.log(`Plant ${id.toUpperCase()} introuvable`);
        }
        else{
          await enregistrerJson(FICHIER_DONNEES, plants);
          console.log(`Plant ${resultat.id} supprimé. L'inventaire compte ${plants.length} espèce(s).`);
        }
      }
     
        break;
      
      case '7' :{
        const id = await demander ('Identifiant : ');
        if(id === null){
          choix = null;
          break;
        }
        const champ = await demander('Champ à modifier (nomCommun, groupe, nombrePlants, dateReleve) : ');

         if(champ === null) {
            choix = null;
            break;
          }
          const valeur = await demander('Nouvelle valeur : ');

          if(valeur === null){
            choix = null;
            break;
          }
          const erreurs = modifierPlant(plants, id.toUpperCase(), champ, valeur);

          if(erreurs.length > 0) {
            console.log('Modification refusé :');
            for(const erreur of erreurs){
              console.log(`  -${erreur}`);
            }
          }
          else{
            await enregistrerJson(FICHIER_DONNEES, plants);
            console.log(`Plant ${id.toUpperCase()} modifié.`);
          }
          break;
        }
      
      case '0' :
        console.log('Au revoir !');
        break;

      default:
        console.log(`Choix inconnu. Tapez un chiffre du menu.`);
        choix = null;
    }
  }
  catch(erreur){
    if(erreur.message.startsWith('TODO')){
      console.log(`À compléter : ${erreur.message}`);
    }
    else{
      console.log(`Erreur inatendue : ${erreur.message}`);
    }
    
  }
  
   } 
  } 
finally{
  fermerSaisie();
}
}

main();
