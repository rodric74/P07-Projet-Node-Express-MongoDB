require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to MongoDB Atlas!");
  }).catch(err => {
    console.error("Error connecting to MongoDB Atlas: ", err.message);
  });

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
app.use('/books/rating', ratingRoute);


module.exports = app;