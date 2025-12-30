const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

/** Se sont des routes 'post' car le frontend va envoyer des informations */
router.post('/signup', userCtrl.signup);
/** Se sont des routes 'post' car le frontend va envoyer des informations */
router.post('/login, userCtrl.login')


module.exports = router;