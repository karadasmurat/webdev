const Joi = require('joi');

const campgroundJoiSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(), // a required string
        price: Joi.number().required().min(0),
        location: Joi.string(),
        image: Joi.string(),
        description: Joi.string()
    }).required()
});


// {review: { rating: "4", body: "test" } }
const reviewJoiSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(0), // a required number with a min value
        body: Joi.string()
    }).required()
});

module.exports = {
    campgroundJoiSchema,
    reviewJoiSchema
};