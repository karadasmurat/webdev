/*

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
const express = require('express')
const app = express()

app.use(express.static("public"));

const port = 3001
// Sample todo data
const todos = [{
        id: 1,
        task: 'Buy groceries'
    },
    {
        id: 2,
        task: 'Do laundry'
    },
    {
        id: 3,
        task: 'Walk the dog'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/todos", (request, response) => {
    response.status(200).json(todos);
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

// Respond to POST request on the root route (/):
app.post('/', (req, res) => {
    res.send('Got a POST request')
})

// Respond to a PUT request to the / user route:
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.listen(port, () => {
    console.log(`helloexpress app listening on port ${port}`)
})