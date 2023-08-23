const PasswordValidator = require('password-validator');

const passwordSchema = new PasswordValidator();

// Définir les propriétés du mot de passe
passwordSchema
.is().min(8)                                   
.is().max(100)                                 
.has().uppercase(1)                             
.has().lowercase()                             
.has().digits()                               
.has().not().spaces()                          
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
    const password = req.body.password;

    if (!passwordSchema.validate(password)) {
        return res.status(400).json({ message: 'Mot de passe non conforme.' });
    }

    next();
};
