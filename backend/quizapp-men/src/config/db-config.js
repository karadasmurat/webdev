// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */

const mongoose = require("mongoose");
const options = { autoIndex: false };

const connect = () => {
  const dbURI = process.env.ATLAS_CONN_STR + process.env.APP_NAME;
  mongoose
    .connect(dbURI, options)
    .then(console.log("Connected to mongodb.", dbURI))
    .catch((error) => console.log("Cannot connect. " + error));
};

module.exports = connect;
