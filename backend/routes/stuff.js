/** On va avoir besoin d'express */
const express = require('express');
/** On va créer un router avec la méthode 'Router' d'express */
const router = express.Router();
// Chemin vers le controller 'stuff.js' dans controllers
const stuffCtrl = require('../controllers/stuff');

// Route pour création d'un élément
// On ne met pas les '()' de la fonction car on appelle pas la fonction, on l'applique à la route
router.post('/', stuffCtrl.createThing);

// Route pour la modification d'un élément
router.put('/:id', stuffCtrl.modifyThing);

// Route pour la suppression d'un élément
router.delete('/:id', stuffCtrl.deleteThing);

// Route pour récupérer les informations d'un seul 'objet'
router.get('/:id', stuffCtrl.getOneThing);

// Route pour récupérer TOUS les objets
router.get('/', stuffCtrl.getAllThings);

/** Ici, on réexporte le router de ce fichier là */
module.exports = router;