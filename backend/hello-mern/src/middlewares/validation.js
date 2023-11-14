const { z } = require("zod");

// Define a schema for positive integers
// Define a schema for positive integers
// const positiveIntegerSchema = z.number().int().positive();
const schema_PositiveInteger = z.coerce.number().int().positive(); // z.coerce.number(); // Number(input)

// Generic validation middleware
// Parse and validate the parameter using the provided schema
function validateParam(paramName, schema) {
  return (req, res, next) => {
    try {
      console.log("Validating", req.params[paramName]);
      // Attempt to parse and validate
      schema.parse(req.params[paramName]);
      // If successful, move to the next middleware or route handler
      next();
    } catch (error) {
      // Validation fails, call next with error
      next(error);
    }
  };
}

// shorthand
function requirePositiveInt(paramName) {
  return validateParam(paramName, schema_PositiveInteger);
}

module.exports = { validateParam, requirePositiveInt, schema_PositiveInteger };
