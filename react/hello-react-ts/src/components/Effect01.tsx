import { useEffect } from "react";
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
