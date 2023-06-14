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
      mongoUrl: process.env.LOCAL_CONN_STR,
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

// server-side validation
// const Joi = require("joi");

// import Model - object desct, like without a module name
// const { campgroundJoiSchema, reviewJoiSchema } = require("./lib/joi_schemas");

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

const EXPRESS_PORT = process.env.EXPRESS_PORT;
const options = {};

mongoose
  .connect(process.env.LOCAL_CONN_STR, options)
  .then(console.log("Connected to mongodb."))
  .catch((error) => console.log("Cannot connect. " + error));

// Serving static files: use the express.static built-in middleware function
// here, we use a directory, at the same level of this script, named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "public")));

// body parser
// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//enable CORS for all routes in the Express app:
const cors = require("cors");
app.use(cors());

// app.options("*", cors()); // enable pre-flight request
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   next();
// });

// custom middlewares
const logger = require("./middlewares/logger");
app.use(logger);

// const ejsLocals = require("./middlewares/ejs-locals");
// app.use(ejsLocals);

// Express Router middlewares
// const routerDummy = require("./routes/router_dummy");
// app.use("/items", routerDummy);
const routerTodos = require("./routes/router_todos");
const routerAuth = require("./routes/router_auth");
app.use("/api/todos", routerTodos);
app.use("/api/auth", routerAuth);

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
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});
