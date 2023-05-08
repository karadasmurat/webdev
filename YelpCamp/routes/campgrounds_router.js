const express = require('express');
const router = express.Router();

// import mongoose Model
const {
    Campground,
    Review
} = require("../model/Campground");

const {
    YelpError
} = require('../lib/YelpError');

// server-side validation
const Joi = require("joi");
// object desct, like without a module name
const {
    campgroundJoiSchema,
    reviewJoiSchema
} = require('../lib/joi_schemas');




// GET /campgrounds
router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", {
        campgrounds
    });
});

// Create Part 1
// GET the form, in order to create a model object
// In order not to crash, keep this route before /campgrounds/:id, since it would act as if "create" is an id.
router.get("/create", (req, res) => {
    console.log("GET /forms/campgrounds/create");

    // pass an empty campground object, create/update will use the same page.
    const campground = {};
    res.render('campgrounds/create_campground.ejs', {
        campground
    });
});

// Route parameters are named URL segments
// The captured values are populated in the req.params object
router.get('/:id', async (req, res) => {

    // Route parameters are named URL segments. 
    // The captured values are populated in the req.params object 
    // req.params: { "userId": "34", "bookId": "8989" }
    const cid = req.params.id;

    // Sorting at the time of population 
    // Note that you can also use the sort() method to sort the Review documents after they 've been populated, 
    // but this may not be as efficient as sorting them in the database query using the sort option.
    const campground = await Campground.findOne({
        _id: cid
    }).populate({
        path: 'reviews',
        options: {
            sort: {
                updatedAt: -1
            }
        }
    });

    // console.log(campground);

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
router.get("/:id/update", async (req, res) => {
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
router.put("/:id", async (req, res) => {
    console.log("PUT /campgrounds/:id");

    // construct an object from using the submitted form:
    const cid = req.params.id;
    // console.log(cid);

    // const updated_campground = {
    //     title: req.body.title,
    //     location: req.body.location,
    //     price: req.body.price
    // };

    // we use input names campgrounds[title], campgrounds[location] etc
    const updated_campground = req.body.campground;
    // console.log(updated_campground);


    // find using an _id filter, and update
    const camp = await Campground.findOneAndUpdate({
        _id: cid
    }, updated_campground);

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
router.post('/', validateCampground, async (req, res, next) => {
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
//router.delete("/api/campgrounds/:id", async (req, res) => {
router.delete("/:id", async (req, res) => {

    console.log("DELETE /campgrounds/:id");

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



module.exports = router;