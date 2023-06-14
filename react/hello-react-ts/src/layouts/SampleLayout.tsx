import { Outlet } from "react-router-dom";

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
