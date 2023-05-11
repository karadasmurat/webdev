const express = require('express');
const router = express.Router();


// Passport is js library authentication middleware 
const passport = require("passport");

// import mongoose Model
const User = require("../model/User");


// custom error
const {
    AuthError
} = require('../lib/AppError')


// server-side validation
const Joi = require("joi");
// object desct, like without a module name
const {
    userJoiSchema
} = require('../lib/joi_schemas');

// import bcrypt
// const bcrypt = require('bcrypt');
// const SALTROUNDS = 12;



// function for validation, will be middleware
// SERVER-SIDE VALIDATION USING JOI
const validateUser = (req, res, next) => {

    // 1. a schema is constructed (we imported using require)

    // 2. the value is validated against the defined schema:
    // returns an object. we can use object destructuring to access properties:
    const userinfo = req.body
    const {
        error,
        value
    } = userJoiSchema.validate(userinfo);

    // If the input is valid, then the error will be undefined
    // ValidationError: "campground" is required
    // "campground.title" is not allowed to be empty
    // "campground.price" must be greater than or equal to 0
    if (error) {
        console.log(error);
        // next with an error:
        return next(new AuthError("Invalid User Data.", 400));
    } else {
        next(); // note that this is a middleware, so call next() without arguments to go on.
    }
}



// middleware to check auth status 
// highly coupled with the login implementation which sets a session object named "account"
const requireLogin = (req, res, next) => {

    if (!req.session.account) {

        // stop execution, return with a redirect.
        return res.redirect('/signin');
    }

    next();
}



// GET /secret
router.get('/secret', requireLogin, (req, res, next) => {

    // Note that requireLogin middleware checks authentication status.
    const account = req.session.account;
    res.render("secret.ejs", {
        account
    });
});

// GET /topsecret
router.get('/topsecret', requireLogin, (req, res, next) => {

    // Note that requireLogin middleware checks authentication status.
    res.send("Top Secret!");
});

// GET register form

router.get('/register', (req, res) => {
    res.render("auth/register");
});

// CREATE a new user after validating.
// there could be errors handled to next, so there is a third parameter in the route handler.
router.post('/register', validateUser, async (req, res, next) => {

    console.log("/POST register")
    // res.send(req.body);

    // get form data from the request body
    const userinfo = req.body.user;

    // manual auth
    // hash the password
    // const salt = await bcrypt.genSalt(SALTROUNDS);
    // const hash = await bcrypt.hash(userinfo.password, salt);

    // passport
    // create a mongoose Model using form data
    // passport-local will add a username, hash and salt fields
    const user = new User({
        username: userinfo.username,
        email: userinfo.email
    });


    try {
        // manual auth
        // await user.save();

        // register the user: take the instance of Model, and plain-text password
        const registeredUser = await User.register(user, userinfo.password);
    } catch (e) {
        // res.send(e);
        // res.send(e.errmsg);

        // catch the error, stop executing, create a custom error and give this error to the next:
        return next(new AuthError(e.errmsg));

    }


    res.redirect("/campgrounds");

});


// GET signin form
router.get('/signin', (req, res) => {

    // note that we might be here from a fresh signin request, or 
    // redirected after a FAILED login, with an 'error' flash message by passport.



    // Option 1 - without a flash-message middleware that uses req.locals:
    // render the page with an object:
    // res.render("auth/signin", {
    //     // messages_success: req.flash('success'),
    //     messages_error: req.flash('error')
    // });


    res.render("auth/signin.ejs");
});


// POST signin form
// Sign in with username and password, using passport.authenticate() middleware
router.post('/signin', passport.authenticate('local', {
    failureFlash: true, //TODO
    failureRedirect: '/signin'
}), async (req, res, next) => {

    // note that if we are here, it means passport.authanticate middleware passed.
    // if it failed, it would have failureRedirect to GET /signin

    const message_error = req.flash('error')[0]; // get the first error message from the array
    res.redirect("/campgrounds");


});


// LOGOUT
// In the case of a /logout route, which is used to log out a user, it makes more sense to use the POST method. 
// The reason for this is that logging out typically involves modifying the server-side state (i.e. the session), 
// and the POST method is more appropriate for modifying server-side data.
// Using GET to log out a user could be problematic because GET requests are usually cached by the browser
router.post('/signout', (req, res, next) => {

    // manual
    // req.session.userID = null;
    // req.session.destroy();

    // passport
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }

        // Logout successful, redirect to the desired destination
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });

});


module.exports = router;