/**
 * Determine the question type (e.g., multiple choice, open-ended, true/false).
 * Render the appropriate sub-component based on the question type.
 */

import { BsArrowBarUp, BsChevronDoubleRight } from "react-icons/bs";
export default function Question({ question }) {
  switch (question.type) {
    case "selectOne":
      return <SelectOneQuestionRadio question={question} />;
    case "selectMany":
      return <SelectManyQuestion question={question} />;
    case "openEnded":
      return <OpenEndedQuestion question={question} />;
    default:
      return <h1>Unsupported Question Type.</h1>; // Handle unsupported question types or errors.
  }
}

function SelectOneQuestionButtonGroup({ question }) {
  return (
    <>
      <div>Select One Question</div>
      <span className="badge text-bg-primary">{question.category}</span>
      <h1>{question.text}</h1>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {question.options.map((option, index) => (
          <>
            <input
              type="radio"
              class="btn-check"
              name={"opt_" + question._id}
              id={option}
              autocomplete="off"
              checked
            />
            <label class="btn btn-outline-primary" for={option}>
              {option}
            </label>
          </>
        ))}
      </div>
    </>
  );
}

function SelectOneQuestionRadio({ question }) {
  return (
    <>
      <div>Select One Question</div>
      <span className="badge text-bg-primary">{question.category}</span>
      <h1>{question.text}</h1>
      {question.options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={"opt_" + question._id}
            id={option}
          />
          <label className="form-check-label" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}
    </>
  );
}

function SelectManyQuestion({ question }) {
  return (
    <>
      <div>Select Many Question</div>
      <span className="badge text-bg-primary">{question.category}</span>
      <h1>{question.text}</h1>

      {question.options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name={option}
            id={option}
          />
          <label className="form-check-label" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}
    </>
  );
}

function OpenEndedQuestion({ question }) {
  return (
    <>
      <div>Select Many Question</div>
      <span className="badge text-bg-primary">{question.category}</span>
      <h1>{question.text}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          id={"text_" + question._id}
          rows="3"
          placeholder="Write your answer here"
          aria-label="Answer"
        ></textarea>
      </div>
    </>
  );
}

export function QuestionControl({ onAnswer, onPass }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-success" type="button" onClick={onAnswer}>
        <span className="d-flex align-items-center gap-1">
          <BsArrowBarUp />
          Submit
        </span>
      </button>
      <button className="btn btn-outline-danger" type="button" onClick={onPass}>
        <span className="d-flex align-items-center gap-1">
          <BsChevronDoubleRight />
          Pass
        </span>
      </button>
    </div>
  );
}
