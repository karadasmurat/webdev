// AppError - an error base for the app, which has a message, and a statusCode.
// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     // set a fixed property value in constructor (thus, not a constructor parameter)
//     this.name = "App Error";
//   }
// }

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Error constructor
    this.statusCode = statusCode || 500;
    this.name = this.constructor.name; // This line sets the name to the class name
    Error.captureStackTrace(this, this.constructor);
  }
}

// Custom error, with a default statusCode=400
// Encountering an invalid parameter, the preferred way to respond would typically involve returning an appropriate HTTP response code (such as 400 Bad Request) along with an error message detailing the issue with the invalid parameter.
class InvalidParameterError extends AppError {
  constructor(message, statusCode = 400) {
    super(message, statusCode);
    this.name = this.constructor.name; // this.name = "Invalid Parameter Error"; // set a fixed property value in constructor.
  }
}

// Custom error, with a default statusCode=400
class AuthError extends AppError {
  constructor(message, statusCode = 400) {
    super(message, statusCode);
    this.name = this.constructor.name; // this.name = "Auth Error";
  }
}

// ES6 Modules
// export { AppError, InvalidParameterError, AuthError };

// CommonJS, named export
module.exports = {
  AppError,
  InvalidParameterError,
  AuthError,
};
