// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */

const mongoose = require("mongoose");
const options = {};

const connect = () => {
  mongoose
    .connect(process.env.ATLAS_CONN_STR, options)
    .then(console.log("Connected to mongodb.", process.env.ATLAS_CONN_STR))
    .catch((error) => console.log("Cannot connect. " + error));
};

module.exports = connect;
