require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
app.use(express.json());
app.use('/images', express.static('images'));

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   
}).catch(err => {
    console.error("Error connecting to MongoDB Atlas: ", err.message);
});

app.use(cors());

// Importation des routes// Fusionné signup et login
const booksRoute = require('./routes/book'); 

// Utilisation des routes
app.use('/api/auth', authRoutes); 
app.use('/api/books', booksRoute); 

module.exports = app;
