import axios from "axios";

type Person = {
  name: string;
};

const chars = [
  { name: "Harry" },
  { name: "Ron" },
  { name: "Hermione" },
  { name: "Draco" },
];

// The function returns a Promise.
// To simulate work, the executor resolves with an object -resolve(obj)- after a second has elapsed.
export function getaWizard(): Promise<Person> {
  return new Promise((resolve, reject) => {
    // since we will execute resolve with a parameter, we wrap resolve cb with an arrow function:
    setTimeout(
      () => resolve(chars[Math.floor(Math.random() * chars.length)]),
      1000
    );
  });
}

export async function getaWizard_async(): Promise<Person> {
  // Simulate an asynchronous operation, where
  // we would normally "await" another async function, here we mock await a new Promise to be resolved in a second:
  // just mock resolve, without a parameter, so in setTimeoout we use resolve cb directly, without wrapping in an arrow function:
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });

  // Return the result
  return chars[Math.floor(Math.random() * chars.length)];
}

export async function fetchUser(): Promise<Person> {
  console.log("Fetching user info ...");
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  console.log("Email: ", user.email);
  return { name: user.name };
}

export async function axios_getUser() {
  return axios
    .get("https://jsonplaceholder.typicode.com/users/2", {
      timeout: 5000,
    })
    .then((res) => {
      return { name: res.data.name };
    });
}
