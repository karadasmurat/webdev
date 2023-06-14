import { Todo } from "../models/Todo";
import { BsCalendar, BsCheck2Circle } from "react-icons/bs";

interface ItemDetailsProps {
  item: Todo;
  onDelete: (todo: Todo) => void;
}
export default function ItemDetails({ item, onDelete }: ItemDetailsProps) {
  return (
    <>
      <ul>
        <li className="list-group-item">
          <code>Title:</code>
          {item?.completed ? <BsCheck2Circle /> : <BsCalendar />} {item?.title}
        </li>
        <li className="list-group-item">
          <code>id:</code> {item?._id}
        </li>
      </ul>

      {/* delegate click handling to callback, which is provided as props */}
      <button onClick={() => onDelete(item)}>Delete</button>
    </>
  );
}
