// imperative way
const h1 = document.createElement("h1");
h1.textContent = "This is an imperative way to program";
document.getElementById("container").append(h1);

// Is that HTML.. in my javascript?
// No, not really. What you’re seeing is jsx in action, but the lines with HTML-like syntax do not represent actual DOM nodes.
// Instead, they are syntactic sugar for react’s internal representation of the DOM
const element = <h1>hello, react!</h1>;

const target = document.getElementById("root");
ReactDOM.createRoot(target).render(element);
