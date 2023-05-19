import { useState } from "react";
import "./App.css";

import ListGroup from "./components/ListGroup";
import NavBar_Offcanvas from "./components/NavBar_Offcanvas";

function App() {
  const [count, setCount] = useState(0);

  // data to be passed to child
  const countries = ["Turkey", "UK", "Germany", "USA", "Japan"];
  const cities = ["Istanbul", "London", "Berlin", "New York", "Tokyo"];

  // a function to be passed to child
  // parent callback implementation
  function handleSelectItem(selectedItem) {
    console.log("I am the parent, and i am aware: " + selectedItem);
  }

  return (
    <div className="container">
      <NavBar_Offcanvas />

      {/* Notice that we only pass function name, we assume child knows how to call with right parameters! */}
      <ListGroup items={countries} onSelectItem={handleSelectItem} />
    </div>
  );
}

export default App;
