export default function ScoreBoard({ score }) {
  return (
    <div className="d-flex gap-2">
      <div>Correct: {score.correct}</div>
      <div>Incorrect: {score.incorrect}</div>
      <div>Score: {score.score}</div>
    </div>
  );
}
