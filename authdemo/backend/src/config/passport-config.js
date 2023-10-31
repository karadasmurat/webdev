// const pwdUtils = require("../lib/password_utils");

const passport = require("passport");

const User = require("../model/model_user_passport");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    // options
    {
      usernameField: "email",
      //   passwordField: "pwd"
    },
    // verify callback
    function (email, password, done) {
      console.log("LocalStrategy verify - with given email and password:");
      console.log(email, password);

      User.signin(email, password, done);
    }
  )
);

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    // options
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    // verify callback
    function (accessToken, refreshToken, profile, cb) {
      console.log("GoogleStrategy verify - with given profile:");
      console.log(profile);

      User.findOrCreate(profile, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// serialize authenticated user into the session: req.session.passport.user
// ie, using user._id or user.email, or any property of user:
// "session": {
//     "cookie": { ... },
//     "passport": {
//        "user": {
//            "id": "649590b7c0d898f1facea992",
//            "email": "test114@passport-local-mongoose"
//        }

//     "passport": { "user": "64944eae233a5d6fc6fb629b" }
//     "passport": { "user": "test105@passport-local-mongoose" }
// }
passport.serializeUser((userModelInstance, done) => {
  console.log("********* serializeUser");
  done(null, { id: userModelInstance._id, email: userModelInstance.email });
  // done(null, user._id);
  // done(null, user.email);
});

// Deserialize - Db query.
// deserializeUser will fetch the User stored in the session from the database, i.e
//     "passport": {
//        "user": {
//            "id": "649590b7c0d898f1facea992",
//            "email": "test114@passport-local-mongoose"
//        }
//     }
passport.deserializeUser((session_passport_user, done) => {
  console.log("********* deserializeUser");
  User.findById(session_passport_user.id).then((user) => done(null, user));
  // User.findOne({ arg }).then((user) => done(null, user));
});

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

//passport-local-mongoose implementation of serializeUser
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(passport.initialize());
// app.use(passport.session());

function extractSessionInfo(userModelInstance) {
  return { id: userModelInstance._id, email: userModelInstance.email };
}
