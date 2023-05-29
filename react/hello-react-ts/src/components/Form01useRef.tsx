import { FormEvent, useRef } from "react";

export default function Form01useRef() {
  // It’s particularly common to use a ref to manipulate the DOM.
  // useRef to declare a ref object (with an initial value of null):
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // The useRef Hook returns an object with a single property called "current".
    // After React creates the DOM node and puts it on the screen, React will set the current property of your ref object to that DOM node.
    // You can then access this DOM node from your event handlers and use the built-in browser APIs defined on it.
    console.log("nameRef.current?.value:", nameRef.current?.value);
    // {}
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="name">First name:</label>

      {/* use ref attribute to the JSX of the DOM node */}
      <input
        ref={nameRef}
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
