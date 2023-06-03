import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";
import TodoDetails from "./TodoDetails";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function TodoSearch() {
  const [todoID, setId] = useState(1);
  const [todo, setTodo] = useState({});
  const todoIDRef = useRef<HTMLInputElement>(null);

  // useEffect to fetch details of todoID, with a dependency on this state.
  useEffect(() => {
    axios
      .get<Todo>(`https://jsonplaceholder.typicode.com/todos/${todoID}`)
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
        setTodo({});
      });
  }, [todoID]);

  return (
    <div className="row align-items-center">
      <div className="col-sm-8">
        <form className="my-2">
          <input
            ref={todoIDRef}
            type="text"
            name="todoID"
            id="todoID"
            className="form-control"
          />
        </form>
      </div>
      <div className="col-sm-4">
        {/* onClick updates state that contains todoID, which is a dependency of effect that fetch data. */}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (todoIDRef.current) {
              setId(parseInt(todoIDRef.current.value));
            }
          }}
          className="btn btn-primary w-100"
        >
          <span className="d-flex gap-2 justify-content-center align-items-center">
            <BsBoxArrowUpRight />
            Get Details
          </span>
        </button>
      </div>

      <div className="container my-3">
        <TodoDetails todo={todo} />
      </div>
    </div>
  );
}
