import { Outlet } from "react-router-dom";
import NavBar_Offcanvas from "../components/NavBar_Offcanvas";

export default function RootLayout() {
  return (
    <>
      <header>
        {/* <NavigationBar /> */}
        <NavBar_Offcanvas />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
