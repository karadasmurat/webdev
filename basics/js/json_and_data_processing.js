// When you use require to import a JSON file, Node.js automatically parses the JSON content and returns it as a JavaScript object.
const users = require("../data/users.json");
const schema_User = require("./userSchema");

// Using backticks allows you to include line breaks and easily format the JSON structure.
// It also allows for string interpolation,
// where you can embed JavaScript expressions within ${} inside the template literal.
const jsonText = `  {
    "username": "johndoe",
    "fullname": { "name": "John", "lastname": "Doe" },
    "email": "johndoe@example.com",
    "hobbies": ["swimming", "guitar"],
    "birth_year": 1990,
    "phones": [
      { "number": "9876543210", "label": "Work" },
      { "number": "5555555555", "label": "Mobile" }
    ]
  }`;

function jsonapi_basics() {
  // Convert a JSON string into an object.
  const obj = JSON.parse(jsonText);
  console.log(obj.phones[0].number); // 9876543210

  // Convert a JavaScript value to a JSON string.
  // @param space = 2 for indentation
  const txt = JSON.stringify(users, null, 2);
  console.log(txt);
}

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
  birth_year: 2000,
  email: "doe@example.com",
  hobbies: ["swimming", "soccer", "trekking"],
  phones: [
    { number: "9876543210", label: "Work" },
    { number: "5555555555", label: "Mobile" },
  ],
};

// validateUser(sampleUser);
jsonapi_basics();
