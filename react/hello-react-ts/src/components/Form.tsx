import { FormEvent, useRef } from "react";
import { BsPersonCircle } from "react-icons/bs";

export default function Form() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) {
      person.name = nameRef.current.value;
    }
    if (ageRef.current !== null) {
      person.age = parseInt(ageRef.current.value);
    }
    console.log(person);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="form-floating mb-3">
        <input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          placeholder="username"
          className="form-control"
          required
        />
        <label htmlFor="floatingInput">
          <div className="d-flex gap-2 align-items-center">
            <BsPersonCircle /> Username
          </div>
        </label>

        <div className="invalid-feedback">Please provide a username.</div>
      </div>

      <div className="form-floating mb-3">
        <input
          ref={ageRef}
          type="number"
          name="age"
          id="age"
          placeholder="age"
          className="form-control"
          required
        />
        <label htmlFor="floatingInput">
          <div className="d-flex gap-2 align-items-center">Age</div>
        </label>

        <div className="invalid-feedback">Please provide age.</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
