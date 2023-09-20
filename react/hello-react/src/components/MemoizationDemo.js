import { useState, memo } from "react";

function Dummy() {
  console.log("Dummy: render.");
  return <p>Hi! This is a dummy component. No props, no state, nothing</p>;
}

function PropsOnly(props) {
  console.log("PropsOnly: render.");
  return (
    <p>Hi! This is a props only component. Here are the props: {props.data}.</p>
  );
}

// memo lets you skip re-rendering a component when its props are unchanged.
const MemoizedDummy = memo(Dummy);
const MemoizedPropsOnly = memo(PropsOnly);

export default function MemoizationDemo() {
  // state, to trigger re-rendering
  const [state, setState] = useState(0);
  return (
    <>
      <h1>Hey, children!</h1>
      {/* <Dummy /> */}
      {/* <PropsOnly data={333} /> */}
      <MemoizedPropsOnly data={333} />
      <MemoizedDummy />
      {/* update the state, which causes re-render of this component */}
      <button onClick={() => setState((prev) => prev + 1)}>
        Parent: {state}
      </button>
    </>
  );
}
