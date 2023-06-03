import { useState } from "react";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";

export default function Quantity() {
  const [count, setCount] = useState(0);

  const decrease = () => {
    console.log("clicked to decrease.");

    // Setting state based on prior state
    // use a (cb?) function that computes current state using the previous state
    setCount((prevCnt) => (prevCnt > 0 ? prevCnt - 1 : 0));

    // update state
    // setCount(count + 1);
  };

  const increase = () => {
    // Setting state based on prior state
    setCount((prevCnt) => prevCnt + 1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-3 gap-1">
      <button onClick={decrease} className="btn">
        <BsDashCircle />
      </button>

      <span>{count}</span>
      <button onClick={increase} className="btn">
        <BsPlusCircle />
      </button>
    </div>
  );
}
