import { useEffect, useState, useRef } from "react";
import "./App.css";
import Question, { QuestionControl } from "./components/Question";
import useFetch from "./hooks/useFetch";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { useSettingsContext } from "./context/SettingsContext";
import { toQueryString } from "./util/util";
import TimerClock from "./components/TimerClock";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "./components/ScoreBoard";
import { QuizScore } from "./model/QuizScore";
import GameResults from "./components/GameResults";

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

// JavaScript does not have support for enums (Typescript has)
const gameState = {
  NOT_STARTED: 0,
  RUNNING: 1,
  PAUSED: 2,
  GAMEOVER: 3,
  CANCELLED: 4,
};

function App() {
  const [currentState, setCurrentState] = useState(gameState.NOT_STARTED);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // When we use the "useContext" hook in a functional component in React,
  // we receive the value that was passed through the Context.Provider component's value prop.
  const { appSettings, setAppSettings } = useSettingsContext();

  // a regular variable, to be a property to a child component
  // let timeLimit = appSettings.questionTimeLimit;
  // console.log("App: render with timeLimit", timeLimit);

  // The useNavigate hook returns a function that lets you navigate programmatically
  const navigate = useNavigate();

  // Generate query parameters based on settings
  let questionURL = "http://localhost:3000/api/questions/";
  questionURL += toQueryString(appSettings);
  console.log(questionURL);

  // Fetch Questions based on settings
  // any changes to the state managed by your custom hook will result in a re-render of the component
  const { isLoading, data, error, fetchData } = useFetch(questionURL, 1000);

  // v1. we keep the "object representation of class instance in useState
  // const initScore = () => {
  //   return new QuizScore().toObject();
  // };
  // useState with an initializer
  // computation of that initial state to happen only once.
  // const [score, setScore] = useState(initScore);

  // v2. we can keep class instance itself in useState
  const [score, setScore] = useState(new QuizScore());

  const evaluate = () => {
    console.log("Evaluating...");
    // Create a class instance using the js object in the useState:
    const currentScore = new QuizScore(score);
    currentScore.update(false);
    // v2. we can keep class instance itself in useState
    setScore(currentScore);
  };

  const setupNextQuestion = () => {
    console.log("Setup the next question.");
    if (currentQuestionIndex + 1 < data.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentState(gameState.GAMEOVER);

      // navigate
      // options.state: You may include an optional state value in to store in history state
      navigate("/results", { state: score });
    }
  };
  const handleAnswer = () => {
    console.log("User answered!");
    evaluate();
    setupNextQuestion();
  };

  const handlePass = () => {
    console.log("User passed!");
    evaluate();
    setupNextQuestion();
  };

  const handleTimerExpiration = () => {
    console.log("Timer expired!");
    setupNextQuestion();
  };

  // return based on 3 variables, so ternary operator seems less readible.
  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Error err={error} />;
  } else if (!data || data.length == 0) {
    return <div className="alert alert-danger">No questions found.</div>;
  } else {
    console.log(data);
    return (
      <>
        <ScoreBoard score={score} />
        <h1>Game state: {currentState}</h1>
        {appSettings.questionTimeLimit > 0 ? (
          // You can force a subtree to reset its state by giving it a different key.
          <TimerClock
            key={currentQuestionIndex}
            start={appSettings.questionTimeLimit}
            onExpire={handleTimerExpiration}
          />
        ) : (
          "No time limit."
        )}
        <Question question={data[currentQuestionIndex]} />
        <QuestionControl onAnswer={handleAnswer} onPass={handlePass} />
        {currentState == gameState.GAMEOVER && <GameResults />}
      </>
    );
  }
}

export default App;
