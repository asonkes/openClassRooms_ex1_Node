/** On aura besoin du package de cryptage pour les mots de passe ==> bcrypt */
const bcrypt = require('bcrypt');

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
                .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))
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
            if(user === null) {
                /** Ici on va garder le message flou car si on dit : utilisateur pas encore encodé chez nous (fuite de données déjà), donc pas correct */
                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
            } else {
                /** Si l'utilisateur existe déjà dans la base de données */
                /** On va utiliser l'outil "compare" de bcrypt */
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        /**Si c'est FAUX, erreur d'authentification, mot de passe pas correct */
                        if(!valid) {
                            /** Si mot de passe incorrect, même message qu'avant pour pas qu'on puisse faire la différence, et savoir si c'est ladresse mail ou le mot de passe qui ets incorrect ==> pas de fuite de données */
                            res.status(401).json({message : 'Paire identifiant/mot de passe incorrecte'})
                        } else {
                            /** Si mot de passe correct */
                            res.status(200).json({
                                /** Token créé en dur pour l'instant */
                                userId: user._id,
                                token: 'TOKEN'
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        /** C'est aussi ici, une erreur serveur */
        .catch(error => res.status(500).json({ error }));
}