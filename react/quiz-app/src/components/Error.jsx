import { NavLink } from "react-router-dom";

export default function Error({ err }) {
  return (
    <>
      <h1>Error.</h1>
      <p>{err.message}</p>
      <NavLink to="/">Home</NavLink>
    </>
  );
}
