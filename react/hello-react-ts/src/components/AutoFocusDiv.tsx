import { useEffect, useRef } from "react";

export default function AutoFocusDiv() {
  const ref = useRef<HTMLInputElement>(null);

  // auto-focus an input field when a component is mounted
  useEffect(() => ref.current?.focus(), []);

  return (
    <form>
      <label htmlFor="a">Field One</label>
      <input type="text" name="a" id="a" className="form-control" />

      <label htmlFor="b">Focus</label>
      <input type="text" ref={ref} name="b" id="b" className="form-control" />

      <label htmlFor="c">Field Three</label>
      <input type="text" name="c" id="c" className="form-control" />
    </form>
  );
}
