import { useState } from "react";

export default function FormDemo() {
  // simple app state, as an array of objects
  const [wizards, setWizards] = useState([]);

  // app state modify helper - can be passed as an object.
  function addWizard(newWiz) {
    // update state with a "copy" of existing state + newWiz
    setWizards([...wizards, newWiz]);
  }

  return (
    <div className="container">
      <WizardForm onSave={addWizard} />
      <WizardList wizards={wizards} />
    </div>
  );
}

// List Component
function WizardList(props) {
  return (
    <>
      <h1>All the wizards:</h1>

      {props.wizards.map((w, index) => (
        <p key={index}>
          {w.fname} - {w.house}
        </p>
      ))}
    </>
  );
}

// Form Component
function WizardForm(props) {
  // 1. Form State
  // A single state variable to keep states of different form coponenents together, as properties.
  const [formData, setFormData] = useState({ fname: "", house: "" });

  function handleChange(e) {
    // update form state
    // update state with a "copy" of existing state, where all the properties are the same, except eventTarget
    // note [key]:value, where key is an expression.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    // execute callback, with the form state object.
    props.onSave(formData);
  }

  return (
    <>
      <h1>
        Form as a set of controlled components, whose value is a property of a
        single state variable.
      </h1>
      <form onSubmit={handleSubmit} className="row">
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="fname"
            id="fname"
            className="form-control"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="house" className="form-label">
            House
          </label>
          <select
            name="house"
            id="house"
            className="form-select"
            value={formData.house}
            onChange={handleChange}
          >
            <option value="">Select One</option>
            <option value="gryffindor">Gryffindor</option>
            <option value="hufflepuff">Hufflepuff</option>
            <option value="ravenclaw">Ravenclaw</option>
            <option value="slytherin">Slytherin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success col-sm-3">
          Save
        </button>
      </form>
    </>
  );
}


