/** On aura besoin du package de cryptage pour les mots de passe ==> bcrypt */
const bcrypt = require('bcrypt');

/** Cela va nous permettre de créer et de vérifier les tokens */
const jwt = require('jsonwebtoken');

/** On a besoin de "user" car on a besoin de lire les informations */
const User = require('../models/User');

exports.signup = (req, res, next) => {
    /** On va hasher le mot de passe */
    /** req.body.password ==> on lui passe le mot de passe qui sera passé par le frontend */
    /** 10 ==> combien de fois, on exécute l'algorithme */
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({ 
                email: req.body.email,
                password: hash
            });
            /** On utilise la méthode "save" pour enregistrer dans la base de données */
            user.save()
                /** On renvoie une erreur "201" pour la création de ressource */
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        /** Erreur 500 ici car erreur du côté serveur */
        .catch(error => res.status(500).json({ error }));

}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        /** */
        .then( user => {
            /** C'est au cas où l'utilisateur n'existe pas dans notre base de données */
            if(!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            /** Si l'utilisateur existe déjà dans la base de données */
            /** On va utiliser l'outil "compare" de bcrypt */
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        /** Comme on a installé jwtwebtoken, on va faire appel à une de leur méthode */
                        token: jwt.sign(
                            { userId: user._id},
                            /** La clé secrete pour l'encodage, ici simple (en prod, plus compliqué) */
                            'RANDOM_TOKEN_SECRET',
                            /** Chaque token a une durée de vie de 24h00 max */
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        /** C'est aussi ici, une erreur serveur */
        .catch(error => res.status(500).json({ error }));
}