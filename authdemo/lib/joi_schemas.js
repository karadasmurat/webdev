const Joi = require('joi');

const userJoiSchema = Joi.object({
    user: Joi.object({
        username: Joi.string().required(), // a required string
        password: Joi.string().required(),
        email: Joi.string(),
    }).required()
});

module.exports = {
    userJoiSchema
};