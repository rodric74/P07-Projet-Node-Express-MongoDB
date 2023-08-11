const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Liste de tous les livres');
});

module.exports = router;
