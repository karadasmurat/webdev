import { Outlet } from "react-router-dom";

export default function TodoLayout() {
  return (
    <>
      <h1>Todos</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}
