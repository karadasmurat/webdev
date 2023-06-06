require("dotenv").config();

// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

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

//enable CORS for all routes in the Express app:
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// custom middlewares
const logger = require("./middlewares/logger");
app.use(logger);

// const ejsLocals = require("./middlewares/ejs-locals");
// app.use(ejsLocals);

// Express Router middlewares
// const routerDummy = require("./routes/router_dummy");
// app.use("/items", routerDummy);
// const routerWorkouts = require("./routes/router_workouts");
const routerTodos = require("./routes/router_todos");
app.use("/api/todos", routerTodos);

// GET /hello
app.get("/hello", (req, res) => {
  res.send("Hello, there!");
});

// last middlewares, 404 and error handler
app.use(function (req, res, next) {
  // res.status(404).send('Not Found');
  res.sendStatus(404); // Since Express 4.0
});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(EXPRESS_PORT, () => {
  console.log(`mongoose-express app listening on port ${EXPRESS_PORT}`);
});
