import { useState } from "react";
import "./App.css";

import ListGroup from "./components/ListGroup";
import NavBar_Offcanvas from "./components/NavBar_Offcanvas";
import AcceptChildren from "./components/AcceptChildren";
import Like from "./components/Like";
import ObjectState from "./components/ObjectState";
import ExpandableText from "./components/ExpandableText";
import FetchData from "./components/FetchData";

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

      <AcceptChildren>
        <h3>Hello, there </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </AcceptChildren>

      {/* Notice that we only pass function name, we assume child knows how to call with right parameters! */}
      <ListGroup items={countries} onSelectItem={handleSelectItem} />

      <Like
        onClick={(status) => console.log("clicked. current status: " + status)}
      />

      <ObjectState />

      <ExpandableText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </ExpandableText>

      <FetchData />
    </div>
  );
}

export default App;
