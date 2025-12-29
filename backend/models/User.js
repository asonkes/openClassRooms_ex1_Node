const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

// Si on laisse comme cela, plusieurs utilisateurs pourraient 
// la même adresse mail, il n'y a pas de protection
// unique: true ==> permet cette protection
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Et là, on passe uniqueValidator au schéma
// Et grâce à cela, on ne pourra pas avoir plusieurs utilisateurs pour une adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);