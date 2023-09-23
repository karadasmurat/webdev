import React, { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";

export function CountDown(props) {
  return (
    <Count
      type="CountDown"
      start={props.start}
      onCountdownEnd={props.onCountdownEnd}
    />
  );
}

export function CountUp(props) {
  return (
    <Count
      type="CountUp"
      start={props.start}
      onCountdownEnd={props.onCountdownEnd}
    />
  );
}

function Count({ type, start = 10, onCountdownEnd }) {
  //   console.log("CountDown: Rendering.");

  const [timeRemaining, setTimeRemaining] = useState(start);
  const [isActive, toggleIsActive] = useToggle(true);

  let timeoutID = 0;

  useEffect(() => {
    let delay = 10;
    let timePassed = delay / 1000;
    let timer;

    if (isActive) {
      if (timeRemaining > 0) {
        // Note. the delayed function sets state, which causes a re-render of component.
        // Therefore there is no need for a setInterval.
        timer = setTimeout(() => {
          console.log("tick", timer);

          if (type == "CountDown") {
            setTimeRemaining((prevTime) =>
              (parseFloat(prevTime) - timePassed).toFixed(2)
            );
          } else {
            setTimeRemaining((prevTime) =>
              (parseFloat(prevTime) + timePassed).toFixed(2)
            );
          }
        }, delay);
      } else {
        onCountdownEnd();
      }
    }

    // setup function returns a cleanup function
    return () => {
      console.log("cleanup", timer);
      clearTimeout(timer);
    };
  }, [isActive, timeRemaining, onCountdownEnd]);

  return (
    <div className="card m-3">
      <div class="card-body">
        <h5 class="card-title">{timeRemaining}</h5>
        <button onClick={toggleIsActive} className="btn btn-warning">
          {isActive ? (
            <span>
              <BsPauseCircleFill /> Pause
            </span>
          ) : (
            <span>
              <BsFillPlayCircleFill /> Resume
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
