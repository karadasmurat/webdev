import { useEffect, useState } from "react";
import { sampleTodos } from "../data/todos";
// import "./App.css";
import { Todo } from "../models/Todo";
import axios from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default function TodoApp() {
  const [flashMessage, setFlashMessage] = useState("");

  const [fetching, setFetching] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [mockTodos, setMockTodos] = useState<Todo[]>(sampleTodos);

  const fetchTodos = () => {
    setFetching(true);

    axios
      .get("http://localhost:3000/api/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => setFetching(false));
  };

  // Fetching data with Effects
  // Note that an Effect with empty dependencies doesn’t re-run when any of your component’s props or state change.
  useEffect(() => {
    fetchTodos();
  }, []);

  function handleDeleteTodo(todo: Todo) {
    console.log("App - handleDeleteTodo", todo);

    axios
      .delete<Todo>(`http://localhost:3000/api/todos/${todo._id}`)
      // onfulfilled: update state
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((pt) => pt._id !== todo._id));
        setFlashMessage("Todo deleted successfully");
      })
      .catch((err) => console.log(err)); // onrejected
  }

  function handleMarkCompleteTodo(todo: Todo) {
    console.log("App - handleMarkCompleteTodo", todo);

    axios
      .put<Todo>(`http://localhost:3000/api/todos/${todo._id}`, {
        ...todo,
        completed: true,
      })
      // onfulfilled: update state
      .then((response) => {
        console.log(response.data);
        setFlashMessage("Todo updated successfully");
        // fetchTodos();
      })
      .catch((err) => console.log(err)); // onrejected
  }

  // async / await syntax
  // ####################
  // const handleDeleteTodo = async (todo: Todo) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/todos/${todo._id}`);
  //     setTodos((prevTodos) => prevTodos.filter((pt) => pt._id !== todo._id));
  //     // Perform any additional actions after successful deletion
  //   } catch (error) {
  //     console.error("Error deleting todo:", error);
  //     // Handle error scenarios
  //   }
  // };

  useEffect(() => {
    let timer: number;
    if (flashMessage) {
      timer = setTimeout(() => {
        setFlashMessage("");
      }, 3000); // Hide flash message after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [flashMessage]);

  return (
    <>
      {flashMessage && (
        <div
          className="container text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            top: "10px",
            width: "80%",
            zIndex: 9999,
          }}
        >
          <div className="alert alert-primary">{flashMessage}</div>
        </div>
      )}

      <TodoForm onSubmitTodo={fetchTodos} />
      <TodoList
        loading={fetching}
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onMarkCompleteTodo={handleMarkCompleteTodo}
      />
    </>
  );
}
