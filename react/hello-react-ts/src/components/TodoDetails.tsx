import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Todo } from "../models/Todo";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import { BsCalendarCheck, BsCalendar } from "react-icons/bs";

export default function TodoDetails() {
  const { id } = useParams();

  // The useNavigate hook returns a function that lets you navigate programmatically
  let navigate = useNavigate();

  const { isLoading, data, error } = useFetch<Todo>(
    `http://localhost:3000/api/todos/${id}`
  );

  // custom hook returns an array
  const todo = data[0];

  return (
    <div className="container">
      {isLoading && <Spinner type="grow" label="Loading" />}
      {todo && (
        <div className="card mb-3">
          <div className="card-header">
            <div className="d-flex justify-content-end align-items-center gap-2">
              <span className="me-auto">Details</span>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title"> {todo.title}</h5>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <code>userId:</code>
              {todo.userId}
            </li>
            <li className="list-group-item">
              <code>id:</code> {todo._id}
            </li>
            <li className="list-group-item">
              <code>completed:</code>{" "}
              {todo.completed ? <BsCalendarCheck /> : <BsCalendar />}
            </li>
            <li className="list-group-item">
              <code>status:</code> {todo.status}
            </li>
            <li className="list-group-item">
              <code>priority:</code> {todo.priority}
            </li>
            <li className="list-group-item">
              <code>due:</code> due
            </li>
          </ul>

          <div className="card-footer"></div>
        </div>
      )}

      <button
        onClick={() => {
          navigate("/todos");
        }}
      >
        Back
      </button>
    </div>
  );
}
