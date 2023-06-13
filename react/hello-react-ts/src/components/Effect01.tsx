import { useEffect, useState } from "react";
import {
  axios_getUser,
  fetchUser,
  getaWizard,
  getaWizard_async,
} from "../services/PeopleService";

export function EffectThen() {
  // useEffect hook
  // the service function getaWizard is not marked async, it returns Promise.
  useEffect(() => {
    getaWizard().then((person) => console.log(person));
  }, []);
  return <h1>hello, check the console in a second!</h1>;
}

export function EffectAsync() {
  // the useEffect Hook doesn’t allow a function marked with async to be passed into it.
  // Thus, a nested asynchronous function has been defined and immediately called
  useEffect(() => {
    async function getWiz() {
      //const person = await getaWizard_async();
      // const person = await fetchUser();
      const person = await axios_getUser();
      console.log(person);
    }
    getWiz();
  }, []);
  return <h1>hello, check the console in a second!</h1>;
}

export function EffectBasics() {
  const [cnt, setCnt] = useState(0);
  const [stateVar, setStateVar] = useState(0);

  // without dependencies - re-run after every render
  useEffect(() => {
    console.log("no dependencies: re-run after every render");
    return () => {
      console.log("no dependencies: CLEANUP on unmount.");
    };
  });

  // with empty dependencies array - run once at mount
  useEffect(() => {
    console.log("[]: run on mount.");
    return () => {
      console.log("[]: CLEANUP on unmount.");
    };
  }, []);

  // with dependencies array
  // hook is triggered when either value in a set of dependencies changes.
  useEffect(() => {
    console.log("[stateVar]: re-run when dependency changes");
    return () => {
      console.log("[stateVar]: CLEANUP on unmount.");
    };
  }, [stateVar]);

  // with dependencies array
  // hook is triggered when either value in a set of dependencies changes.
  useEffect(() => {
    console.log("[cnt]: re-run when dependency changes");
    return () => {
      console.log("[cnt]: CLEANUP on unmount.");
    };
  }, [cnt]);

  // click event triggers a state update which cause an evaluation wheter the effect should run.
  // note that an effect in a useEffect hook is triggered when either value in a set of dependencies changes.
  function handleClick() {
    setCnt((prevCnt) => prevCnt + 1);
  }
  return (
    <div className="container">
      <h1>useEffect basics</h1>
      <span>{cnt}</span>
      {/* click event triggers a state update */}
      <button onClick={handleClick} className="btn btn-primary">
        +
      </button>
    </div>
  );
}
