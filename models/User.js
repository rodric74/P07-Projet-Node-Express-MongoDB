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

// Hashage du mot de passe
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//Générer un token pour un utilisateur donnée. 
userSchema.methods.generateAuthToken = async function() {                   
    const user = this;   // this = référence de l'utilisateur pr lequel on génère un token.
    //utiliser la clé secrete pr le token                                                   
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

module.exports = mongoose.model('User', userSchema);
