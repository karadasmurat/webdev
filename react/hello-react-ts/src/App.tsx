import { useState } from "react";
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
import FormRHF from "./components/FormRHF";
import Form01Controlled from "./components/Form02useState";
import Form02Ref from "./components/Form01useRef";
import Form01useRef from "./components/Form01useRef";
import Form02useState from "./components/Form02useState";
import Counter from "./components/Counter";
import { EffectThen, EffectAsync } from "./components/Effect01";

function App() {
  const [bugs, setBugs] = useState<Bug[]>([
    { id: 1, title: "Bug #01", fixed: false },
    { id: 2, title: "Bug #01", fixed: true },
  ]);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 11, title: "Reminder #01" },
    { id: 22, title: "Reminder #02" },
  ]);

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

  return (
    <>
      {/* <Greeter name="Potter" location="Hogwarts" /> */}
      {/* props is of type GreeterProps, which has on optional propery */}
      {/* <Greeter name="Baggins" /> */}
      <Counter />
      {/* <Alert type="primary">
        <strong>Hello,</strong> there!
      </Alert> */}
      {/* <ReminderList items={reminders} onSelectItem={handleSelectItem} />; */}
      {/* <BugList bugs={bugs} onSelectItem={handleBugSelection_immer} /> */}
      {/* <NestedState /> */}
      {/* <Form /> */}
      {/* <FormRHF /> */}
      {/* <Form01useRef /> */}
      {/* <Form02useState /> */}
      {/* <EffectThen /> */}
      <EffectAsync />
    </>
  );
}

export default App;
