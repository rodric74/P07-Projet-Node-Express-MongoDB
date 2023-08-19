const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({        // le schéma pour ma bdd avec les valeurs à true pour obliger ces paramètres. 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);



