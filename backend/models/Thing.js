// On va importer mongoose
const mongoose = require('mongoose');

// On va créer notre schéma de données
// On va utiliser la fonctionnalité 'schema' qui est offerte par 'mongoose'
// On va passer à cette fonctionnalité un objet avec les différents champs 
// On ne doit pas mettre l'id car il est généré automatiquement par "mongoose"
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    userID: { type: String, required: true },
    price: { type: Number, required: true }
});

// Mais le schéma ci-dessus on peut pas encore l'utiliser 
// pour lire ou ajouter dans la base de données
// Il faut pour cela ajouter une autre fonctionnalité de 'mongoose"
// en paramètre : 1) le nom du modèle 2) le nom du schéma 
module.exports = mongoose.model('Thing', thingSchema);