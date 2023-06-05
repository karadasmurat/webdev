import { Outlet, NavLink } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function RootLayout() {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
