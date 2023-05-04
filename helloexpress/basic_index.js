// user info
const sec = require('./env');

const express = require('express');

// The app object conventionally denotes the Express application. 
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require('path');

// web forms has method="POST"
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const mongoose = require('mongoose');

const EXPRESS_PORT = 3000;
//const HOST = '127.0.0.1';
const HOST = 'dev-cluster.ct6sszv.mongodb.net';
const MONGO_PORT = '27017';
const DBASE = 'test';
const LOCAL_CONN_STR = `mongodb://${HOST}:${MONGO_PORT}/${DBASE}`;
const ATLAS_CONN_STR = `mongodb+srv://${sec.MONGO_USER}:${sec.MONGO_PASS}@${HOST}/${DBASE}`;
const options = {};

mongoose.connect(ATLAS_CONN_STR, options)
    .then(console.log("Connected to mongodb."))
    .catch(error => console.log("Cannot connect. " + error));


// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory 
app.set('views', path.join(__dirname, '/views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serving static files: use the express.static built-in middleware function
// here, we use a directory, at the same level of this script, named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, 'public')));

// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// parse form
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));


// GET /hello
app.get('/hello', (req, res) => {
    res.send('Hello, there!')
});

// last middleware, 404
app.use(function (req, res, next) {
    // res.status(404).send('Not Found');
    res.sendStatus(404); // Since Express 4.0
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(EXPRESS_PORT, () => {
    console.log(`mongoose-express app listening on port ${EXPRESS_PORT}`)
});