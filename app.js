const express = require('express');
const app = express();

const signupRoute = require('./routes/auth/signup');
const loginRoute = require('./routes/auth/login');
const booksRoute = require('./routes/books/index');
const bookRoute = require('./routes/books/book');
const bestRatingRoute = require('./routes/books/bestrating');
const ratingRoute = require('./routes/books/rating');

app.use('/auth/signup', signupRoute);
app.use('/auth/login', loginRoute);
app.use('/books', booksRoute);
app.use('/books', bookRoute);
app.use('/books/bestrating', bestRatingRoute);
app.use('/books', ratingRoute);


module.exports = app;