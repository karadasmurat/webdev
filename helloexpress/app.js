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
const express = require('express');

// The app object conventionally denotes the Express application. 
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require('path');

const todojs = require('./public/js/todo.js');

// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory 
app.set('views', path.join(__dirname, '/views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serving static files in Express
// here, we use a top-level directory named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, 'public')));

const port = 3001

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
const todos_v0 = require('./data/todos.json');
// process each item, add another property, and return. (map)
const todos = todos_v0.map(todo => {
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
        daysRemaining
    }
});

// Respond to GET request on the root route (/):
app.get('/', (req, res) => {
    //res.send('Hello World!')

    // send the rendered view to the client
    res.render('home.ejs');
})

app.get("/todos", (request, response) => {
    response.status(200).json(todos);
});

// pass a local variable (random die roll) to the view: {varName: value}
// shortcut: {varName}
app.get("/ejstodos", (request, response) => {
    response.render('todo.ejs', {
        todos
    });
});

// Route parameters are named URL segments
// The captured values are populated in the req.params object
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert ID from string to integer
    const todo = todos.find(todo => todo.id === id); // Find todo with matching ID

    if (!todo) {
        // If todo is not found, return 404 error
        return res.status(404).send('Todo not found');
    }

    // If todo is found, return it as JSON
    res.json(todo);
});


// Query parameters (i.e. ?a=1&b=2)
// req.query can be used to retrieve values for URL parameters.
app.get('/api/users', function (req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;

    res.send({
        'user_id': user_id,
        'token': token,
        'geo': geo
    });
});

// pass a local variable (random die roll) to the view: {varName: value}
// shortcut: {varName}
app.get("/rand", (request, response) => {
    const dieRoll = Math.floor(Math.random() * 6) + 1
    response.render('rand.ejs', {
        die: dieRoll
    });
});

// Respond to POST request on the root route (/):
app.post('/', (req, res) => {
    res.send('Got a POST request')
})

// Respond to a PUT request to the / user route:
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})


// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(port, () => {
    console.log(`helloexpress app listening on port ${port}`)
})