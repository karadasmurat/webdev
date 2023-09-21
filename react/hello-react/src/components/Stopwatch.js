import { useState, useRef } from "react";
import { BsPauseCircle, BsPlayCircle, BsStopCircle } from "react-icons/bs";
import IconButton from "./IconButton";

export default function Stopwatch() {
  //   const [startTime, setStartTime] = useState(null);
  //   const [now, setNow] = useState(null);
  const [timePassed, setTimePassed] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);

  function handleStartPause() {
    if (active) {
      stop();
    } else {
      start();
    }

    // toggle status
    setActive(!active);
  }

  function start() {
    const delay = 10;
    // setStartTime(Date.now());
    // setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimePassed((prev) => prev + delay / 1000);
    }, delay);
  }

  function stop() {
    clearInterval(intervalRef.current);
  }

  function reset() {
    clearInterval(intervalRef.current);
    setTimePassed(0);
  }

  //   let secondsPassed = 0;
  //   if (startTime != null && now != null) {
  //     secondsPassed = (now - startTime) / 1000;
  //   }

  return (
    <>
      {/* <h1>Time passed: {secondsPassed.toFixed(3)}</h1> */}
      <h1>Time passed: {timePassed}</h1>

      {active ? (
        <IconButton
          icon={<BsPauseCircle />}
          text="Pause"
          colorClass="warning"
          onClick={handleStartPause}
        />
      ) : (
        <IconButton
          icon={<BsPlayCircle />}
          text="Play"
          colorClass="success"
          onClick={handleStartPause}
        />
      )}

      <IconButton
        icon={<BsStopCircle />}
        text="Reset"
        colorClass="light"
        onClick={reset}
      />
    </>
  );
}
