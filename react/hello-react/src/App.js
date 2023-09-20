import "./App.css";

import CntButton from "./components/CntButton";
import ColorGrid from "./components/ColorBox";
import Garage from "./components/Garage";
import Greeter, { NamedGreeter } from "./components/Greeter";
import MediaDemo from "./components/MediaDemo";
import MemoizationDemo from "./components/MemoizationDemo";
import NameList from "./components/NameList";
import Pokemon from "./components/Pokemon";
import Slot from "./components/Slot";
import Todo from "./components/Todo";

function App() {
  const keeper = "Hagrid";
  const todos = [
    { id: 1, title: "Todo #1", isdone: true },
    { id: 2, title: "Todo #2", isdone: false },
    { id: 3, title: "Todo #3", isdone: true },
  ];

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
      <MemoizationDemo />
    </div>
  );
}

export default App;
