import { NavLink } from "react-router-dom";

export default function NotFound(props) {
  return (
    <>
      <h1>Not Found.</h1>
      <NavLink to="/">Home</NavLink>
    </>
  );
}
