// The app object conventionally denotes the Express application. 
const express = require('express');
const app = express();

// user info
const sec = require('./lib/env');

//session
const session = require('express-session');
app.use(session({
    secret: sec.SESSION_SECRET
}));

// The Path module provides a way of working with directories and file paths.
const path = require('path');

// web forms has method="POST"
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));

const mongoose = require('mongoose');

const EXPRESS_PORT = 3000;
const DBASE = 'auth-demo';
const LOCAL_CONN_STR = `mongodb://127.0.0.1:27017/${DBASE}`;
const ATLAS_CONN_STR = `mongodb+srv://${sec.MONGO_USER}:${sec.MONGO_PASS}@dev-cluster.ct6sszv.mongodb.net/${DBASE}`;
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
// body-parser was previously a separate npm package, but starting from Express 4.16.0, it has been integrated into the core express module. 
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.urlencoded({
    extended: true
}));

// middleware to check auth status 
// highly coupled with the login implementation which sets a session object named "account"
const requireLogin = (req, res, next) => {

    if (!req.session.account) {

        // stop execution, return with a redirect.
        return res.redirect('/auth/signin');
    }

    next();
}


// Express Router
const authRouter = require('./routes/auth_router');
app.use('/auth', authRouter);



// GET /hello
app.get('/hello', (req, res) => {
    res.send('Hello, there!');
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