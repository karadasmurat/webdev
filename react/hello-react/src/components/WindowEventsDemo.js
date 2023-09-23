import useWindowSize from "../hooks/useWindowSize";

export default function WindowEventsDemo() {
  console.log("WindowEventsDemo: render.");

  // custom hook
  // Note that component is using the state returned by the custom hook.
  // A state update by hook will eventually trigger a re-render of the component.
  const { w, h } = useWindowSize();

  return (
    <>
      <h1>window resize event</h1>
      <p>width: {w}</p>
      <p>height: {h}</p>
    </>
  );
}



