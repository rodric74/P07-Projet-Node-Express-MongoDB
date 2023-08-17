const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Route pour créer un nouveau livre (Authentification requise)
router.post('/', auth, multer, bookController.createBook);

// Route pour obtenir la liste de tous les livres
router.get('/', bookController.getAllBooks);

// Route pour obtenir les 3 livres ayant la meilleure note moyenne
router.get('/bestrating', bookController.getBestRatedBooks);

// Route pour mettre à jour un livre spécifique (Authentification requise)
router.put('/:id', auth, bookController.updateBook);

// Route pour obtenir les détails d'un livre spécifique (Authentification requise)
router.get('/:id', auth, bookController.getBookById);

// Route pour supprimer un livre spécifique (Authentification requise)
router.delete('/:id', auth, bookController.deleteBook);

// Route pour noter un livre spécifique (Authentification requise)
router.post('/:id/rating', auth, bookController.rateBook);



module.exports = router;
