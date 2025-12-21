/*****************************/
/* Où et quand l'app démarre */
/*****************************/

const http = require('http');
const app = require('./app');

/** On prend la valeur du port */
const normalizePort = val => {
    /** Si jamais exceptionnellement, port = 3000abc ==> renvoie 3000 ==> très rare !!! */
    const port = parseInt(val, 10);

    /** Si val ne peut pas être convertie en nombre entier, on renvoie la value du port */
    if (isNaN(port)) {
        return val;
    }

    /** Si le port est + grand ou = à 0, on renvoie le port */
    if (port >= 0) {
        return port;
    }

    /** Au sinon erreur */
    return false;
};

/** On prend le port qui est lancé, ausinon on prend le 3000 */
const port = normalizePort(process.env.PORT ||'3000');
/** On stocke le port dans Express */
app.set('port', port);

/** On créé une fonction qui prend un objet "error" */
const errorHandler = error => {

    /** On vérifie que l'erreur vient de listen */
    if (error.syscall !== 'listen') {
        /** Si vient pas de listen, on remonte l'erreur et on ne fait rien */
        throw error;
    }

    /** On récupère l'adresse sur laquelle le serveur écoute */
    const address = server.address();
    /** On créé un texte clair pour l'affichage ou l'erreur */
    /** Ex : "port: 3000" */
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

    /** On gère les différents code d'erreur */
    switch (error.code) {
        /** Au cas où le port est protégé ==> 1024 */
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;

        /** Si le port est déjà utilisé */
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;

        /** Si autre erreur, on les détaille pas, se sera une erreur */
        default:
        throw error;
    }
};

/** on va créer utiliser la fonction app (qui est dans app.js) */
const server = http.createServer(app);

/** node émet un évènement 'error' si server.listen() échoue */
server.on('error', errorHandler);

/** Ici, on émet un évènement 'listening' quand le serveur démarre correctement */
server.on('listening', () => {
  
    /** infos sur le serveur écouté */
    const address = server.address();

    /** création d'un texte lisible pour la console */
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    
    /** Confimation que le serveur est actif */
    console.log('Listening on ' + bind);
});

/** On lance le serveur sur le port choisi */
server.listen(port);

/** C'est du code ci_dessus qui n'est pas écrit pas un développeur */
/** Se retrouve dans les tutoriels "Express serveur prêt pour prod" */
/** Dans express Generator */