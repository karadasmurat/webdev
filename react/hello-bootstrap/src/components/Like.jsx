import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Like({ onClick }) {
  const [isActive, setActive] = useState(false);

  function toggleAndNotify() {
    setActive(!isActive);

    // IMPORTANT!!
    // we have updated the state, but the useState hook in React works asynchronously,
    // so the value of isActive won't reflect the updated state immediately,  after calling setActive, till next render.
    // console.log("toggled: " + isActive);

    // thats why we still use !isActive as the getter, as if we have not already toggled:
    onClick(!isActive); // execute callback and handle state to caller.
  }

  // returning different component based on internal state
  return isActive ? (
    <FaHeart color="pink" onClick={toggleAndNotify} />
  ) : (
    <FaRegHeart onClick={toggleAndNotify} />
  );
}
