// GameTimer.js
import React, { useState, useEffect } from "react";

function GameTimer({ gameTimeLimit, onTimeUp }) {
  const [timeRemaining, setTimeRemaining] = useState(gameTimeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Time's up for the game
        clearInterval(timer);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp]);

  return (
    <div>
      <p>Time Remaining: {timeRemaining} seconds</p>
    </div>
  );
}

export default GameTimer;
