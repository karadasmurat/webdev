import { useEffect, useState } from "react";

type User = {
  name: { first: string; last: string };
  email: string;
};

export default function FetchDemo() {
  const [state, setState] = useState<User>();

  function fetchData() {
    fetch("https://randomuser.me/api/?results=1")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data.results[0]);
      })
      .catch((err) => console.log(err));
  }

  // with empty dependencies array - run once at mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h3>Fetch Demo</h3>
      <div>{state?.email}</div>
    </div>
  );
}
