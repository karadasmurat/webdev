import { useEffect, useState } from "react";
import { sampleTodos } from "./data/todos";
import { produce } from "immer";
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/Reminder";
import Greeter from "./components/Greeter";
import Alert from "./components/Alert";
import BugList from "./components/BugList";
import Bug from "./models/Bug";
import NestedState from "./components/NestedState";
import Form from "./components/Form";
import FormRHF from "./components/Form03RHF";
import Form01Controlled from "./components/Form02useState";
import Form02Ref from "./components/Form01useRef";
import Form01useRef from "./components/Form01useRef";
import Form02useState from "./components/Form02useState";
import Counter from "./components/ShoppingCartItem";
import { EffectThen, EffectAsync } from "./components/Effect01";
import Form03RHF from "./components/Form03RHF";
import Form_RHF_ZOD from "./components/Form_RHF_ZOD";
import TodoList_Axios from "./components/TodoList_Axios";
import { Todo } from "./models/Todo";
import axios from "axios";
import ShoppingItem from "./components/ShoppingCartItem";
import TodoDetails from "./components/TodoSearch";
import TodoSearch from "./components/TodoSearch";
import SimpleShoppingCart from "./components/SimpleShoppingCart";
import Stopwatch from "./components/Stopwatch";
import AutoFocusDiv from "./components/AutoFocusDiv";
import TodoList from "./components/TodoList";
import SelectFilter from "./components/SelectFilter";
import TodoForm from "./components/TodoForm";

function App() {
  const [flashMessage, setFlashMessage] = useState("");

  const [bugs, setBugs] = useState<Bug[]>([
    { id: 1, title: "Bug #01", fixed: false },
    { id: 2, title: "Bug #01", fixed: true },
  ]);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 11, title: "Reminder #01" },
    { id: 22, title: "Reminder #02" },
  ]);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [mockTodos, setMockTodos] = useState<Todo[]>(sampleTodos);

  const fetchTodos = () => {
    axios
      .get("http://localhost:3000/api/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  // Fetching data with Effects
  // Note that an Effect with empty dependencies doesn’t re-run when any of your component’s props or state change.
  useEffect(() => {
    fetchTodos();
  }, []);

  // handler defined by parent, to be passed to child using props.
  // through calling this, child will notify the parent about the results (somewhat like return)
  const handleSelectItem = (id: number) => {
    console.log("Handler of the parent: received info about selection", id);
  };

  // manual state mng - an array of objects: create an altered copy
  const handleBugSelection = (selectedBug: Bug) => {
    console.log("manage state by manually creating an altered copy.");

    // update state, which is an array of objects: create an altered copy
    // iterate array of objects using map()
    // for each element, check condition, return a new object with updated field or existing object.
    setBugs(
      bugs.map((existingBug) => {
        // return this (new object) or that (existing object)
        return existingBug.id === selectedBug.id
          ? { ...selectedBug, fixed: !selectedBug.fixed } // return a new object, updating one field.
          : existingBug; // return the existing object, to be pushed into the new array untouched.
      })
    );
  };

  const handleBugSelection_immer = (selectedBug: Bug) => {
    console.log("using immer.");
    // update state, which is an array of objects: use immer
    // think of draft as state array.
    setBugs(
      produce((draft) => {
        const bugToBeUpdated = draft.find((x) => x.id === selectedBug.id);
        if (bugToBeUpdated) {
          bugToBeUpdated.fixed = !bugToBeUpdated.fixed;
        }
      })
    );
  };

  function handleDeleteTodo(todo: Todo) {
    console.log("App - handleDeleteTodo", todo);

    axios
      .delete<Todo>(`http://127.0.0.1:3000/api/todos/${todo._id}`)
      // onfulfilled: update state
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((pt) => pt._id !== todo._id));
        setFlashMessage("Todo deleted successfully");
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
      {/* <Greeter name="Potter" location="Hogwarts" /> */}
      {/* props is of type GreeterProps, which has on optional propery */}
      {/* <Greeter name="Baggins" /> */}
      {/* <Quantity /> */}
      {/* <Alert type="primary">
        <strong>Hello,</strong> there!
      </Alert> */}
      {/* <ReminderList items={reminders} onSelectItem={handleSelectItem} />; */}
      {/* <BugList bugs={bugs} onSelectItem={handleBugSelection_immer} /> */}
      {/* <NestedState /> */}
      {/* <Form /> */}
      {/* <Form01useRef /> */}
      {/* <Form02useState /> */}
      {/* <Form03RHF /> */}
      {/* <Form_RHF_ZOD /> */}
      {/* <EffectThen /> */}
      {/* <EffectAsync /> */}
      <TodoForm onSubmitTodo={fetchTodos} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
      {/* <TodoList_Axios todos={todos} /> */}
      {/* <TodoSearch /> */}
      {/* <SimpleShoppingCart /> */}
      {/* <Stopwatch /> */}
      {/* <AutoFocusDiv /> */}
    </>
  );
}

export default App;
