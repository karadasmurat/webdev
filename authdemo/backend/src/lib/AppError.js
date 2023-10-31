// YelpError - an error base for the app, which has a message, and a statusCode.
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'App Error'; // set a fixed property value in constructor.
    }
}

// Custom error, further extending YelpError.
class InvalidParameterError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.name = 'Invalid Parameter Error'; // set a fixed property value in constructor.
    }
}

// Custom error, further extending YelpError.
class AuthError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.name = 'Auth Error'; // set a fixed property value in constructor.
    }
}


// export custom error
module.exports = {
    AppError,
    InvalidParameterError,
    AuthError
};