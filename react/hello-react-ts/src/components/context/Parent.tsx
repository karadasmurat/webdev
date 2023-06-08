import axios from "axios";
import Child from "./Child";
import { useEffect } from "react";

export default function Parent() {
  useEffect(fetchUser, []);
  function fetchUser() {
    axios
      .get("https://jsonplaceholder.typicode.com/users/10")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <h1>Parent</h1>
      <Child />
    </>
  );
}
