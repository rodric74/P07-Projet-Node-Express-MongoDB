const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        res.send({ user, token }); //je renvois le user et le tokena au front );
    } catch (error) {
        res.status(400).send(error.message);
    }
    
};
