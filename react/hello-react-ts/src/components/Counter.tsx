import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("clicked.");

    // Setting state based on prior state
    // use a (cb?) function that computes current state using the previous state
    setCount((prevCnt) => prevCnt + 1);

    // update state
    // setCount(count + 1);
  };

  return <button onClick={handleClick}>Clicked {count} times.</button>;
}
