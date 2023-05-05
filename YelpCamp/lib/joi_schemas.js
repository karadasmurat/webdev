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

module.exports = {
    campgroundJoiSchema
};