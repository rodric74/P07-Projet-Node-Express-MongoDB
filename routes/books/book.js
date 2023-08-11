const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Livre créé');
});

router.get('/:id', (req, res) => {
    res.send(`Détails du livre avec ID: ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Livre avec ID: ${req.params.id} mis à jour`);
});

router.delete('/:id', (req, res) => {
    res.send(`Livre avec ID: ${req.params.id} supprimé`);
});

module.exports = router;
