const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('userId', 'email');
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

exports.createBook = (req, res) => {
    res.status(501).send({ message: 'Not Implemented' });
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