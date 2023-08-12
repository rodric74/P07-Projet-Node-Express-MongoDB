require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to MongoDB Atlas!");
  }).catch(err => {
    console.error("Error connecting to MongoDB Atlas: ", err.message);
});

app.use(cors());

const signupRoute = require('./routes/auth/signup');
const loginRoute = require('./routes/auth/login');
const booksRoute = require('./routes/books/index');
const bookRoute = require('./routes/books/book');
const bestRatingRoute = require('./routes/books/bestrating');
const ratingRoute = require('./routes/books/rating');

app.use('/api/auth/signup', signupRoute);
app.use('/api/auth/login', loginRoute);
app.use('/api/books', booksRoute);
app.use('/api/books', bookRoute);
app.use('/api/books/bestrating', bestRatingRoute);
app.use('/api/books/rating', ratingRoute);


module.exports = app;