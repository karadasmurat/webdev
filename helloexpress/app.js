/*
Express is a minimal and flexible Node.js web application framework.

Application
The app object conventionally denotes the Express application.
Create it by calling the top - level express() function exported by the Express module:

    var express = require('express')
    var app = express()


Basic routing
Routing refers to determining how an application responds to a client request to a particular endpoint, 
which is a URI(or path) and a specific HTTP request method(GET, POST, and so on).
Route definition takes the following structure:

    app.method(PATH, HANDLER)

Where: 
 • app is an instance of express.
 • method is an HTTP request method, in lowercase.
 • PATH is a path on the server. (i.e '/home')
 • HANDLER is the function executed when the route is matched.

*/

// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

const todojs = require("./public/js/todo.js");

// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory
app.set("views", path.join(__dirname, "/views"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// app.use - middleware
// Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
app.use(function (req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`
  );

  // If the current middleware function does not end the request-response cycle, it must call callback handler (next) to pass control to the next middleware function.
  // Otherwise, the request will be left hanging.
  next();
});

// create a middleware function called “requestTime” to add a property called "requestTime" to the request object:
// This property can be accessed by the subsequent middleware functions or the routes
// to perform certain actions based on the timestamp.
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

// Serving static files in Express
// here, we use a top-level directory named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "public")));

// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 3001;

// Sample todo data
// const todos = [{
//         id: 1,
//         task: 'Buy groceries'
//     },
//     {
//         id: 2,
//         task: 'Do laundry'
//     },
//     {
//         id: 3,
//         task: 'Walk the dog'
//     }
// ];

// In Node.js, we can directly require a JSON file and it will be parsed into a JavaScript object.
const todos_v0 = require("./data/todos.json");
// process each item, add another property, and return. (map)
const todos = todos_v0.map((todo) => {
  let status = "NA";
  if (todo.completed) {
    status = "completed";
  } else if (todojs.passedDueDate(todo.due_date)) {
    status = "missed";
  } else {
    status = "on_track";
  }
  const daysRemaining = todojs.getRemainingDays(todo.due_date);
  return {
    ...todo,
    status,
    daysRemaining,
  };
});

// Respond to GET request on the root route (/):
app.get("/", (req, res) => {
  //res.send('Hello World!')

  // send the rendered view to the client
  res.render("home.ejs");
});

app.get("/api/todos", (request, response) => {
  response.status(200).json(todos);
});

// render with options to pass a local variable (todos) to the view: {varName: value}
// shortcut: {varName}
app.get("/todos", (request, response) => {
  response.render("todos/index.ejs", {
    todos,
  });
});

// GET the form, in order to create a todo
app.get("/todos/new", (request, response) => {
  response.render("todos/new.ejs");
});

// Create todo - Respond to a POST request to the /todos route:
app.post("/todos", (req, res) => {
  console.log(req.body);
  const { title, description, due_date, priority } = req.body;
  todos.push({
    title,
    description,
    due_date,
    priority,
  });
  //res.send(req.body);
  //res.send('Got a POST request at /todos')
  res.redirect("/todos");
});

// Route parameters are named URL segments
// The captured values are populated in the req.params object
app.get("/todos/:id", (req, res) => {
  // parse the id parameter from the URL path as an integer.
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    // Handle the case where the parsed value is not a valid number
    return res.status(400).send("Invalid ID");
  }
  const todo = todos.find((todo) => todo.id === id); // Find todo with matching ID

  if (!todo) {
    // If todo is not found, return 404 error
    return res.status(404).send("Todo not found");
  }

  // If todo is found, return it as JSON
  res.json(todo);
});

// Query parameters (i.e. ?a=1&b=2)
// req.query can be used to retrieve values for URL parameters.
app.get("/api/users", function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    user_id: user_id,
    token: token,
    geo: geo,
  });
});

// pass a local variable (random die roll) to the view: {varName: value}
// shortcut: {varName}
app.get("/rand", (request, response) => {
  const dieRoll = Math.floor(Math.random() * 6) + 1;
  response.render("rand.ejs", {
    die: dieRoll,
  });
});

// Respond to POST request on the root route (/):
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

// Respond to a PUT request to the / user route:
app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

// last middleware, 404
app.use(function (req, res, next) {
  // res.status(404).send('Not Found');
  res.sendStatus(404); // Since Express 4.0
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(PORT, () => {
  console.log(`helloexpress app listening on port ${PORT}`);
});
