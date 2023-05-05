const Joi = require('joi');

const campgroundJoiSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(), // a required string
        price: Joi.number().required().min(0),
    }).required()
});

module.exports = {
    campgroundJoiSchema
};