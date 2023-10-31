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
    .then(console.log("Connected to mongodb."))
    .catch((error) => console.log("Cannot connect. " + error));
};

const MongoStore = require("connect-mongo");
const mongostore = MongoStore.create({
  mongoUrl: process.env.ATLAS_CONN_STR,
  touchAfter: 24 * 60 * 60, // 24 hours period in seconds
  // crypto: {
  //   secret: process.env.MONGOSTORE_SECRET,
  // },
});

module.exports = { connect, mongostore };
