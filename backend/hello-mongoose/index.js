const mongoose = require("mongoose");

// import mongoose models
const { Author, Book } = require("./model/Library");
const Blog = require("./model/Blog");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */
const connect = require("./config/db-config");
connect();

// With Mongoose, everything is derived from a Schema.
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  score: Number,
  rating: String,
});

// The next step is compiling our schema into a Model.
// A model is a class with which we construct documents.
const Movie = mongoose.model("Movie", movieSchema);

// create a movie document
const movie_amadeus = new Movie({
  title: "Amedeus",
  year: 1986,
  score: 9.2,
  rating: "R",
});

// CREATE
// Each document can be saved to the database by calling its save method.
movie_amadeus.save();

// READ
// The model class exposes several static and instance methods to perform operations on the database.
// find all documents
let query = {
  year: {
    $gte: 2000,
  },
};
Movie.find(query).then((data) => log("find", data));

// Finds a single document by its _id field.
Movie.findById("6450163338496497e004b120").then((data) =>
  console.log("Movie.findById: ", data)
);

// UPDATE
// Movie.updateOne({
//         title: 'Amedeus'
//     }, {
//         year: 2071
//     })
//     .then(res => console.log("UPDATED!" + res.modifiedCount));

const opt = {
  new: true,
};
Movie.findOneAndUpdate(
  query,
  {
    title: "New Amedeus 2",
  },
  opt
).then((m) => console.log(m));

createBasics();
deleteBasics();

function log(title, msg) {
  console.log(title);
  console.log(msg);
}

async function createBasics() {
  // Example 2 - create a schema/model file: model/Blog.js
  // Create a new blog post object
  console.log("CREATE BASICS");
  console.log("-------------");

  const article = new Blog({
    title: "Awesome Post!",
    slug: "awesome-post",
    published: true,
    content: "This is the best post ever",
    tags: ["featured", "announcement"],
  });

  // Insert the article in our MongoDB database
  await article.save();
}

// Deleting data
// Just like in the standard MongoDB Node.js driver, we have the deleteOne() and deleteMany() methods.
async function deleteBasics() {
  console.log("DELETE BASICS");
  console.log("-------------");

  // Deletes all of the documents that match conditions from the collection.
  query = {
    title: "Awesome Post!",
  };
  const res = await Blog.deleteMany(query).then((m) => console.log(m));
  console.log(res); // { acknowledged: true, deletedCount: 2 }

  // findOneAndDelete() is used to delete a single document and retrieve its contents,
  // while deleteOne() is used to delete a single document and receive information about the deletion operation.
  // const deletedCar = await Car.findOneAndDelete({ make: "BMW" });
  // const result = await Car.deleteOne({ make: "BMW" });
  // console.log(`Deleted ${result.deletedCount} car(s).`);
}
