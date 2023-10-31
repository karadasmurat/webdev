import { Link, NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navbar">
      <NavLink to={`/`}>Home</NavLink>
      <NavLink to={`/about`}>About</NavLink>
      <NavLink to={`/portfolio`}>Portfolio</NavLink>
    </nav>
  );
}
