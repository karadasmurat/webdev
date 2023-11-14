require("dotenv").config();

// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */
const { connect, mongostore } = require("./src/config/db-config");
connect();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * *   express-session with connect-mongo    * * * * *
 */

const session = require("express-session");

// Put the session middleware before all of the routes.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // The name of the session ID cookie to set in the response (and read from in the request).
    // The default value is 'connect.sid'.
    name: "authtest.sid",
    // Forces the session to be saved back to the session store, even if the session was never modified during the request
    resave: false,
    saveUninitialized: true,
    // Settings object for the session ID cookie.
    cookie: {
      // sameSite: "None",
      httpOnly: true,
      secure: false, // require https-enabled website
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: mongostore,
  })
);

//connect-flash
// const flash = require("connect-flash");
// app.use(flash());

// custom error
// const yerr = require("./lib/YelpError");
// const { YelpError } = require("./lib/YelpError");

// import mongoose Model
// const { Campground, Review } = require("./model/Campground");

// server-side validation
// const Joi = require("joi");

// import Model - object desct, like without a module name
// const { campgroundJoiSchema, reviewJoiSchema } = require("./lib/joi_schemas");

// web forms has method="POST"
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));

// Passport is js library authentication middleware
// const User = require("./model/User");

// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory
// app.set("views", path.join(__dirname, "/views"));

// Set EJS as the view engine
// app.set("view engine", "ejs");

// Serving static files: use the express.static built-in middleware function
// here, we use a directory, at the same level of this script, named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "public")));

// body parser
// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// parse form
// for parsing application/x-www-form-urlencoded
// body-parser was previously a separate npm package, but starting from Express 4.16.0, it has been integrated into the core express module.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// body parser
// for parsing application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// custom middlewares
const logger = require("./src/middlewares/logger");
app.use(logger);

const {
  validateParam,
  requirePositiveInt,
  positiveIntegerSchema,
} = require("./src/middlewares/validation");
// app.use(validator);

// const ejsLocals = require("./middlewares/ejs-locals");
// app.use(ejsLocals);

// Express Router middlewares
// const routerDummy = require("./routes/router_dummy");
// app.use("/items", routerDummy);
const routerWorkouts = require("./src/routes/router_workouts");
app.use("/api/workouts", routerWorkouts);

// GET /hello
app.get("/hello", (req, res) => {
  res.send("Hello, there!");
});

app.get("/validate/:id", requirePositiveInt("id"), (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

// last middlewares, 404 and error handler
app.use(function (req, res, next) {
  // res.status(404).send('Not Found');
  res.sendStatus(404); // Since Express 4.0
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
const EXPRESS_PORT = process.env.EXPRESS_PORT;

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});
