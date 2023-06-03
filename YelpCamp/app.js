require("dotenv").config();

// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// user info
// const sec = require("./lib/env");

//express-session with connect-mongo
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie: {
      httpOnly: true,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_CONN_STR,
      touchAfter: 24 * 60 * 60, // 24 hours period in seconds
      crypto: {
        secret: process.env.MONGOSTORE_SECRET,
      },
    }),
  })
);

//connect-flash
const flash = require("connect-flash");
app.use(flash());

// custom error
const yerr = require("./lib/YelpError");
const { YelpError } = require("./lib/YelpError");

// import mongoose Model
const { Campground, Review } = require("./model/Campground");

// server-side validation
const Joi = require("joi");

// import Model - object desct, like without a module name
const { campgroundJoiSchema, reviewJoiSchema } = require("./lib/joi_schemas");

// The Path module provides a way of working with directories and file paths.
const path = require("path");

// web forms has method="POST"
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Passport is js library authentication middleware
const User = require("./model/User");

const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mongoose - ODM layer for MongoDB
const mongoose = require("mongoose");

const EXPRESS_PORT = 3000;
const options = {};

mongoose
  .connect(process.env.ATLAS_CONN_STR, options)
  .then(console.log("Connected to mongodb."))
  .catch((error) => console.log("Cannot connect. " + error));

// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory
app.set("views", path.join(__dirname, "/views"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serving static files: use the express.static built-in middleware function
// here, we use a directory, at the same level of this script, named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "public")));

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

app.use(
  express.urlencoded({
    extended: true,
  })
);

// custom middlewares
// const sayHi = require("./middlewares/sayHi");
// app.use(sayHi);

const ejsLocals = require("./middlewares/ejs-locals");
app.use(ejsLocals);

// Express Routes
const campgroundsRouter = require("./routes/campgrounds_router");
app.use("/campgrounds", campgroundsRouter);

const reviewsRouter = require("./routes/reviews_router");
app.use("/", reviewsRouter);

const authRouter = require("./routes/auth_router");
app.use("/", authRouter);

// GET /hello
app.get("/hello", (req, res) => {
  res.send("Hello, there!");
});

// GET /simplecamptest
app.get("/simplecamptest", async (req, res) => {
  const camp = new Campground({
    title: "Test Camp",
  });
  await camp.save();

  res.send(camp);
});

app.get("/fake-user", async (req, res) => {
  const user = new User({
    email: "fake@example.com",
    username: "fake01",
  });

  // take the instance of Model, and plain-text password
  const newUser = await User.register(user, "monkey");

  res.send(newUser);
});

// set a flash message
app.get("/setflashmsg", (req, res) => {
  // Set a flash message by passing the key, followed by the value: req.flash(key, msg)
  req.flash(
    "success",
    "The flash is a special area of the session used for storing messages."
  );
  req.flash(
    "error",
    "Messages are written to the flash and cleared after being displayed to the user. "
  );

  res.redirect("/getflashmsg");
});

// display a flash message
app.get("/getflashmsg", (req, res) => {
  // Render an ejs page with messages
  // Option 1: without the use of res.locals - pass an object with different messages
  // Get an array of flash messages by passing the key: req.flash(key)
  // res.render("messages.ejs", {
  //     messages_success: req.flash("success"),
  //     messages_error: req.flash("error"),

  // });

  // Option 2 - use a middleware, for all routes, which puts flash messages into res.locals
  res.render("messages_test.ejs");
});

// a route to throw an error
// Errors that occur in synchronous code inside route handlers and middleware require no extra work.
app.get("/error", (req, res) => {
  throw new Error("EXPLICIT ERROR");
});

// For errors returned from asynchronous functions invoked by route handlers and middleware,
// you MUST pass them to the next() function, where Express will catch and process them.:
app.get("/asyncerror1", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN AFTER SOME TIME...");
    } catch (err) {
      next(err);
    }
  }, 1000);
});

app.get("/asyncerror2", (req, res, next) => {
  // Use promises to avoid the overhead of the try...catch block or when using functions that return promises:
  Promise.resolve()
    .then(() => {
      throw new Error("BROKEN");
    })
    .catch(next); // Errors will be passed to Express.
});

// 2 last middlewares, 404 and error handler
app.use(function (req, res, next) {
  // res.status(404).send('Not Found');
  res.sendStatus(404); // Since Express 4.0
});

// error handler
// Define error-handling middleware functions in the same way as other middleware functions,
// except error-handling functions have four arguments instead of three: (err, req, res, next)
app.use((err, req, res, next) => {
  // console.error(err.statusCode);
  // next(err); // we can pass the error is explicitly to the next error handler (i.e default, or custom below this one).
  // res.status(500).send('Something broke!');

  // render a custom error page with the err object
  res.status(err.statusCode || 500).render("error.ejs", {
    err,
  });
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(EXPRESS_PORT, () => {
  console.log(`mongoose-express app listening on port ${EXPRESS_PORT}`);
});
