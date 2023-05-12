require('dotenv').config();

// The app object conventionally denotes the Express application. 
const express = require('express');
// The Path module provides a way of working with directories and file paths.
const path = require('path');
const session = require('express-session');
// Passport is js library authentication middleware 
const passport = require("passport");
const mongoose = require('mongoose');

// user info
const sec = require('./lib/env');

// Routers
const authRouter = require('./routes/auth_router');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({
    extended: true
}));

// Serving static files: use the express.static built-in middleware function
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));


app.use(passport.initialize());
app.use(passport.session());



app.use('/auth', authRouter);



// web forms has method="POST"
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));



const EXPRESS_PORT = 3000;
const DBASE = 'auth-demo';
const LOCAL_CONN_STR = `mongodb://127.0.0.1:27017/${DBASE}`;
const ATLAS_CONN_STR = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev-cluster.ct6sszv.mongodb.net/${DBASE}`;
const options = {};

mongoose.connect(ATLAS_CONN_STR, options)
    .then(console.log("Connected to mongodb."))
    .catch(error => console.log("Cannot connect. " + error));




// GET /home
app.get('/home', (req, res) => {

    // res.send(req.session);
    // res.send(req.user);
    res.locals.currentUser = req.user;
    res.render("secret.ejs");

});


// List environment variables
app.get('/env', (req, res) => {
    res.send(process.env);
});

// a route to throw an error
// Errors that occur in synchronous code inside route handlers and middleware require no extra work. 
app.get('/error', (req, res) => {
    throw new Error('EXPLICIT ERROR');
});



// 2 last middlewares, 404 and error handler
app.use(function (req, res, next) {
    // res.status(404).send('Not Found');
    res.sendStatus(404); // Since Express 4.0
});

// error handler
// Define error-handling middleware functions in the same way as other middleware functions, 
// except error-handling functions have four arguments instead of three: (err, req, res, next)
app.use((err, req, res, next) => {
    // console.error(err.statusCode);
    // next(err); // we can pass the error is explicitly to the next error handler (i.e default, or custom below this one).
    // res.status(500).send('Something broke!');

    // render a custom error page with the err object
    res.status(err.statusCode || 500).render('error.ejs', {
        err
    });

});



// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(EXPRESS_PORT, () => {
    console.log(`mongoose-express app listening on port ${EXPRESS_PORT}`)
});