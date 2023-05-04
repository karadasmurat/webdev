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

// Create Part 2
// POST /campgrounds
app.post('/campgrounds', async (req, res) => {
    console.log(req.body);

    const new_campground = new Campground(req.body);
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