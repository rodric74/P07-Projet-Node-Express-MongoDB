const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Livres avec la meilleure notation');
});

module.exports = router;
