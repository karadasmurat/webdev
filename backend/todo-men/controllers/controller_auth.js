const { AuthError } = require("../lib/AppError");
const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

// JSON Web Token
const jwt = require("jsonwebtoken");

const attachUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication invalid" });
  }

  const decodedToken = jwtDecode(token.slice(7));
  if (!decodedToken) {
    return res
      .status(401)
      .json({ message: "There was a problem authorizing the request" });
  } else {
    req.user = decodedToken;
    next();
  }
};

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// we will check ObjectId - if any error caught is instance of mongoose.CastError
const mongoose = require("mongoose");

// mongoose Model
// const User = require("../models/model_user");
const User = require("../models/model_user_passport");

// verify session
// GET /validate-session
const validateSession = (req, res) => {
  console.log("validate session");
  if (!req.session.email) {
    return res.status(401).json({ error: "Authorization required." });
  }

  res.status(200).json({
    email: req.session.email,
    session: req.session,
    sessionID: req.sessionID,
  });
};

// manual register: hash password and save user (better after validating.)
// there could be errors handled to next, so there is a third parameter in the route handler.
const manualsignup = async (req, res, next) => {
  console.log("POST /manualsignup");
  // res.send(req.body);

  // get payload data from the request body
  const { email, password } = req.body;

  // hash the password, and store in db:
  const salt = await bcrypt.genSalt(SALTROUNDS);
  const hash = await bcrypt.hash(password, salt);

  // create a model instance with the same email, but hashed password:
  const user = new User({
    email,
    password: hash,
  });

  try {
    await user.save();

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    // TODO there could be ValidatorError from mongoose
    // MongoServerError: E11000 duplicate key error

    // res.send(e);
    // res.send(e.errmsg);
    console.log(err);

    // catch the error, stop executing, create a custom error and give this error to the next:
    return next(new AuthError(err.errmsg));
  }

  // res.redirect("/auth/signin");
};

// model statics
const signup_model = async (req, res, next) => {
  console.log("signup_model");

  // get payload data from the request body
  const { email, password } = req.body;

  // create a model instance with the email:
  // note that we configured passport with usernameField: "email",
  const user = new User({ email });

  try {
    // passport-local-mongoose adds register
    // use an instance of Model, and plain-text password
    await User.register(user, password);

    // custom static method to signup, replacing register
    // await User.signup(email, password);

    // 201 Created
    res.status(201).json({ message: "User created." });
  } catch (err) {
    // catch the error, stop executing, create a custom error and give this error to the next:
    console.log(err);
  }
};

// TODO testing purposes
const signin_model = async (req, res) => {
  // get payload data from the request body
  const { email, password } = req.body;

  const existing_user = await User.signin(email, password);

  if (!existing_user) {
    // 401 response indicates that authorization has been refused for those credentials
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("Sign in successfull");

  // Store a session variable:
  // since we use express-session, there is a cookie "connect.sid"
  // To store or access session data, simply use the request property req.session:
  req.session.email = email;

  res
    .status(200)
    .json({ email, session: req.session, sessionID: req.sessionID });
};

const setup_session = async (req, res) => {
  // Store a session variable:
  // since we use express-session, there is a cookie "connect.sid"
  // To store or access session data, simply use the request property req.session:
  //req.session.email = "DEFAULT@TEST.COM";

  res.status(200).json({
    email: req.session.email,
    session: req.session,
    sessionID: req.sessionID,
  });
};

// 1. manual signin
// Sign in with username and password
const manualsignin = async (req, res) => {
  // res.send(request.body);

  // 1. get the credentials from request body,
  // 2. get the user from db.
  // 3. compare plain password with hash from db.

  // get payload data from the request body
  const { email, password } = req.body;
  // console.log(email);

  const existing_user = await User.findOne({ email });

  if (!existing_user) {
    // console.log("user not found");

    // stop execution, and handle error to next middleware: (return next with an error)
    // return next(new AuthError("User not found", 403));

    // 401 response indicates that authorization has been refused for those credentials
    return res.status(401).json({ message: "Unauthorized" });
  }

  // verify password: compare plain password with hash from db.
  const pass_match = await bcrypt.compare(password, existing_user.password);
  if (!pass_match) {
    // stop execution, and handle error to next middleware: (return next with an error)
    // return next(new AuthError("Incorrect Password", 403));
    // 401 response indicates that authorization has been refused for those credentials
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Successfully signed in.

  // Option A. create a token ?
  // const token = createToken(existing_user._id);

  // Option B ?
  // Store a session variable:
  // since we use express-session, there is a cookie "connect.sid"
  // To store or access session data, simply use the request property req.session:
  req.session.email = email;
  // req.session.save(); // ??
  // console.log("sessionID:", req.session.sessionID);

  // res.status(200).json({ email, token });
  res
    .status(200)
    .json({ email, session: req.session, sessionID: req.sessionID });
};

const signout = async (req, res, next) => {
  const sid = req.sessionID;
  req.session.destroy();
  res.status(200).json({ sid, msg: "Session destroyed." });
};

// export functions
module.exports = {
  validateSession,
  manualsignup,
  signup_model,
  manualsignin,
  setup_session,
  signin_model,
  signout,
};
