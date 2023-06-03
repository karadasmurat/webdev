import { Todo } from "../models/Todo";
import { BsCalendar, BsCalendarCheck } from "react-icons/bs";

export default function TodoDetails({ todo }: { todo: Todo }) {
  const todoCard = (
    <div className="card">
      <div className="card-header">Details</div>
      <div className="card-body">
        <h5 className="card-title">
          {todo?.completed ? <BsCalendarCheck /> : <BsCalendar />} {todo?.title}
        </h5>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <code>userId:</code> {todo?.userId}
        </li>
        <li className="list-group-item">
          <code>id:</code> {todo?.id}
        </li>
        <li className="list-group-item">
          <code>completed:</code> {String(todo?.completed)}
        </li>
      </ul>
    </div>
  );

  // display based on the existence of id property.
  return todo.id ? todoCard : <h3>Select Todo</h3>;
}
