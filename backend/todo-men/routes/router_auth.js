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
  passport.authenticate("local"),

  setup_session
);

router.post("/signout", signout);

module.exports = router;
