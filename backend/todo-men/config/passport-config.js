const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/model_user_passport");

// passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy(User.signin));

// customize property names
// LocalStrategy expects exactly "username" and "password" fields.
const opts = {
  usernameField: "email",
  //   passwordField: "pwd"
};

const verifyCallback = async (email, password, done) => {
  try {
    const existing_user = await User.findOne({ email });

    if (!existing_user) {
      //   return done(null, false); // 401
      return done(new Error("User not found."));
    }

    // verify password: compare plain password with hash from db.
    const pass_match = await bcrypt.compare(password, existing_user.password);
    if (!pass_match) {
      console.log("Invalid password.");
      // return res.status(401).json({ message: "Unauthorized" });

      //   return done(null, false); // 401
      return done(new Error("Unauthorized."));
    }

    return done(null, existing_user);
  } catch (err) {
    return done(err);
  }
};
const strategy = new LocalStrategy(opts, verifyCallback);

passport.use(strategy);

// serialize user object into the session
// ie, using user._id or user.email:
// "session": {
//     "cookie": { ... },
//     "passport": { "user": "64944eae233a5d6fc6fb629b" }
//     "passport": { "user": "test105@passport-local-mongoose" }
// }
passport.serializeUser((user, done) => {
  done(null, user._id);
  //   done(null, user.email);
});

passport.deserializeUser((arg, done) => {
  User.findById(arg).then((user) => done(null, user));
  //   User.findOne({ arg }).then((user) => done(null, user));
});

//passport-local-mongoose implementation of serializeUser
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(passport.initialize());
// app.use(passport.session());
