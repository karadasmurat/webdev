// You can think of a router as a “mini-application,” capable only of performing middleware and routing functions.
// The top-level express object has a Router() method that creates a new router object.
// Once you’ve created a router object, you can add middleware and HTTP method routes
// (such as get, put, post, and so on) to it just like an application

const express = require("express");
const router = express.Router();

// import controller
const {
  validateSession,
  signIn,
  manualsignin,
  signUp,
  manualsignup,
  signout,
} = require("../controllers/controller_auth");

router.get("/validate-session", validateSession);
router.post("/signin", signIn);
router.post("/manualsignin", manualsignin);
router.post("/signup", signUp);
router.post("/manualsignup", manualsignup);
router.post("/signout", signout);

module.exports = router;
