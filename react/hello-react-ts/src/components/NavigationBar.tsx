import { Link, NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navbar">
      <NavLink to={`/`}>Home</NavLink>
      <NavLink to={`/todos`}>Todos</NavLink>
      <NavLink to={`/hooks`}>Hooks</NavLink>
      <NavLink to={`/help`}>Help</NavLink>
    </nav>
  );
}
