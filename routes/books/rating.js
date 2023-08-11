const express = require('express');
const router = express.Router();

router.post('/:id/rating', (req, res) => {
    res.send(`Notation ajoutée pour le livre avec ID: ${req.params.id}`);
});

module.exports = router;
