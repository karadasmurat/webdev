import { Link, NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <NavLink to={`/`}>Home</NavLink>
      <NavLink to={`/about`}>About</NavLink>
      <NavLink to={`/portfolio`}>Portfolio</NavLink>
      <NavLink to={`/help`}>Help</NavLink>
    </nav>
  );
}
