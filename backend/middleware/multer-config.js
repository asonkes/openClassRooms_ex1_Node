const multer = require('multer');

const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpeg',
    'images/png': 'png'
};

/** On va créer un "objet" de configuration pour "multer" */
/** diskstaorage configure le chemin et le nom du fichier pour les fichiers entrant */
const storage = multer.diskStorage({
    destination: (reg, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        /** On aura le nom que l'on aura généré en enlevant les 'espaces' et en remplaçant par des '_' */
        const name = file.originalname.split(' ').join('_');
        /** Avec le MIME_TYPES pour le rendre le plus unique possible */
        const extension = MIME_TYPES[file.mimetype];
        /** Avec l'extension */
        callback(null, name + Date.now() + '.' + extension);
    }
});

/** single permet de dire que se sera un fichier unique */
module.exports = multer({ storage}).single('image');