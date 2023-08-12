const User = require('../models/User');     // j'importe mon modèle de user. 

exports.signup = async (req, res) => {      // utilisation de async pr la clarté du code et aussi attendre opérations qui prennent du temps. 
    try{
        const user = new User(req.body);    // je crée une nouvelle instance d'utilisateur avec le mail et le pass. 
        await user.save();                  // je save le user dans la base en async pr la gestion du temps. 
        res.status(201).send({ user});      // ça passe je renvois un 201
    }catch{
        res.stats(400).send(error);         // ça casse je renvois un 400 
    }

};