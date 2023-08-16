require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas!");
}).catch(err => {
    console.error("Error connecting to MongoDB Atlas: ", err.message);
});

app.use(cors());

// Importation des routes
const authRoutes = require('./routes/authRoutes'); // Fusionné signup et login
const booksRoute = require('./routes/book'); // Toutes les routes de livres sont maintenant ici

// Utilisation des routes
app.use('/api/auth', authRoutes); // Gère à la fois signup et login
app.use('/api/books', booksRoute); // Gère toutes les routes liées aux livres

module.exports = app;
