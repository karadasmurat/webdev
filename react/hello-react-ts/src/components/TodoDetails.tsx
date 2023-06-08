import { Todo } from "../models/Todo";
import {
  BsCalendar,
  BsCalendarCheck,
  BsTrash,
  BsCheck2Circle,
} from "react-icons/bs";

interface TodoDetailsProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onMarkComplete: (todo: Todo) => void;
}
export default function TodoDetails({
  todo,
  onDelete,
  onMarkComplete,
}: TodoDetailsProps) {
  const todoCard = (
    <div className="card mb-3">
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
        <li className="list-group-item">
          <code>completed:</code> {String(todo?.completed)}
        </li>
        <li className="list-group-item">
          <code>status:</code> {String(todo?.status)}
        </li>
        <li className="list-group-item">
          <code>priority:</code> {String(todo?.priority)}
        </li>
        <li className="list-group-item">
          <code>due:</code> {String(todo?.due)}
        </li>
      </ul>

      <div className="card-footer"></div>
    </div>
  );

  // display based on the existence of id property.
  return todo._id ? todoCard : <h3>Select Todo</h3>;
}
