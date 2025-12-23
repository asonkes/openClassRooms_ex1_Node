/****************************/
/* Comment l'app fonctionne */
/****************************/

// Pour protéger le mot de passe à la connection 'mongoDB'
require('dotenv').config();

// On importe mongoose
const mongoose = require('mongoose');

// code pour se connecter à mongoose ==> même chose que .env (en PHP)
// Et on a rajouté le mot de passe que l'on a reçu qd on a créé le USER et on s'est connecté à la DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

// require ==> pour importer 'express' depuis le module express
const express = require('express');

// app est créé mais ne contient rien pour l'instant
// Mais qui permet de créer une application express
const app = express();

// ca va intercepter toutes les requetes qui ont un content-type Json
// Et rajouter les données dans le corps de l'application
app.use(express.json());

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

// Et on fait un middelware pour 'POST'
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    // On est obligé d'envoyer une réponse, ausinon la requête va planter
    // Donc va faire semblant qu'il y a une création de base de contenu (d'où le statut = 201)
    res.status(201).json({message: 'Objet créé !'});
})

// Et on fait un middelware pour 'GET'
app.get('/api/stuff', (req, res, next) => {
    // stuff ==> données que l'on renvoie qd quelqu'un appelle cette route
    const stuff = [
        {
            // '_id' au lieu de 'id' ==> vient de mongoDB
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageURL: 'https://im.qccdn.fr/node/guide-d-achat-objectif-de-l-appareil-photo-6861/thumbnail_800x480px-120610.jpg',
            price: 4900, // prix en centimes (on évite le moins de chiffres opossibles après la virgule)
            userId: 'gsomihvgios'
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageURL: 'https://im.qccdn.fr/node/guide-d-achat-objectif-de-l-appareil-photo-6861/thumbnail_800x480px-120610.jpg',
            price: 2900, // prix en centimes 
            userId: 'gsomihvgios'
        }
    ];
    
    // On va attribuer un code '200' à la réponse
    // Et renvoie en réponse json ==> le stuff (le tableau au-dessus avec les réponses)
    res.status(200).json(stuff);
})

// On exporte cette fonction pour que les autres fichiers y ai accès.
// module.exports = système de 'module' de node
module.exports = app;