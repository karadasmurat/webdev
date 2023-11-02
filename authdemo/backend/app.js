// The app object conventionally denotes the Express application.
const express = require("express");
const app = express();

// Access to variables in .env file via process.env.VAR_NAME
require("dotenv").config();

// The Path module provides a way of working with directories and file paths.
// const path = require("path");

//connect-flash
// const flash = require("connect-flash");

// middleware to make things available to views - using res.locals
// const ejsLocals = require("./middlewares/ejs-locals");

// view engine setup
// app.set("views", path.join(__dirname, "/views"));
// app.set("view engine", "ejs");

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

//enable CORS for all routes in the Express app:
const cors = require("cors");
app.use(cors());

// Serving static files: use the express.static built-in middleware function
// app.use(express.static(path.join(__dirname, "public")));

// app.use(flash());
// app.use(ejsLocals);

// Routers
const authRouter = require("./src/routes/auth_router");
app.use("/auth", authRouter);

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * *    Passport Authentication    * * * * * * *
 */
const passport = require("passport");
require("./src/config/passport-config");
app.use(passport.initialize());
app.use(passport.session());

// web forms has method="POST"
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
var cookieParser = require("cookie-parser");
// v1
// app.use(cookieParser());
// v2 - enable signed cookie support by passing a secret string
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/setcookies", (req, res) => {
  // Set cookie name to value.
  // The value parameter may be a string or object
  res.cookie("school", "Hogwarts School of Witchcraft and Wizardry");

  // Set the cookie with an object value:
  const wiz = { firstname: "Harry", lastname: "Potter" };
  res.cookie("wizard", wiz);

  res.cookie("rememberme", true);

  const options = {
    // expires: new Date(Date.now() + 60 * 1000)
    httpOnly: true, // Flags the cookie to be accessible only by the web server.
    maxAge: 60 * 1000, // Convenient option for setting the expiry time
    //path: "/", // Path for the cookie. Defaults to “/”.
    // secure: true, 	// Marks the cookie to be used with HTTPS only.
    signed: true, // Indicates if the cookie should be signed
  };

  // Setting the options parameter object
  res.cookie("liveshort", 60, options);

  res.send("Say hi to your newest cookie :)");
});

app.get("/getcookies", function (req, res) {
  // When using cookie-parser middleware, "req.cookies" property is an object
  // that contains cookies sent by the request.

  res.json({ cookies: req.cookies, signedCookies: req.signedCookies });
});

// check if user is logged in, middleware
const ensureLoggedIn = require("./src/middlewares/authentication");

// GET /home
app.get("/home", ensureLoggedIn, (req, res) => {
  res.locals.currentUser = req.user;
  res.render("secret.ejs");
});

// List environment variables
app.get("/env", (req, res) => {
  res.send(process.env);
});

// a route to throw an error
// Errors that occur in synchronous code inside route handlers and middleware require no extra work.
app.get("/error", (req, res) => {
  throw new Error("EXPLICIT ERROR");
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
const EXPRESS_PORT = process.env.EXPRESS_PORT;

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});
