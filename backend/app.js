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

// Chemin vers 'thing.js' pour pouvoir utiliser ces informations 
const Thing = require('./models/Thing');

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

// Et on fait un middelware pour 'POST'
app.post('/api/stuff', (req, res, next) => {
    // Pour l'instant le front génère un id qui ne va pas être le bon puisque généré par mongoDB
    // On va donc le supprimer
    delete req.body._id;

    // Qd on va remplir le formulaire, Mongoose (lib JS + Mongo) vont vérifier que tous les champs qui se trouvent dans 'thing.js' soient bien remplis et correspondent aux données demandées
    // Ex : prix ==> doit être un nombre !!! 
    // ... req.body (reprend tous les éléments qui correspondent au body et vérifie)  => spread operator
    const thing = new Thing({
        // On pourrait faire ceci :
        // title: req.body.title, 
        // Mais raccourci en JS ==> donc on fait :
        // Ca va permettre de détailler le titre, le prix etc
        ...req.body
    });
    // 'save' va enregistrer cet objet 'thing' dans la base de données
    // Et retourne un 'promise'
    thing.save()
        // Là il faut comme déjà dit, absolument renvoyer une réponse
        // au sinon ca va planter
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
});

// Maintenant on va rajouter une route "PUT"
// Qui va permettre de modifier un produit
// On met l'id en paramètre de route normal, car on doit savoir quel élément on doit modifier
app.put('/api/stuff/:id', (req, res, next) => {
    // méthode 'updateOne' qui va permettre de modifier un élément
    // On réutilise le ==> spread operator avec (...req.body)
    // Et on doit redéfinir que l'id doit correspondre à l'id dans les paramètres (_id: req.params.id)
    Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
})

// On mva maintenant créer la route "DELETE" pour pouvoir suppimer un objet
app.delete('/api/stuff/:id', (req, res, next) => {
    // Ici pas besoin de 2eme paramètre car c'est une suppression
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch( error => res.status(404).json({ error }));
})

// Ici on va avoir notre 1er segment dynamique
// Donc ici l'api va renvoyer l'id de l'élément et donc alors on va avoir notre route dynamique 
// :id ==> ":" ==> on rend grâce à ça la route accessible en tant que paramètre
app.get('/api/stuff/:id', (req, res, next) => {
    // On y aura accès ici car c'est un paramètre de route dynamique
    // Et donc on va comparer que les 2 id trouvés sont les mêmes
    Thing.findOne({ _id: req.params.id }) 
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

// Et on fait un middelware pour 'GET'
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
})

// On exporte cette fonction pour que les autres fichiers y ai accès.
// module.exports = système de 'module' de node
module.exports = app;