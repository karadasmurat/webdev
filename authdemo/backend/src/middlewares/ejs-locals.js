// middleware, for all requests
// make things available to views - using res.locals

module.exports = function (req, res, next) {

    // make user information (passport) available to views:
    // so, we'll be able to use in .ejs files:  <% if (!currentUser){ %>
    res.locals.currentUser = req.user;


    // make flash messages available to views, without explicity passing to them:
    // we have to pass it to the page as an object key-value: res.render('ejs', {messages: req.flash('error')})
    // res.locals is an object that contains response local variables scoped to the request, and therefore "available only to the view(s)" rendered
    // during that request / response cyle (if any)
    res.locals.messages_success = req.flash('success');
    res.locals.messages_error = req.flash('error');

    next();

}