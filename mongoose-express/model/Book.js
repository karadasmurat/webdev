const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: { // fk property: "ref"
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = {
    Author,
    Book
}