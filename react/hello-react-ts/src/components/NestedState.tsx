import { produce } from "immer";
import { MouseEvent, useState } from "react";

export default function NestedState() {
  // state contains a nested object
  const [customer, setCustomer] = useState({
    name: "John",
    numbers: ["1.12345", "2.54321"],
    address: { city: "San Francisco", zipCode: 94111 },
  });

  const handleClick = (event: MouseEvent) => {
    console.log("clicked.", event.timeStamp);

    // immutable state - create an altered copy
    // notice that zipcode is a nested property under address,
    // therefore we spread operator to create a new nested address object!
    setCustomer({
      ...customer,
      address: { ...customer.address, zipCode: 1111 },
    });
  };

  // immer version - set state by mutating draft
  const handleClick_immer = (event: MouseEvent) => {
    console.log("immer.", event.timeStamp);

    // immutable state - create an altered copy
    // notice that zipcode is a nested property under address.
    setCustomer(
      produce((draft) => {
        draft.address.zipCode = 2222;
      })
    );
  };

  // add a new item to an array property of a state object.
  // immer version - set state by mutating draft
  const addhobby_immer = (event: MouseEvent) => {
    console.log("hobby with immer.", event.timeStamp);

    // immer - set state by mutating draft
    setCustomer(
      produce((draft) => {
        draft.numbers.push((Math.random() * 10).toString());
      })
    );
  };

  return (
    <div className="card my-3">
      <div className="card-header">Customer</div>
      <div className="card-body">
        <h5 className="card-title">{customer.name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {customer.address.city}
        </h6>
        <p className="card-text">
          <small className="text-body-secondary">
            {customer.address.zipCode}
          </small>
          <button onClick={handleClick_immer} className="btn btn-primary">
            Change zipcode
          </button>
        </p>
        <ul className="list-group list-group-flush">
          {customer.numbers?.map((h) => (
            <li className="list-group-item">{h}</li>
          ))}
        </ul>
        <button onClick={addhobby_immer} className="btn btn-primary">
          Add random
        </button>
      </div>
    </div>
  );
}
