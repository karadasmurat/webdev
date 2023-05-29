import { produce } from "immer";
import {
  BaseSyntheticEvent,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useState,
} from "react";

export default function Form02useState() {
  // a composite object with all form fields
  const [person, setPerson] = useState({
    firstName: "",
    age: 0,
    agreed: false,
  });

  // const [firstName, setFirstName] = useState("");
  // const [age, setAge] = useState(20);
  // const [agreed, setAgreed] = useState(false);
  // const ageAsNumber = Number(age);

  // assuming a flat state object structure
  // get the property name from event.target.name
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    setPerson((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  function handleSubmit(e: FormEvent) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // controlled components
    console.log(person); // {firstName: 'abcde', age: 30, agreed: false}
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="name">First name:</label>

      {/* 
      To render a controlled input, pass the "value" prop to it (or "checked" for checkboxes and radios).
      Every controlled input needs an "onChange" event handler that synchronously updates its backing value. 
      Thus, when you use a controlled input, you set the state on every keystroke (change).
      In summary, "controlled" means 2 additional atrributes - value/checked + onChange 
      */}
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Name"
        // input value is controlled by the firstName property in the person state
        value={person.firstName}
        // onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
        onChange={handleInputChange}
      />
      <label htmlFor="age">First name:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={person.age}
        // onChange={(e) =>setPerson({ ...person, age: parseInt(e.target.value) })}
        onChange={handleInputChange}
      />
      <button onClick={() => setPerson({ ...person, age: person.age + 10 })}>
        Add 10 years
      </button>
      <input
        type="checkbox"
        id="agree"
        name="agree"
        checked={person.agreed}
        // onChange={(e) => {setPerson({ ...person, agreed: e.target.checked })}}
        onChange={handleInputChange}
      />
      <label htmlFor="agree">Agree</label>
      <button type="submit">Submit</button>
      {person.firstName !== "" && <p>Your name is {person.firstName}.</p>}
      {person.age > 0 && <p>Your age is {person.age}.</p>}
      <p>Approval: {String(person.agreed)}</p>
    </form>
  );
}
