function createLink() {
  // create Elements
  const desc = document.createElement("p");
  // Element.append() - String objects are inserted as equivalent Text nodes
  desc.append("Popular Search Engines:");
  // document.body.append(desc);

  const myLink = document.createElement("a");
  myLink.setAttribute("href", "http://www.google.com");
  myLink.innerText = "Google Search";

  // Element.append() can append several nodes
  document.body.append(desc, myLink);

  // Modify Elements
  const element1 = document.querySelector("a");
  element1.style.color = "deeppink";
}
function createInput() {
  const input_name = document.createElement("input");
  input_name.setAttribute("type", "text");
  input_name.setAttribute("id", "name");

  input_name.addEventListener("change", function () {
    console.log(input_name.value);
  });

  const label_name = document.createElement("label");
  label_name.setAttribute("for", "name");
  label_name.innerText = "Name";

  // Element.append() can append several nodes
  document.body.append(label_name, input_name);
}

// createLink();
createInput();

let h = {
  lastName: "Potter",
  age: 17,
  isWizard: true,
  favoriteColor: null,
  wand: {
    wood: "Holly",
    core: "Phoenix feather",
    length: 11.5,
  },
  courses: ["Potions", "Defense Against the Dark Arts"],
};

console.log(JSON.stringify(h, null, 2));


