/****************************/
/* Comment l'app fonctionne */
/****************************/

// require ==> pour importer 'express' depuis le module express
const express = require('express');

// app est créé mais ne contient rien pour l'instant
// Mais qui permet de créer une application express
const app = express();

app.use((req, res, next) => {
    console.log('Requête reçue ! ');
    // Si on ne met pas ça, on va voir dans le terminal : requête reçue
    // Mais ça va pas passer à la suivante
    next();
})

// Ici on va donc créer encore un middleware
// Pour essayer de modifier le code de la réponse 'http'
app.use((req, res, next) => {
    res.status(201);
    next();
})

// Ici, on va créer un moyen d'avoir une réponse à notre serveur
// Pour voir si la requete a été envoyé ou pas
// Ici on passe de la requete à la réponse... (voir différence par rapport au cours de Aude)
// app.use appartient à 'Express' et sert à fixer un middleware
// next ==> permet de renvoyer à la prochaine fonction, donc à l'autre middleware
app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue'});
    next();
})

// Du coup avec next, on ne peut pas modifier une réponse en cours de route
app.use((req, res, next) => {
    console.log("Réponse envoyée avec succès");
})

// On exporte cette fonction pour que les autres fichiers y ai accès.
// module.exports = système de 'module' de node
module.exports = app;