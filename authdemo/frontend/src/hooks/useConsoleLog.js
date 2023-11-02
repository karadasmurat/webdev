import { useEffect } from "react";

export default function useConsoleLog(msg) {
  useEffect(() => console.log(msg), [msg]);
}
