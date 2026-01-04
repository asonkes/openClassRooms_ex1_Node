const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        /** On va récupérer le token ==> on récupère le 'header' ==> req.header.authorization */
        /** On va le 'spliter'  ==> diviser la chaine de carctère en 1 tableau */
        /** Et c'est bien le token qui se trouve en 2eme que nous voulons récupérer [1] */
        const token = req.header.authorization.split('')[1];
        /** On va decoder le 'token' et la clé secrète */
        /** En cas d'erreur pour décoder le token, on va se retrouver dans le catch et donc renvoyer une erreur */
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        /** On va récupérer le 'userId' */
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
    } catch(error) {
        res.status(201).json({error});
    }
}