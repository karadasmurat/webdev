// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */

const mongoose = require("mongoose");
const options = {};

const connection = () => {
  mongoose
    .connect(process.env.LOCAL_CONN_STR, options)
    .then(console.log("Connected to mongodb.", process.env.LOCAL_CONN_STR))
    .catch((error) => console.log("Cannot connect. " + error));
};

module.exports = connection;
