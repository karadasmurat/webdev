import axios from "axios";
import Child from "./Child";
import { useEffect } from "react";

export default function Parent() {
  return (
    <>
      <h1>Parent</h1>
      <Child />
    </>
  );
}
