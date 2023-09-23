import useConsoleLog from "../hooks/useConsoleLog";
import useCounter from "../hooks/useCounter";
import useToggle from "../hooks/useToggle";
import { BsLightbulb, BsLightbulbFill } from "react-icons/bs";

export default function CustomHookDemo() {
  useConsoleLog("CustomHookDemo: hello, there! ");

  // custom hook: useCounter
  const { count, increment, decrement } = useCounter(100);
  // custom hook: useToggle
  const [isActive, toggleIsActive] = useToggle(false);

  return (
    <div className="container">
      <h1>Custom Hook Demo</h1>

      {/* useCounter: count as state and increment/decrement as state modifiers */}
      <p>{count}</p>
      <div className="d-flex gap-2">
        <button onClick={increment} className="btn btn-success">
          +
        </button>
        <button onClick={decrement} className="btn btn-warning">
          -
        </button>
      </div>
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">useToggle Custom Hook</h5>
          <p class="card-text">
            This hook allows you to manage a boolean state value and provides a
            function to toggle that value.
          </p>
          {/* useToggle: isActive as state and toggleIsActive as state modifier */}
          <button onClick={toggleIsActive} className="btn btn-primary">
            {isActive ? <BsLightbulbFill /> : <BsLightbulb />}
          </button>
        </div>
      </div>
    </div>
  );
}
