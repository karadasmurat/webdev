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
