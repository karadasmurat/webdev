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

// A simple custom middleware function
const myLogger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`
  );
  // Calling the next middleware function, the third argument that is passed to the middleware function
  next();
};
// app.use - middleware
// Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
app.use(myLogger);

// create a middleware function called “requestTime” to add a property called "requestTime" to the request object:
// This property can be accessed by the subsequent middleware functions or the routes
// to perform certain actions based on the timestamp.
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

// Dummy users
var users = [
  { id: 0, name: "user0", email: "tj@vision-media.ca", role: "member" },
  { id: 1, name: "user1", email: "ciaranj@gmail.com", role: "member" },
  { id: 2, name: "user2", email: "aaron@gmail.com", role: "admin" },
];

// simple middleware to load a dummy user based on the id provided in the route parameters.
function loadUser(req, res, next) {
  // You would fetch your user from the db
  var user = users[req.params.id];
  if (user) {
    // If a user with the specified id exists, attach it to the req object as req.user
    req.user = user;
    next();
  } else {
    // If no user is found for the provided id, you call next() with an error message
    // indicating that loading the user has failed.
    next(new Error("Failed to load user " + req.params.id));
  }
}

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
const Car = require("./src/domain/Car.js");
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

// Handling a GET request to the root URL ("/hello")
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/json", (req, res) => {
  const myCar = new Car("Kia", "Sorento", 2007);
  res.json(myCar);
});

// Use middleware to preprocess data before it reaches a route handler:
// This route includes the loadUser middleware as the second argument,
// which means that loadUser will run before the route handler.
app.get("/user/:id", loadUser, function (req, res) {
  res.send("Viewing user " + req.user.name);
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
app.get("/routeparameters/:id", (req, res) => {
  // v1 - access properties of req.params object
  const ID = req.params.id;
  // v2 - destructure req.params object
  // note that we have to use the same name with the object property while destructuring
  const { id } = req.params;
  res.send(
    `<code>const ID = req.params.id</code>  : ${ID}
     <br>
     <code>const {id} = req.params</code>: ${id}`
  );
});

// Route Parameters Validation:
app.get("/validateInteger/:id", (req, res) => {
  // Note that parseInt does not throw an error if it encounters a non-integer string.
  // Instead, it returns NaN (Not-a-Number):
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    // The parameter is not a valid integer
    res.status(400).send("Invalid ID");
  } else {
    // userId is a valid integer
    res.send(`ID: ${userId}`);
  }
});

// Query parameters appear after the question mark (?) in the URL
// http://localhost:3001/queryparameters?sort=asc&query=express
app.get("/queryparameters", (req, res) => {
  // v2 - destructure req.query object
  // Note that if a query parameter is not provided in the URL,
  // attempting to access it directly using req.query will result in undefined.
  const { query, sort } = req.query;

  res.send(`Search Query: ${query}, Sort Order: ${sort}`);
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

// Errors that occur in synchronous code inside route handlers and middleware require no extra work.
app.get("/error", (req, res) => {
  throw new Error("EXPLICIT ERROR");
});

// error handler
// Define error-handling middleware functions in the same way as other middleware functions, 
// except error-handling functions have four arguments instead of three: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("We have a problem!");
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
