const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {      // utilisation de async pr la clarté du code et aussi attendre opérations qui prennent du temps. 
    try{
        const user = new User(req.body);    // je crée une nouvelle instance d'utilisateur avec le mail et le pass. 
        await user.save();                  // je save le user dans la base en async pr la gestion du temps. 
        res.status(201).send({ user});      // ça passe je renvois un 201
    }catch(err){
        res.status(400).send({ error: err.message});  // ça casse je renvois un 400 
    }

};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; //j'extrais l'email et le pass du corps de la requête. 
        const user = await User.findOne({ email });// je cherche l'utilisateur ds la base de donnée. 
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);//je compare avec bcrypt le pass du user et celui de la base.
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        const token = await user.generateAuthToken(); //je génère le token après vérif du log et du pass.
        res.send({ user, token }); //je renvois le user et le token au front-end );
    } catch (error) {
        res.status(400).send(error.message);
    }
    
};
