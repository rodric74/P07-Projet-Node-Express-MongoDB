const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('userId', 'email');
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => { res.status(201).json({ message: 'Livre enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) });
};


exports.updateBook = (req, res) => {
    res.status(501).send({ message: 'Not Implemented' });
};

exports.getBookById = (req, res) => {
    res.status(501).send({ message: 'Not Implemented' });
};

exports.deleteBook = (req, res) => {
    res.status(501).send({ message: 'Not Implemented' });
};

exports.rateBook = (req, res) => {
    res.status(501).send({ message: 'Not Implemented' });
};

exports.getBestRatedBooks = (req, res) => {
    res.status(501).send({ message: 'Not Implemented' });
};