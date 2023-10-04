/**
 * Define Author and Book models.
 * Book has a reference field, author. (like FK)
 */
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
});

const Author = mongoose.model("Author", authorSchema);

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Types.ObjectId, ref: "Author" }, // ref: FK
});
const Book = mongoose.model("Book", bookSchema);

module.exports = { Author, Book };
