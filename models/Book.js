const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'user',
        required: true
    },

    grade: {
        type: Number, 
        required: true, 
        min:0,
        max:5
    }

});

const bookSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title:{
        type: String,
        required: true
    },

    author:{
        type: String,
        required:true
    },

    imageUrl:{
        type: String, 
        required: true
    },

    year:{
        type: Number,
        required: true
    },

    genre:{
        type: String,
        required: true
    },

    rating: [ratingSchema],

    averageRating:{
        type: Number,
        default: 0
    }

});


module.exports = mongoose.model('Book', bookSchema)