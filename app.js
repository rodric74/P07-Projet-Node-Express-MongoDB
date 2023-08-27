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


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   
}).catch(err => {
    console.error("Error connecting to MongoDB Atlas: ", err.message);
});

app.use(cors());


const bookRoutes = require('./routes/bookRoutes'); 
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes); 
app.use('/api/books', bookRoutes); 

module.exports = app;
