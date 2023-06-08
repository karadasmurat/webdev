import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setRunning] = useState(false);

  const btnText = isRunning ? "Pause" : "Resume";

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeElapsed((prevSec) => prevSec + 1);
    }, 1000);

    return () => clearInterval(interval);
  });
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "50px",
          height: "50px",
          border: "1px solid black",
          borderRadius: "50%",
        }}
      >
        {timeElapsed}
      </div>
      <button
        onClick={() => setRunning(!isRunning)}
        className={isRunning ? "btn btn-danger" : "btn btn-success"}
      >
        {btnText}
      </button>
    </>
  );
}
