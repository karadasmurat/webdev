// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

// The Path module provides a way of working with directories and file paths.
const path = require("path");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *    Mongoose - ODM layer for MongoDB   * * * * *
 */
const connect = require("./config/db-config");
connect();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * *   express-session with connect-mongo    * * * * *
 */
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // The name of the session ID cookie to set in the response (and read from in the request).
    // The default value is 'connect.sid'.
    name: "mk.sid",
    // Forces the session to be saved back to the session store, even if the session was never modified during the request
    resave: false,
    saveUninitialized: true,
    cookie: {
      // sameSite: "None",
      httpOnly: true,
      secure: false, // require https-enabled website
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.LOCAL_CONN_STR,
      touchAfter: 24 * 60 * 60, // 24 hours period in seconds
      // crypto: {
      //   secret: process.env.MONGOSTORE_SECRET,
      // },
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

const User = require("./models/model_user_passport");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * *    Passport Authentication    * * * * * * *
 */
require("./config/passport-config");

// app.use(passport.initialize());
// app.use(passport.session());

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
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// app.options("*", cors()); // enable pre-flight request
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   next();
// });

// custom middlewares
// const logger = require("./middlewares/logger");
// app.use(logger);

// const ejsLocals = require("./middlewares/ejs-locals");
// app.use(ejsLocals);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * *    Express Router middlewares   * * * * * * *
 */
const routerTodos = require("./routes/router_todos");
const routerAuth = require("./routes/router_auth");
app.use("/api/todos", routerTodos);
app.use("/api/auth", routerAuth);

// GET /hello
app.get("/hello", (req, res) => {
  res.send("Hello, there!");
});

app.get("/setcookies", (req, res) => {
  res.cookie("school", "Hogwarts School of Witchcraft and Wizardry");

  // setting cookie attribute: expires in 60 seconds:
  res.cookie("rememberme", true, {
    // expires: new Date(Date.now() + 60 * 1000)
    maxAge: 60 * 1000, // Convenient option for setting the expiry time
  });

  res.send("Say hi to your newest cookie :)");
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
