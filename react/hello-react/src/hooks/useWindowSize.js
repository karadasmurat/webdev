/**
 * Adds an event listener to window object, to modify state with the new size.
 */
import { useState, useEffect } from "react";
export default function useWindowSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  // useEffect, that adds an eventlistener, which updates state.
  useEffect(() => {
    // state modifier
    function handleResize() {
      setSize({
        ...size,
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }
    // window:resize event fires when the document view (window) has been resized.
    window.addEventListener("resize", handleResize);

    // setup returns a cleanup function
    return () => {
      // removes an event listener previously registered with EventTarget.addEventListener()
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // return anything
  return size;
}
