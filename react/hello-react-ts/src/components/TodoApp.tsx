import { useContext, useEffect, useState } from "react";
// import { sampleTodos } from "../data/todos";
// import "./App.css";
import { Todo } from "../models/Todo";
import axios, { AxiosError } from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { TodoContext } from "../contexts/TodoContext";
import { AuthContext } from "../contexts/AuthContext";

const URL_GET_ALL_TODOS = "http://localhost:3000/api/todos";

export default function TodoApp() {
  const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState<Todo[]>([]);
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState("");

  // AuthContext
  const { authState, authDispatch } = useContext(AuthContext);

  // version 1 - get todos from context
  const { state, dispatch } = useContext(TodoContext);

  // version 2 - get todos using a custom useFetch hook
  // let { isLoading, data, error, fetchData } = useFetch<Todo>(URL_GET_ALL_TODOS);

  // if (data) {
  //   // dispatch({ type: "todos/set", payload: data });
  //   console.log("we have data!", data);
  // }

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get(URL_GET_ALL_TODOS, { withCredentials: true })
      .then((response) => {
        // instead of setting data, we dispatch an action to set context.
        // setData(response.data);
        dispatch({ type: "todos/set", payload: response.data });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  function simulateLoading() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 1000);
    });
  }

  useEffect(() => {
    simulateLoading().then(fetchData);
    // fetchData();

    // return () => {
    //   console.log("useFetch: cleanup");
    // };
  }, []);

  function handleDeleteTodo(todo: Todo) {
    console.log("App - handleDeleteTodo", todo);

    axios
      .delete<Todo>(`http://localhost:3000/api/todos/${todo._id}`)
      // onfulfilled: update state
      .then(() => {
        setFlashMessage("Todo deleted successfully");

        // REFRESH TODO LIST after a successfull deletion.

        // ver 0 -
        //setTodos((prevTodos) => prevTodos.filter((pt) => pt._id !== todo._id));

        // ver 1 - dispatch an action to delete from local state, to sync with db after a successfull deletion.
        dispatch({ type: "todos/delete", payload: todo });

        // ver 2 - use custom hook to fetch data
        // fetchData();
      })
      .catch((err: AxiosError) => {
        console.log(err);
        // setFlashMessage(err.message);
      }); // onrejected
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
        // console.log(response.data);
        setFlashMessage("Todo updated successfully");

        // provided by customHook
        fetchData();
      })
      .catch((err) => console.log(err)); // onrejected
  }

  return (
    <>
      {flashMessage && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {flashMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        // </div>
      )}

      {/* user from context */}
      <div className="container">context: {state.user}</div>

      {/* consume AuthContext */}
      <div className="container">email: {authState.user?.email}</div>

      {/* <TodoForm onSubmitTodo={fetchTodos} /> */}
      <TodoForm
        onSubmitTodo={() => {
          console.log("Received submit message.");

          // provided by customHook
          fetchData();
        }}
      />
      <TodoList
        loading={isLoading}
        // todos={data}
        todos={state.todos}
        error={error}
        onDeleteTodo={handleDeleteTodo}
        onMarkCompleteTodo={handleMarkCompleteTodo}
      />
    </>
  );
}
