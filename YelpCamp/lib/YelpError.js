// YelpError - an error base for the app, which has a message, and a statusCode.
class YelpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'Yelp Error'; // set a fixed property value in constructor.
    }
}

// Custom error, further extending YelpError.
class InvalidParameterError extends YelpError {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.name = 'Invalid Parameter Error'; // set a fixed property value in constructor.
    }
}


// export custom error
module.exports = {
    YelpError,
    InvalidParameterError
};