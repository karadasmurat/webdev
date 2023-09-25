import { useState } from "react";

export function Wrapper(props) {
  // Wrapper provides a state and a state modifier
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  // we call render property
  return props.render(count, increment);
}

export function BtnClick(value, onClick) {
  return (
    <div className="d-flex align-items-center gap-2 m-2">
      <h3 className="m-0">Value: {value}</h3>

      <button onClick={onClick} className="btn btn-primary">
        Click me
      </button>
    </div>
  );
}

export function BtnHover(value, onMouseOver) {
  return (
    <div className="d-flex align-items-center gap-2 m-2">
      <h3 className="m-0">Value: {value}</h3>
      <button onMouseOver={onMouseOver} className="btn btn-primary">
        Hover me
      </button>
    </div>
  );
}
