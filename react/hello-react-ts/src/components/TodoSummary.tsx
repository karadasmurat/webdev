import { NavLink } from "react-router-dom";
import { Todo } from "../models/Todo";
import { BsCalendar, BsTrash, BsCheck2Circle } from "react-icons/bs";
import { useEffect, useState } from "react";

interface TodoSummaryProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onMarkComplete: (todo: Todo) => void;
}

export default function TodoSummary({
  todo,
  onDelete,
  onMarkComplete,
}: TodoSummaryProps) {
  // version 2 - dispatch action to delete without callback from parent
  // const { state, dispatch } = useContext(TodoContext);

  const [isNewTask, setNewTask] = useState(true);

  useEffect(() => {
    // setNewTask(true);
    // Remove the "isNewTask" flag after the animation duration to reset for future tasks
    const timer = setTimeout(() => {
      setNewTask(false);
    }, 500); //
    return () => clearTimeout(timer);
  }, []);

  // function handleDelete(todo: Todo) {
  //   dispatch({ type: "todos/delete", payload: todo });
  // }

  const todoCard = (
    <div className={`card mb-3 todo-item ${isNewTask ? "fade-in" : ""}`}>
      <div className="card-header">
        <div className="d-flex justify-content-end align-items-center gap-2">
          <span className="me-auto">Details</span>
          <button onClick={() => onDelete(todo)} className="btn btn-danger">
            <BsTrash />
          </button>
          <button
            onClick={() => onMarkComplete(todo)}
            className="btn btn-success"
          >
            Complete
          </button>
          <NavLink to={todo._id?.toString() || "#"}>Details</NavLink>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {todo?.completed ? <BsCheck2Circle /> : <BsCalendar />} {todo?.title}
        </h5>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <code>userId:</code> {todo?.userId}
        </li>
        <li className="list-group-item">
          <code>id:</code> {todo?._id}
        </li>
      </ul>

      <div className="card-footer"></div>
    </div>
  );

  // display based on the existence of id property.
  return todo._id ? todoCard : <h3>Select Todo</h3>;
}
