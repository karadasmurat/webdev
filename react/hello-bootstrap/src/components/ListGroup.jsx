import { useState } from "react";

// function as props
export default function ListGroup({ items, onSelectItem }) {
  // pass using props
  // const items = ["Istanbul", "London", "Berlin", "New York", "Tokyo"];

  // a state variable, keeping track of the index of selected list item:
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleClick(e, i) {
    //console.log(e);

    //update state
    setSelectedIndex(i);
  }

  return (
    <div>
      <h1>My List</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            onClick={(e) => {
              handleClick(e, index);
              onSelectItem(item); // callback function from the props
            }}
            className={
              index === selectedIndex
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
