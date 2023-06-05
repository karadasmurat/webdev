import { Outlet, NavLink } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function SampleLayout() {
  return (
    <>
      <h1>Sample Layout.</h1>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}
