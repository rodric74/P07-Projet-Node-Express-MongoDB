const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = {
            userId: decodedToken._id
        };
        next();
    } catch(error) {
        console.log("Token verification failed:", error.message);
        res.status(401).json({ error: 'Please authenticate!' });
    }
};
