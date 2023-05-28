import { useState } from "react";
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/Reminder";
import Greeter from "./components/Greeter";
import Alert from "./components/Alert";
import BugList from "./components/BugList";
import Bug from "./models/Bug";

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

  const handleBugSelection = (selectedBug: Bug) => {
    setBugs(
      bugs.map((existingBug) => {
        if (existingBug.id === selectedBug.id) {
          return { ...selectedBug, fixed: !selectedBug.fixed }; // update one field in object (return new object).
        }
        return existingBug; // return the existing object, to be pushed into the new array untouched.
      })
    );
  };

  return (
    <>
      <Greeter name="Potter" location="Hogwarts" />
      {/* props is of type GreeterProps, which has on optional propery */}
      <Greeter name="Baggins" />
      <Alert type="primary">
        <strong>Hello,</strong> there!
      </Alert>
      <ReminderList items={reminders} onSelectItem={handleSelectItem} />;
      <BugList bugs={bugs} onSelectItem={handleBugSelection} />
    </>
  );
}

export default App;
