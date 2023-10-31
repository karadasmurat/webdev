// check if the user is logged in. If not, redirect to GET /signin
const ensureLoggedIn = function (req, res, next) {
  // The isAuthenticated method is added by Passport middleware to the request object when the Passport middleware is initialized.
  if (!req.isAuthenticated()) {
    // req.flash('error', 'Authentication Required: Please sign in or register an account.');

    // RETURN - exit the function scope and prevent any code below in the handler from being executed
    return res.redirect("/auth/signin");
  }

  // if we are here, then user is logged in.
  // continue with the next middleware in the chain
  next();
};

module.exports = ensureLoggedIn;
