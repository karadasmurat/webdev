import { useState } from "react";

export default function ExpandableText({ children }) {
  const [isExpanded, setExpanded] = useState(false);

  const content = isExpanded ? children : children.slice(0, 100) + "...";

  function toggle() {
    setExpanded(!isExpanded);
  }

  return (
    <div class="alert alert-primary my-3" role="alert">
      {content}
      {isExpanded ? (
        <button onClick={toggle} className="btn btn-outline-primary">
          Less
        </button>
      ) : (
        <button onClick={toggle} className="btn btn-outline-primary">
          More
        </button>
      )}
    </div>
  );
}
