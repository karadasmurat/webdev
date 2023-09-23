import "./App.css";
import { CountDown, CountUp } from "./components/Counter";
import Count from "./components/Counter";
import CustomHookDemo from "./components/CustomHookDemo";
import FetchDemo from "./components/FetchDemo";
import FormDemo from "./components/FormDemo";
import Form from "./components/FormDemo";
import HOCDemo from "./components/HOCDemo";

import PropsPrinter from "./components/PropsPrinter";
import RecuderDemo from "./components/ReducerDemo";
import Stopwatch from "./components/Stopwatch";
import WindowEventsDemo from "./components/WindowEventsDemo";
import SimpleHOC from "./hoc/SimpleHOC";
import Greeter from "./components/Greeter";
import EnhancedGreeter from "./hoc/SimpleHOC";

function App() {
  const keeper = "Hagrid";
  const todos = [
    { id: 1, title: "Todo #1", isdone: true },
    { id: 2, title: "Todo #2", isdone: false },
    { id: 3, title: "Todo #3", isdone: true },
  ];

  const attributes = {
    prop1: "Value 1",
    prop2: "Value 2",
    prop3: "Value 3",
  };

  return (
    <div>
      {/* <Greeter /> */}
      {/* <NamedGreeter name={ keeper } location="Hogwarts"/> */}
      {/* <CntButton /> */}
      {/* <CntButton /> */}
      {/* <Garage make="Volkswagen" /> */}
      {/* <NameList names={["John", "Mike", "Sally"]} /> */}
      {/* <Pokemon /> */}
      {/* <Pokemon /> */}
      {/* <Slot /> */}
      {/* <Todo items={todos}/> */}
      {/* <ColorGrid boxCnt={25} /> */}
      {/* <MediaDemo /> */}
      {/* <MemoizationDemo /> */}
      {/* Pass Props Using the Spread Operator: */}
      {/* <PropsPrinter p1="a" p2={2} {...attributes} /> */}
      {/* <FormDemo /> */}
      {/* <Stopwatch /> */}
      {/* <FetchDemo /> */}
      {/* <RecuderDemo /> */}
      {/* <CustomHookDemo /> */}
      {/* <CountDown
        start={5}
        onCountdownEnd={() => console.log("CountDown: THE END.")}
      /> */}
      {/* <CountUp
        start={5}
        onCountdownEnd={() => console.log("CountUp: THE END.")}
      /> */}
      {/* <WindowEventsDemo /> */}
      <EnhancedGreeter name="MK" location="IST" />
    </div>
  );
}

export default App;
