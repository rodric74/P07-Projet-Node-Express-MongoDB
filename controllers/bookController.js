// Importation du modèle Book
const Book = require('../models/Book');


// Création d'un nouveau livre
exports.createBook = (req, res, next) => {
    console.log('Received book data:', req.body);
    console.log('User ID from authentication:', req.auth.userId);
    // Analyse du corps de la requête pour obtenir les informations du livre
    const bookObject = JSON.parse(req.body.book);
    // Suppression des propriétés non nécessaires (si elles existent)
    delete bookObject._id;
    delete bookObject._userId;
    // Création d'une nouvelle instance du modèle Book avec les informations reçues
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,  // Ajout de l'ID de l'utilisateur qui crée le livre (obtenu à partir du token JWT)
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,  // Génération de l'URL de l'image
        averageRating:0
    });

    // Sauvegarde du livre dans la base de données
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => {
            console.log('Error while saving book:', error);
            res.status(400).json({ error, message: 'Error while saving book' });
        });
};


// Fonction pour mettre à jour un livre
exports.updateBook = (req, res, next) => {
    // Log pour indiquer le début du processus de mise à jour avec l'ID du livre concerné
    console.log('Updating book', req.params.id); 

    // Vérification si un fichier (image) a été inclus dans la requête
    // Si oui, on construit l'objet du livre en y incluant l'URL de l'image
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  // Sinon, on utilise le corps de la requête tel quel

    // Log pour afficher l'objet du livre analysé
    console.log('Parsed book object:', bookObject);  

    // Suppression de la propriété _userId qui n'est pas nécessaire pour la mise à jour
    delete bookObject._userId;

    // Recherche du livre dans la base de données à l'aide de son ID
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            // Log pour indiquer que le livre a été trouvé
            console.log('Book found:', book);  
            
            // Vérification si le livre existe dans la base de données
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }

            // Vérification de l'autorisation : l'utilisateur actuellement connecté est-il le propriétaire du livre ?
            if (book.userId != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized' });
            } 
            
            // Mise à jour du livre dans la base de données
            return Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        })
        .then(() => {
            // Log pour indiquer que le livre a été mis à jour avec succès
            console.log('Book updated successfully');  
            res.status(200).json({ message: 'Livre modifié!' });
        })
        .catch(error => {
            // Log en cas d'erreur pendant le processus
            console.log('Error:', error);  
            res.status(400).json({ error });
        });
};


// Suppression d'un livre
exports.deleteBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Livre supprimé!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

// Récupération d'un livre spécifique par ID
exports.getBookById = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé!' });
            }
            res.status(200).send(book);
        })
        .catch(error => res.status(400).json({ error }));
};

// Récupération de tous les livres
exports.getAllBooks = (req, res, next) => {
    // Utilisation de la méthode find() pour obtenir tous les livres
    // L'utilisation de populate() permet de récupérer également les informations de l'utilisateur qui a créé le livre (dans ce cas, l'email)
    Book.find()
        .populate('userId', 'email')
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};


// Notation d'un livre
exports.rateBook = (req, res) => {
    const grade = req.body.grade;

    if (!grade || isNaN(grade) || grade < 0 || grade > 5) {
        return res.status(400).json({ message: 'Note invalide!' });
    }

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé!' });
            }

            // je vérifie si l'utilisateur a déjà noté ce livre
            const userRating = book.ratings.find(rating => rating.userId.toString() === req.auth.userId);
            
            if (userRating) {
                userRating.grade = grade; // Si l'utilisateur a déjà noté, je mets à jour sa note
            } else {
                // Sinon, j'ajoute une nouvelle note pour cet utilisateur
                book.ratings.push({
                    userId: req.auth.userId,
                    grade: grade
                });
            }

            const totalRatings = book.ratings.reduce((acc, curr) => acc + curr.grade, 0);
            book.averageRating = totalRatings / book.ratings.length;

            book.save()
                .then(() => res.status(200).json({ message: 'Livre noté!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};


// Récupération des trois meilleurs livres en termes de notation
exports.getBestRatedBooks = (req, res) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => res.status(200).send(books))
        .catch(error => res.status(500).json({ error }));
};
