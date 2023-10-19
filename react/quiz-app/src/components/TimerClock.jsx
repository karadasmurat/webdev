/**
 * Has an internal state, represents time.
 * State is conditionally updated by an effect, which has a delay.
 * State update causes re-rendering of this component.
 */
import { useEffect, useState } from "react";
import { parseSeconds, formatDigits } from "../util/util";

// JavaScript does not have support for enums (Typescript has)
const states = {
  NOT_STARTED: 0,
  RUNNING: 1,
  PAUSED: 2,
  DONE: 3,
  CANCELLED: 4,
};

export default function TimerClock({ start, onExpire }) {
  //   console.log("ClockTimer: render", start);
  const [count, setCount] = useState(start);
  const [timerState, setTimerState] = useState(states.RUNNING);

  const { seconds, minutes } = parseSeconds(count);

  useEffect(() => {
    let timerID;
    if (timerState == states.RUNNING) {
      timerID = setTimeout(() => {
        if (count < 1) {
          // Timer is done, callback.
          setTimerState(states.DONE);
          onExpire();
        } else {
          setCount((prev) => prev - 1);
        }
      }, 1000);

      //   console.log("Timer setup:", timerID);
    }
    // return an effect cleanup function
    return () => {
      //   console.log("Effect cleanup:", timerID);
      clearTimeout(timerID);
    };
  }, [count]);

  return (
    <>
      <h1>Cnt: {count}</h1>
      <div className="d-flex align-items-center gap-1">
        <div className="card p-1">
          <strong>{formatDigits(minutes)}</strong>
        </div>
        <span>:</span>
        <div className="card p-1">
          <strong>{formatDigits(seconds)}</strong>
        </div>
      </div>
    </>
  );
}
