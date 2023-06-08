import { useState } from "react";
import { Todo } from "../models/Todo";
import SelectFilter from "./SelectFilter";
import TodoDetails from "./TodoDetails";
import Spinner from "./Spinner";

// SVGs can be imported and used directly as a React component in your React code.
// import {ReactComponent as Loader} from "../assets/icons/loader.svg";

interface TodoListProps {
  // if the loading prop is true, show the loader
  loading: boolean;
  todos: Todo[];
  onDeleteTodo: (todo: Todo) => void;
  onMarkCompleteTodo: (todo: Todo) => void;
}
export default function TodoList({
  loading,
  todos,
  onDeleteTodo,
  onMarkCompleteTodo,
}: TodoListProps) {
  const spinner = (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
        stroke="red"
      />
    </svg>
  );

  const [fPriority, setFPriority] = useState("All");
  // const filteredTodos = todos;
  const filteredTodos = todos.filter((todo) =>
    fPriority === "All" ? true : todo.priority === fPriority
  );

  function handleDeleteTodo(todo: Todo) {
    console.log("TodoList - handleDeleteTodo", todo);

    // notify parent
    onDeleteTodo(todo);
  }

  function handleMarkCompleteTodo(todo: Todo) {
    console.log("mark complete", todo);

    // notify parent
    onMarkCompleteTodo(todo);
  }

  const handleFilterTodo = (option: string) => {
    console.log("Filtered", option);

    // update state
    setFPriority(option);

    //setTodos(todos.filter((todo) => todo.priority === option));
  };
  return loading ? (
    <Spinner type="grow" label="For Kids Hair" />
  ) : (
    <>
      <SelectFilter
        label="Filter by Priority"
        options={["Low", "Medium", "High"]}
        initialOption={"Medium"}
        onChange={handleFilterTodo}
      />
      <h1>List of Todos:</h1>
      {filteredTodos.map((todo) => (
        <TodoDetails
          key={todo._id}
          todo={todo}
          onDelete={handleDeleteTodo}
          onMarkComplete={handleMarkCompleteTodo}
        />
      ))}
    </>
  );
}
