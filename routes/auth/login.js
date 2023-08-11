const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Connexion réussie!');
});

module.exports = router;
