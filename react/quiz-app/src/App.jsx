import { useState } from "react";
import "./App.css";
import Question, { QuestionControl } from "./components/Question";

const questions = [
  {
    _id: 0,
    type: "selectOne",
    category: "Geography",
    difficulty: "easy",
    text: "What is the capital of France?",
    options: ["Paris", "London", "Istanbul", "Washington"],
  },
  {
    _id: 1,
    type: "selectMany",
    category: "Mathematics",
    difficulty: "Intermediate",
    tags: ["Prime Numbers", "Number Theory"],
    text: "Which of the following are even numbers?",
    options: ["2", "4", "5", "9"],
  },
  {
    _id: 2,
    type: "selectOne",
    category: "Science",
    difficulty: "Easy",
    tags: ["Biology", "Animals"],
    text: "True or False: Birds are mammals.",
    options: ["True", "False"],
    explanation: "False. Birds are not mammals; they belong to the class Aves.",
  },
  {
    _id: 3,
    type: "openEnded",
    category: "Science",
    difficulty: "Easy",
    tags: ["Biology", "Animals"],
    text: "5 * 5 = ?",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    console.log("User answered!");
  };

  const handlePass = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    console.log("User passed!");
  };

  return (
    <>
      <Question question={questions[currentQuestionIndex]} />
      <QuestionControl onAnswer={handleAnswer} onPass={handlePass} />
    </>
  );
}

export default App;
