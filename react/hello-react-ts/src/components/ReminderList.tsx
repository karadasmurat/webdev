import { MouseEvent } from "react";
import Reminder from "../models/Reminder";
import { useState } from "react";

// Type definition of props for this component
interface ReminderListProps {
  items: Reminder[];
  onSelectItem(id: number): void;
}

export default function ReminderList({
  items,
  onSelectItem,
}: ReminderListProps) {
  //state
  const [selectedItemID, setSelectedItemID] = useState(-1);

  // event handler
  const handleClick = (event: MouseEvent, id: number) => {
    console.log(event);

    // When a user interacts with a component, the component’s output changes: update state
    setSelectedItemID(id);

    onSelectItem(id);
  };

  // conditional rendering
  // return "this" or "that", based on item count
  return items.length === 0 ? (
    <h1>No items found.</h1>
  ) : (
    <div>
      <h1>Reminders</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            // update state on click event, wrap with arrow function to send a item.id as parameter:
            onClick={(e) => handleClick(e, item.id)}
            // conditional css class, based on state
            className={
              item.id === selectedItemID
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
