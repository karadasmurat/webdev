// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

//enable CORS for all routes in the Express app:
const cors = require("cors");
app.use(cors());

// REGISTER BODY PARSER BEFORE REGISTERING ANY ROUTES!!
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Mongoose - ODM layer for MongoDB
const connect = require("./src/config/db-config");
connect();

// import mongoose models
const { Question } = require("./src/model/Question");
const { Tag } = require("./src/model/Tag");

/* * * * * * *    Express Router middlewares   * * * * * * */
const routerQuestion = require("./src/router/router_Question");
const routerTag = require("./src/router/router_Tag");
app.use("/api/questions", routerQuestion);
app.use("/api/tags", routerTag);

// Serving static files: use the express.static built-in middleware function
// here, we use a directory, at the same level of this script, named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "public")));

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * *    Express Router middlewares   * * * * * * *
 */
// const routerTodos = require("./routes/router_todos");
// app.use("/api/todos", routerTodos);

// GET /hello
app.get("/hello", (req, res) => {
  res.send("Hello, from express!");
});

app.get("/create-question", async (req, res, next) => {
  const { sampleQuestion } = require("./src/model/Question");
  const myQuestion = new Question(sampleQuestion);

  try {
    // Saves this document by inserting a new document into the database if document.isNew
    // or sends an updateOne operation with just the modified paths if isNew is false.
    await myQuestion.save();
  } catch (error) {
    // IMPORTANT - async handler - we must catch the error and pass it to the next() function
    next(error);
  }

  res.json(sampleQuestion);
});

// Define error-handling middleware functions in the same way as other middleware functions,
// except error-handling functions have four arguments instead of three: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("We have a problem!");
});

// last middlewares, 404 and error handler
app.use(function (req, res, next) {
  // res.status(404).send('Not Found');
  res.sendStatus(404); // Since Express 4.0
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
const EXPRESS_PORT = process.env.EXPRESS_PORT;

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});
