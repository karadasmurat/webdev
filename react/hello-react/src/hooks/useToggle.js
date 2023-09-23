/**
 * This hook allows you to manage a boolean state value and provides a function to toggle that value.
 * Consumers of the useToggle hook can easily manage boolean state and toggle it with a single function call, making it a reusable and convenient utility.
 * */

import { useState } from "react";

export default function useToggle(value = false) {
  const [state, setState] = useState(value);

  function toggle() {
    setState((prev) => !prev);
  }

  // return the state and state modifier.
  // return an array so that consumer can give the "state" name of their choice, ie:
  // const [isActive, toggleIsActive] = useToggle(false);

  return [state, toggle];
}
