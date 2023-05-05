// user info
const sec = require('./lib/env');

// custom error
const yerr = require('./lib/YelpError');

// server-side validation
const Joi = require("joi");
// object desct, like without a module name
const {
    campgroundJoiSchema
} = require('./lib/joi_schemas');

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
const DBASE = 'yelp-camp';
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

// import mongoose Model
const Campground = require("./model/Campground");
const {
    YelpError
} = require('./lib/YelpError');

// GET /hello
app.get('/hello', (req, res) => {
    res.send('Hello, there!')
});

// GET /simplecamptest
app.get('/simplecamptest', async (req, res) => {
    const camp = new Campground({
        title: 'Test Camp'
    });
    await camp.save();

    res.send(camp);
});

// a route to throw an error
// Errors that occur in synchronous code inside route handlers and middleware require no extra work. 
app.get('/error', (req, res) => {
    throw new Error('EXPLICIT ERROR');
});

// For errors returned from asynchronous functions invoked by route handlers and middleware, 
// you MUST pass them to the next() function, where Express will catch and process them.:
app.get('/asyncerror1', (req, res, next) => {
    setTimeout(() => {
        try {
            throw new Error('BROKEN AFTER SOME TIME...')
        } catch (err) {
            next(err)
        }
    }, 1000);
});

app.get('/asyncerror2', (req, res, next) => {
    // Use promises to avoid the overhead of the try...catch block or when using functions that return promises:
    Promise.resolve()
        .then(() => {
            throw new Error('BROKEN')
        })
        .catch(next) // Errors will be passed to Express.
});



// GET /campgrounds
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", {
        campgrounds
    });
});

// Create Part 1
// GET the form, in order to create a model object
// In order not to crash, keep this route before /campgrounds/:id, since it would act as if "create" is an id.
app.get("/campgrounds/create", (req, res) => {
    console.log("GET /forms/campgrounds/create");

    // pass an empty campground object, create/update will use the same page.
    const campground = {};
    res.render('campgrounds/create_campground.ejs', {
        campground
    });
});

// Route parameters are named URL segments
// The captured values are populated in the req.params object
app.get('/campgrounds/:id', async (req, res) => {

    // console.log("GET /campgrounds/:id");

    const id = req.params.id;
    console.log(id);
    const campground = await Campground.findById(id);
    console.log(campground);

    res.render('campgrounds/campground_details.ejs', {
        campground
    });

    // if (!product) {
    //     // If not found, return 404 error
    //     return res.status(404).send('Product not found');
    // } else {
    //     res.status(200).send('Product found');
    // }

    // If todo is found, return it as JSON
    // res.json(product);

});

// UPDATE Part 1
// GET the filled form 
app.get("/campgrounds/:id/update", async (req, res) => {
    // findById
    const id = req.params.id;
    const campground = await Campground.findById(id);

    // render filled form, by passing the model object to page
    // res.render('campgrounds/update_campground.ejs', {
    //     campground
    // });

    // send to create instead
    res.render('campgrounds/create_campground.ejs', {
        campground
    });
});

// UPDATE Part 2
// PUT 
// Note that form has POST method, so will use method-override
app.put("/campgrounds/:id", async (req, res) => {
    console.log("PUT /campgrounds/:id");

    // construct an object from using the submitted form:
    const id = req.params.id;
    console.log(id);

    const updated_campground = {
        title: req.body.title,
        location: req.body.location,
        price: req.body.price
    };
    console.log(updated_campground);


    const camp = await Campground.findByIdAndUpdate(id, updated_campground);

    // We could also use 
    // const filter = {
    //     _id: id
    // };
    // const result = await Campground.findOneAndUpdate(filter, updated_campground);
    // console.log(result);


    // redirect to list all products after saving:
    res.redirect('/campgrounds');
});

// function for validation, will be middleware
// SERVER-SIDE VALIDATION USING JOI
const validateCampground = (req, res, next) => {

    // 1. a schema is constructed using the provided types and constraints:
    // campgroundJoiSchema = joischemas.campgroundJoiSchema;

    // 2. the value is validated against the defined schema:
    // returns an object. we can use object destructuring to access properties:
    const {
        error,
        value
    } = campgroundJoiSchema.validate(req.body);

    // If the input is valid, then the error will be undefined
    // ValidationError: "campground" is required
    // "campground.title" is not allowed to be empty
    // "campground.price" must be greater than or equal to 0
    if (error) {
        console.log(error);
        return next(new yerr.InvalidParameterError("Invalid Campground Data.", 400));
    } else {
        next(); // note that this is a middleware, so call next() without arguments to go on.
    }
}

// Create Part 2
// POST /campgrounds
// validateCampground middleware 
app.post('/campgrounds', validateCampground, async (req, res, next) => {
    console.log(req.body);

    // for async errors, you must pass them to the next() function
    // so, catch your own throw, or create an error and pass it to next.

    // MANUAL SERVER-SIDE VALIDATION
    // if (!req.body.campground) {
    //     // throw new Error("Invalid Campground Data.");

    //     // create an error and pass it to next.
    //     // 400 Bad Request
    //     return next(new yerr.MissingParameterError("Invalid Campground Data.", 400));
    // }

    // we use input names campground[title], campground[price] etc
    const new_campground = new Campground(req.body.campground);
    await new_campground.save();

    console.log(new_campground);

    // res.send(req.body);
    // res.send(new_campground);
    //res.send('POST /products')

    // redirect to list all products after saving:
    res.redirect('/campgrounds');
});

// DELETE
// Note that form has POST method, so will use method-override
app.delete("/campgrounds/:id", async (req, res) => {
    console.log("DELETE /campgrounds/:id");

    try {
        const id = req.params.id;
        const campground = await Campground.findByIdAndDelete(id);
        if (!campground) {
            return res.status(404).send({
                error: 'campground not found'
            });
        }
        // redirect to list all products after saving:
        res.redirect('/campgrounds');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }

});

// DELETE api
// Note that form has POST method, so will use method-override
app.delete("/api/campgrounds/:id", async (req, res) => {
    console.log("DELETE /api/campgrounds/:id");

    try {
        const id = req.params.id;
        const campground = await Campground.findByIdAndDelete(id);
        if (!campground) {
            // Not Found
            return res.sendStatus(404);
        }
        // OK - respond with a 204 status code
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

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