import { useLocation } from "react-router-dom";

export default function GameResults() {

    // get "state" property of location
  const {state} = useLocation();
  console.log("GameResults: score:", location.state);
  return (
    <div>
      <h2>Game Over!</h2>
      {/* <p>Correct: {score.correct}</p>
      <p>Incorrect: {score.incorrect}</p>
      <p>Score: {score.score}</p> */}
    </div>
  );
}
