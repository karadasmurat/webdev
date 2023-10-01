import Card from "./components/Card";
import mkImg from "./assets/images/mk.jpeg";
import { useRef, useState } from "react";
import Settings from "./components/Settings";
import Modal from "./components/Modal";

export default function Game() {
  function newRound() {
    questionSetup();
    clearAnswer();
  }

  function questionSetup() {
    setNumber1(Math.floor(Math.random() * 9) + 1);
    setNumber2(Math.floor(Math.random() * 9) + 1);
  }

  const clearAnswer = () => {
    if (answerRef.current) {
      answerRef.current.value = "";
    }
  };

  const [number1, setNumber1] = useState(Math.floor(Math.random() * 9) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 9) + 1);
  const [rounds, setRounds] = useState(0);
  const [score, setScore] = useState(0);
  const answerRef = useRef<HTMLInputElement>(null);

  const [appTitle, setAppTitle] = useState<string>("Default App Title");

  const handleUpdateTitle = (newTitle: string) => {
    setAppTitle(newTitle);
  };

  const evaluateAnswer = (e: React.FormEvent) => {
    console.log("Evaluating...");
    setRounds((prev) => prev + 1); // update score
    const target = number1 * number2;
    e.preventDefault();
    if (target == parseInt(answerRef.current?.value ?? "0")) {
      setScore((prev) => prev + 1); // update score
    }

    newRound();
  };

  return (
    <div className="container">
      <Modal title="Test">
        <Settings onUpdateTitle={handleUpdateTitle} />
      </Modal>

      <h1>{appTitle}</h1>

      <div className="d-flex justify-content-end gap-2 my-3">
        <div className="text-bg-primary p-2 border rounded-pill">
          rounds: {rounds}
        </div>
        <div className="text-bg-success p-2 border rounded-pill">
          score: {score}
        </div>
      </div>
      <div className="d-flex justify-content-center gap-2">
        <Card> {number1} </Card>
        <Card> x </Card>
        <Card>
          {/* <img src={mkImg} alt="image" /> */}
          {number2}
        </Card>
      </div>
      <form onSubmit={evaluateAnswer} className="my-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            {/* <label htmlFor="inputEmail4" className="form-label">
              Email
            </label> */}
            <input
              type="text"
              ref={answerRef}
              id="anwer"
              name="answer"
              placeholder="Answer"
              className="form-control"
            />
          </div>
        </div>

        {/* <div className="d-grid gap-2 col-md-6 mx-auto">
          <button className="btn btn-primary" type="button">
            Button
          </button>
        </div> */}

        <div className="row my-2">
          <div className="col-md-6 mx-auto">
            {/* w-100 the button will span the full width of its parent column while
             maintaining the responsiveness of Bootstrap's grid system. */}
            <button className="btn btn-primary w-100" type="submit">
              Button
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
