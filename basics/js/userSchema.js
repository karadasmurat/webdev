const Joi = require("joi");

const schema_Name = Joi.object({
  first: Joi.string(),
  last: Joi.string(),
});

const schema_Phone = Joi.object({
  number: Joi.string(),
  label: Joi.string(),
});

const schema_User = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  // nested object
  name: schema_Name,
  // an array of strings
  hobbies: Joi.array().items(Joi.string()),
  // an array of objects
  phones: Joi.array().items(schema_Phone),
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = schema_User;
