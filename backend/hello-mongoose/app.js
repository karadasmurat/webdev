// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

// Mongoose - ODM layer for MongoDB
const connect = require("./src/config/db-config");
connect();

// import mongoose models
const { Author, Book } = require("./src/model/Library");
const Car = require("./src/model/Car");

// Serving static files: use the express.static built-in middleware function
// here, we use a directory, at the same level of this script, named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "public")));

// body parser
// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * *    Express Router middlewares   * * * * * * *
 */
// const routerTodos = require("./routes/router_todos");
// app.use("/api/todos", routerTodos);

// GET /hello
app.get("/hello", (req, res) => {
  res.send("Hello, from express!");
});

const getACar = () => {
  const makes = ["Audi", "BMW", "Mercedes", "Peugeot", "Renault", "VolksWagen"];

  const make = makes[Math.floor(Math.random() * makes.length)];
  const model = "model";
  const year = Math.floor(Math.random() * 100) + 1923;
  const newField = "MK"; // This field is not in the schema

  // An instance of a model is called a document.
  // note that the argument is object
  return new Car({ make, model, year, newField });
};

app.get("/create-car", async (req, res, next) => {
  const myCar = getACar();

  try {
    // Saves this document by inserting a new document into the database if document.isNew
    // or sends an updateOne operation with just the modified paths if isNew is false.
    await myCar.save();
  } catch (error) {
    // IMPORTANT - async handler - we must catch the error and pass it to the next() function
    next(error);
  }

  res.json(myCar);
});

app.get("/query-car", async (req, res) => {
  // find all documents
  // const cars = await Car.find({}).exec();

  // find all documents named john and at least 18
  const cars = await Car.find({ year: { $gte: 1990 } }).exec();

  for (let car of cars) {
    // calling custom document instance method
    car.startEngine();
    console.log(car.getFullName());
  }
  res.json(cars);
});

app.get("/query-car/:year", async (req, res) => {
  const { year } = req.params;

  // custom query, using "statics"
  const cars = await Car.findByYear(year).exec();

  for (let car of cars) {
    // calling custom document instance method
    car.startEngine();
    console.log(car.getFullName());
  }
  res.json(cars);
});

app.get("/mongoose-create", async (req, res, next) => {
  try {
    // Constructing Documents and saving to the DB
    // v1 - Model.prototype.save()
    // const author = new Author({name: "J.K. Rowling"})
    // await author.save()

    // v2 - Model.create() is a shortcut for saving one or more documents to the database.
    const author = await Author.create({ name: "J.K. Rowling" });

    // Saving refs to other documents works the same way you normally save properties, just assign the _id value:
    const book = new Book({
      title: "Harry Potter and the Philosopher's Stone",
      author: author._id, // NOTE: Manual assignment of FK!
    });

    await book.save();
  } catch (error) {
    // IMPORTANT - async handler - we must catch the error and pass it to the next() function
    next(error);
  }

  res.json(book);
});

app.get("/mongoose-query", async (req, res) => {
  // Saving refs to other documents works the same way you normally save properties, just assign the _id value:
  const book = await Book.findOne({
    title: "Harry Potter and the Philosopher's Stone",
  })
    .populate("author") // populate ref field from schema
    .exec();

  console.log(book.author.name);
  res.json(book);
});

// Define error-handling middleware functions in the same way as other middleware functions,
// except error-handling functions have four arguments instead of three: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("We have a problem!");
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
const EXPRESS_PORT = process.env.EXPRESS_PORT;

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});
