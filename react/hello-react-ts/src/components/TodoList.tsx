import { useState } from "react";
import { Todo } from "../models/Todo";
import SelectFilter from "./SelectFilter";
import Spinner from "./Spinner";
import TodoItem from "./TodoSummary";
import TodoSummary from "./TodoSummary";
import CustomLoader from "./CustomLoader";

// SVGs can be imported and used directly as a React component in your React code.
// import {ReactComponent as Loader} from "../assets/icons/loader.svg";

interface TodoListProps {
  // if the loading prop is true, show the loader
  loading: boolean;
  todos: Todo[];
  error: any;
  onDeleteTodo: (todo: Todo) => void;
  onMarkCompleteTodo: (todo: Todo) => void;
}
export default function TodoList({
  loading,
  todos,
  error,
  onDeleteTodo,
  onMarkCompleteTodo,
}: TodoListProps) {
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
    // <Spinner type="grow" label="For Kids Hair" />
    <CustomLoader label="For Kids Hair" />
  ) : (
    <>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {error.toString()}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <SelectFilter
        label="Filter by Priority"
        options={["Low", "Medium", "High"]}
        initialOption={"Medium"}
        onChange={handleFilterTodo}
      />
      <h1>List of Todos:</h1>
      {filteredTodos.map((todo) => (
        <TodoSummary
          key={todo._id}
          todo={todo}
          onDelete={handleDeleteTodo}
          onMarkComplete={handleMarkCompleteTodo}
        />
        // <ItemDetails key={todo._id} item={todo} onDelete={handleDeleteTodo} />
      ))}
    </>
  );
}
