import { useState } from "react";

export default function useCounter(value) {
  const [count, setCount] = useState(value);

  // note. nested function
  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    setCount((prev) => prev - 1);
  }

  // return whatever you want, in this case, we return state and state modifiers (helpers)
  // unlike components, custom hooks do not return JSX!
  return {
    count,
    increment,
    decrement,
  };
}
