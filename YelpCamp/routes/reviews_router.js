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




// function for validation, will be middleware
// SERVER-SIDE VALIDATION USING JOI
const validateReview = (req, res, next) => {

    // 1. a schema is constructed (we imported using require)

    // 2. the value is validated against the defined schema:
    // returns an object. we can use object destructuring to access properties:
    const {
        error,
        value
    } = reviewJoiSchema.validate(req.body);

    // If the input is valid, then the error will be undefined
    // ValidationError: "campground" is required
    // "campground.title" is not allowed to be empty
    // "campground.price" must be greater than or equal to 0
    if (error) {
        console.log(error);
        return next(new yerr.InvalidParameterError("Invalid Review Data.", 400));
    } else {
        next(); // note that this is a middleware, so call next() without arguments to go on.
    }
}


// CREATE a Review
// validateCampground middleware 
router.post('/campgrounds/:id/reviews', validateReview, async (req, res) => {

    // note that campground id is a route parameter
    const cid = req.params.id;

    // we use input names review[rating], review[body] etc
    // therefore, we have a review object in the request:
    const {
        review
    } = req.body

    // res.send(review);
    // { rating: "4", body: "test" }

    // update the relationship, then save both:
    const campground = await Campground.findOne({
        _id: cid
    })
    if (!campground) {
        return res.sendStatus(404);

    }

    const new_review = new Review(review);
    console.log(new_review);

    // update both ends of relationship
    new_review.campground = campground;
    campground.reviews.push(new_review);

    // save both ends of relationship
    await campground.save()
    await new_review.save();

    // console.log(new_campground);

    // redirect to list all products after saving:
    req.flash("success", "Saved review.");
    res.redirect(`/campgrounds/${cid}`);
});

// DELETE a Review
router.delete("/campgrounds/:id/reviews/:rid", async (req, res) => {

    console.log("DELETE /campgrounds/:cid/reviews/:rid");

    try {
        // in our model, the relationship has 2 ends.
        // so we delete the review, and update campground's array of references accordingly:

        const rid = req.params.rid;
        const review = await Review.findOneAndDelete({
            _id: rid
        });
        console.log(review);
        if (!review) {
            // Not Found, return
            return res.sendStatus(404);
        }

        // update campground's array of references:
        // $pull operator 
        // removes from an "existing array" all instances of a value or values that match a specified condition.
        const campground = Campground.findOneAndUpdate({
            _id: req.params.cid
        }, {
            $pull: {
                reviews: rid // remove from array "reviews", where item = rid
            }
        });

        // OK - respond with a 204 status code
        req.flash("success", "Deleted review.");
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});





module.exports = router;