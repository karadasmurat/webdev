import { MouseEvent } from "react";
import Bug from "../models/Bug";

interface BugListProps {
  bugs: Bug[];
  onSelectItem(bug: Bug): void; //callbackFn
}

// render the array as a list (props.bugs)
// onclick, notify parent of the selected bug (props.onSelectItem)
export default function BugList({ bugs, onSelectItem }: BugListProps) {
  const handleClick = (event: MouseEvent, bug: Bug) => {
    console.log("click!", bug.id);

    // notify parent of the selected bug:
    onSelectItem(bug); //callbackFn
  };

  const bugListItems = bugs.map((bug) => (
    <li
      key={bug.id}
      className={
        bug.fixed
          ? "list-group-item text-success"
          : "list-group-item text-danger"
      }
      onClick={(e) => handleClick(e, bug)}
    >
      {bug.title}
    </li>
  ));

  return bugs.length === 0 ? (
    <h3>No bugs found.</h3>
  ) : (
    <div className="card">
      <div className="card-header">List of Bugs</div>
      <ul className="list-group list-group-flush">{bugListItems}</ul>
    </div>
  );
}
