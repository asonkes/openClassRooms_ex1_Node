/****************************/
/* Comment l'app fonctionne */
/****************************/

// Pour protéger le mot de passe à la connection 'mongoDB'
require('dotenv').config();

// require ==> pour importer 'express' depuis le module express
const express = require('express');
/** body-parser lit le 'body' des requêtes HTTP */
const bodyParser = require('body-parser');
// On importe mongoose
const mongoose = require('mongoose');
/** On importe le router */
const stuffRoutes = require('./routes/stuff');
/** On importe le router des utilisateurs */
const UserRoutes = require('./routes/user');

// code pour se connecter à mongoose ==> même chose que .env (en PHP)
// Et on a rajouté le mot de passe que l'on a reçu qd on a créé le USER et on s'est connecté à la DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

// app est créé mais ne contient rien pour l'instant
// Mais qui permet de créer une application express
const app = express();

// On met le 'use' ici, car cela vaut pour le 'get' et le 'post'
app.use((req, res, next) => {
    // Là, avec '*', on dit que l'origin qui a le droit d'accéder à notre API
    // C'est tout le monde === *
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On donne le droit d'utiliser certains 'header'
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // On donne le droit d'utiliser certaines méthodes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// ca va intercepter toutes les requetes qui ont un content-type Json
// Et rajouter les données dans le corps de l'application
app.use(bodyParser.json());

// Ici cela permet de mettre une route globale
app.use('/api/stuff', stuffRoutes);
/** Afin d'enregistrer les routes des utilisateurs */
app.use('/api/auth', UserRoutes);

// On exporte cette fonction pour que les autres fichiers y ai accès.
// module.exports = système de 'module' de node
module.exports = app;