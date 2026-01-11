/** On va avoir besoin d'express */
const express = require('express');
/** On importe le middleware dans notre 'router' pour qu'il soit exécuter 'AVANT' les gestionnaires de nos routes */
const auth = require('../middleware/auth');
/** On va créer un router avec la méthode 'Router' d'express */
const router = express.Router();
// Chemin vers le controller 'stuff.js' dans controllers
const stuffCtrl = require('../controllers/stuff');
const multer = require('../middleware/multer-config');

/** Et on met notre 'middleware' avant notre gestionnaire de route */
router.get('/', auth, stuffCtrl.getAllThings);

// Route pour création d'un élément
// On ne met pas les '()' de la fonction car on appelle pas la fonction, on l'applique à la route
router.post('/', auth, multer, stuffCtrl.createThing);

// Route pour la modification d'un élément
router.put('/:id', auth, stuffCtrl.modifyThing);

// Route pour la suppression d'un élément
router.delete('/:id', auth, stuffCtrl.deleteThing);

// Route pour récupérer les informations d'un seul 'objet'
router.get('/:id', auth, stuffCtrl.getOneThing);

/** Ici, on réexporte le router de ce fichier là */
module.exports = router;