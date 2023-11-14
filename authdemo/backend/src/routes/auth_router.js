const express = require("express");
const router = express.Router();

const z = require("zod");
const { AuthError, InvalidParameterError } = require("../lib/Error");

// An implementation of JSON Web Tokens
const jwt = require("jsonwebtoken");

// Google API Client Library
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
async function verifyGoogleCredential(token, client_id) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  });
  const payload = ticket.getPayload();
  console.log("payload:", payload);
}

// Argon2 is the winner of the 2015 Password Hashing Competition
const argon2 = require("argon2");

// import bcrypt
const bcrypt = require("bcrypt");
const SALTROUNDS = 12;

// import mongoose Model
const { User } = require("../model/User");

const passport = require("passport");
/* 

var LocalStrategy = require("passport-local").Strategy;

var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("GoogleStrategy verify - with given profile:");
      console.log(profile);

      User.findOrCreate(profile, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

// validation middleware for user payload of the request.
function validateUser(req, res, next) {
  // 1. a schema is constructed / imported
  // zod: creating a schema
  const schema = z.object({
    email: z.string().email({ message: "Oops! Please check email" }),
    password: z.string(),
  });

  // 2. the value is validated against the defined schema:
  // extract value from request body
  const { user } = req.body;

  try {
    schema.parse(user); // => throws ZodError
  } catch (err) {
    console.log("We have a problem.");
    // next with an error:
    return next(new InvalidParameterError("Invalid User Data."));
  }

  next();
}

// wrap middleware to accept arguments: schema.parse(value);
function validate(schema, value) {
  // return a middleware
  return (req, res, next) => {
    // 2. the value is validated against the defined schema:
    try {
      schema.parse(value); // => throws ZodError
    } catch (err) {
      console.log("We have a problem.");
      // next with an error:
      return next(new InvalidParameterError("Invalid User Data."));
    }

    next();
  };
}

// middleware to check auth status
// highly coupled with the login implementation which sets a session object named "account"
const requireLogin = (req, res, next) => {
  if (!req.session.account) {
    // stop execution, return with a redirect.
    return res.redirect("/auth/signin");
  }

  next();
};

// GET /secret
router.get("/secret", requireLogin, (req, res, next) => {
  // Note that requireLogin middleware checks authentication status.
  const account = req.session.account;
  res.render("secret.ejs", {
    account,
  });
});

// GET /topsecret
router.get("/topsecret", requireLogin, (req, res, next) => {
  // Note that requireLogin middleware checks authentication status.
  res.send("Top Secret!");
});

// GET register form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// 1. manual signup
// CREATE a new user after validating.
// there could be errors handled to next, so there is a third parameter in the route handler.
router.post("/signup", validateUser, async (req, res, next) => {
  console.log("/POST signup");
  let newUser = undefined;

  // get form information in request body
  const { user } = req.body;

  // note that signup logic is implemented as a static model function:
  try {
    console.log("Begin Registering user.", user);
    newUser = await User.signup(user.email, user.password);
    console.log("Done Registering user.", newUser);
  } catch (error) {
    console.log("Error registering user.", error);
    // give this error to the next:
    return next(error);
  }

  res.json(newUser);
  // res.redirect("/auth/signin");
});

// 2. passport-local register
// CREATE a new user after validating.
// there could be errors handled to next, so there is a third parameter in the route handler.
router.post("/register/local", validateUser, async (req, res, next) => {
  console.log(req.body.user);
  // res.send(req.body);

  // get form data from the request body
  const userinfo = req.body.user;

  const user = new User({
    username: userinfo.username,
    email: userinfo.email,
  });

  console.log("Register user:");
  console.log(user);

  try {
    // Register the user using passport-local-mongoose
    // use an instance of Model, and plain-text password
    await User.register(user, userinfo.password);

    req.flash("success", "Welcome, you can login now.");
    res.redirect("/auth/signin");
  } catch (e) {
    // catch the error, stop executing, create a custom error and give this error to the next:
    return next(new AuthError(e.errmsg));
  }
});

// GET signin form
router.get("/signin", (req, res) => {
  res.render("auth/signin.ejs");
});

// 1. manual signin
// Sign in with username and password
router.post("/signin", async (req, res) => {
  // res.send(request.body);

  // 1. get the credentials from request body,
  // 2. get the user from db.
  // 3. compare plain password with hash from db.

  // get the object containing the parameters from request body
  // note that input names on the form are: user[username], user[password]
  const body_user = req.body.user;
  // console.log(body_user);

  const existing_user = await User.findOne({
    username: body_user.username,
  });

  if (!existing_user) {
    console.log("user not found");
    //res.status(404).send("User not found.");

    // stop execution, and handle error to next middleware: (return next with an error)
    return next(new AuthError("User not found", 403));
  } else {
    // compare plain password with hash from db.
    const pass_match = await bcrypt.compare(
      body_user.password,
      existing_user.password
    );
    if (!pass_match) {
      // res.status(404).send("Incorrect Password.");

      // stop execution, and handle error to next middleware: (return next with an error)
      return next(new AuthError("Incorrect Password", 403));
    } else {
      // Successfully signed in.
      // since we use express-session, there is a cookie "connect.sid"
      // Store a session variable:

      const account = {
        id: existing_user._id,
        username: existing_user.username,
      };
      req.session.account = account;

      console.log("Session set. redirecting to secret resource.");

      // pass session object to ejs
      res.render("secret.ejs", {
        account,
      });
    }
  }
});

// 2. passport-local
// Sign in with username and password, using passport.authenticate() middleware
// note that since forms are user[username] and user[password] we use a middleware to update req.body
router.post(
  "/signin/local",
  (req, res, next) => {
    req.body.username = req.body.user.username;
    req.body.password = req.body.user.password;

    console.log(req.body.username);
    console.log(req.body.password);

    next();
  },
  passport.authenticate("local", {
    failureFlash: true, //TODO
    failureRedirect: "/auth/signin",
  }),
  async (req, res, next) => {
    // note that if we are here, it means passport.authanticate middleware passed.
    // if it failed, it would have failureRedirect to GET /signin

    const message_error = req.flash("error")[0]; // get the first error message from the array
    res.redirect("/home");
  }
);

// 3. Sign in with Google, Passport
router.get(
  "/signin/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Sign in with Google, Passport - Redirect URL
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/auth/signin",
  })
);

// Sign in with Google, Manual - Redirect URL
// Your server-side endpoints must handle the following HTTP POST requests.
router.post("/google/redirect", (req, res) => {
  console.log(req.body.credential);
  verifyGoogleCredential(
    req.body.credential,
    process.env.GOOGLE_CLIENT_ID
  ).catch(console.error);
});

// LOGOUT
// In the case of a /logout route, which is used to log out a user, it makes more sense to use the POST method.
// The reason for this is that logging out typically involves modifying the server-side state (i.e. the session),
// and the POST method is more appropriate for modifying server-side data.
// Using GET to log out a user could be problematic because GET requests are usually cached by the browser
router.post("/signout", (req, res, next) => {
  // req.session.userID = null;
  req.session.destroy();

  res.redirect("/auth/signin");
});

/* * * * * * * * * * * * * * * * * * * * *
 * * * * * * *    Argon2     * * * * * * *
 */
router.post("/argon2/hash", async (req, res) => {
  // const password = req.body.password;
  const { password } = req.body;

  let hashedPassword = await argon2.hash(password);
  res.status(200).json({ hashedPassword });
});

router.post("/argon2/verify", async (req, res) => {
  const PASSWORD_1 = "123456";
  const PASSWORD_2 = "123";
  const HASH_1 =
    "$argon2id$v=19$m=65536,t=3,p=4$O9FPQ4OnPGDCLs4nNHpPRA$hpsByNjv+EIbr64FtxizGZpBkaliP6L9ndTc+CaD4vk";

  // const password = req.body.password;
  // const { password } = req.body;
  // let hashedPassword = await argon2.hash(password);

  try {
    // const verified = await argon2.verify(hashedPassword, password);
    const verified = await argon2.verify(HASH_1, PASSWORD_1);
    if (!verified) {
      // password did not match
      return res.status(401).json({ err: "fail" });
    } else {
    }
  } catch (err) {
    // internal failure
    console.log(err);
  }

  // password match
  return res.status(200).json({ msg: "pass" });
});

module.exports = router;
function verify(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!user.verifyPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
}
