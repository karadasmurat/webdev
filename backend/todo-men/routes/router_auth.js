// You can think of a router as a “mini-application,” capable only of performing middleware and routing functions.
// The top-level express object has a Router() method that creates a new router object.
// Once you’ve created a router object, you can add middleware and HTTP method routes
// (such as get, put, post, and so on) to it just like an application

const express = require("express");
const router = express.Router();

const passport = require("passport");

// import controller
const {
  validateSession,
  manualsignup,
  signup_model,
  manualsignin,
  setup_session,
  signin_model,

  signout,
  authFailure,
} = require("../controllers/controller_auth");

router.get("/validate-session", validateSession);

router.post("/signup", signup_model);
// router.post("/signup", manualsignup);

// router.post("/signin", signin_model);
// router.post("/signin", manualsignin);
router.post(
  "/signin",

  // intercept by passport middleware
  // passport.authenticate("local", { failureRedirect: "/auth-failure" }),
  passport.authenticate("local", { failureRedirect: "/api/auth/auth-failure" }),

  setup_session
);

// 3a. Sign in with Google
router.get(
  "/signin/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 3b. Sign in with Google - Redirect URL
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/api/auth/auth-failure",
  })
);

router.post("/signout", signout);

router.get("/auth-failure", authFailure);

module.exports = router;
