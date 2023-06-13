import { useState } from "react";
// basic custom hook to help conditional renders (code reuse)
// Instead of writing the same code for different components which use the same logic,
// we can create a custom hook and reuse it

export default function useToggle(initialState = false) {
  const [condition, setCondition] = useState(initialState);

  function toggle() {
    setCondition((prev) => !prev);
  }

  // return the boolean state, and a function to toggle state.
  return { condition, toggle };
}
