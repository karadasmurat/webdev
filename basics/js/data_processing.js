// When you use require to import a JSON file, Node.js automatically parses the JSON content and returns it as a JavaScript object.
const users = require("../data/users.json");
const schema_User = require("./userSchema");

const getAllUsers = () => {
  console.log("All users: ");

  // logging an object that contains nested objects results in:
  // phones: [ [Object], [Object] ]
  // console.log(users);

  // JSON.stringify with formatting, space parameter is set to 2
  // indicating that a two-space indentation should be used for each level of the JSON structure.
  console.log(JSON.stringify(users, null, 2));
};

const validateUser = (user) => {
  // 2. the value is validated against the defined schema:
  // returns an object. we can use object destructuring to access properties:
  // If the input is valid, then the error will be undefined.
  // If the input is invalid, error is assigned a ValidationError object providing more information.
  // value - the validated and normalized value.
  const { error, value } = schema_User.validate(user);

  if (error) {
    console.log(error);
  } else {
    console.log("Result" + JSON.stringify(value, null, 2));
  }
};

// getAllUsers();

const sampleUser = {
  username: "abc",
  name: { first: "John", last: "Doe" },
  hobbies: ["swimming", "soccer", "trekking"],
  phones: [
    { number: "9876543210", label: "Work" },
    { number: "5555555555", label: "Mobile" },
  ],
};

validateUser(sampleUser);
