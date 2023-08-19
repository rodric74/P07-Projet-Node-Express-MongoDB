const Book = require('../models/Book');

exports.createBook = (req, res, next) => { 
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const totalRatings = bookObject.ratings ? bookObject.ratings.reduce((acc, curr) => acc + curr.grade, 0) : 0;
    const averageRating = bookObject.ratings ? totalRatings / bookObject.ratings.length : 0;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        averageRating: averageRating
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error, message: 'Error while saving book' }));
};

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }
            if (book.userId != req.auth.userId) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            let previousImage = "";
            if (req.file) {
                previousImage = book.imageUrl.split('/images/')[1];
            }
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                .then(() => {
                    if (previousImage) {
                        fs.unlink(`images/${previousImage}`, err => {});
                    }
                    res.status(200).json({ message: 'Livre modifié!' });
                })
                .catch(error => {
                    if (req.file) {
                        fs.unlink(`images/${req.file.filename}`, err => {});
                    }
                    res.status(400).json({ error });
                });
        })
        .catch(error => res.status(400).json({ error }));
};

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

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .populate('userId', 'email')
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

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
            const userRating = book.ratings.find(rating => rating.userId.toString() === req.auth.userId);
            if (userRating) {
                userRating.grade = grade;
            } else {
                const newRating = {
                    userId: req.auth.userId,
                    grade: grade
                };
                book.ratings.push(newRating);
            }
            const totalRatings = book.ratings.reduce((acc, curr) => acc + curr.grade, 0);
            book.averageRating = totalRatings / book.ratings.length;
            book.save()
                .then(() => {
                    res.status(200).json({ message: 'Livre noté!' });
                })
                .catch(error => {
                    res.status(400).json({ error });
                });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getBestRatedBooks = (req, res) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => res.status(200).send(books))
        .catch(error => res.status(500).json({ error }));
};
