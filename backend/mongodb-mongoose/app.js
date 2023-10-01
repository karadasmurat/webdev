// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */
const connect = require("./config/db-config");
connect();

// import mongoose models
const { Author, Book } = require("./model/Library");

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

app.get("/mongoose-create", async (req, res) => {
  const author = await Author.create({ name: "J.K. Rowling" });

  // Saving refs to other documents works the same way you normally save properties, just assign the _id value:
  const book = new Book({
    title: "Harry Potter and the Philosopher's Stone",
    author: author._id, // assign the _id from the author
  });

  await book.save();

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

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
const EXPRESS_PORT = process.env.EXPRESS_PORT;

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});
