import { useState } from "react";

export default function Quantity() {
  const [q, setQ] = useState(0);

  // state modifiers
  const decrement = () => {
    if (q > 0) {
      setQ((prev) => Number(prev) - 1);
    }
  };
  const increment = () => {
    setQ((prev) => Number(prev) + 1);
  };

  const handleChange = (e) => {
    setQ(Number(e.target.value));
  };

  return (
    <div className="container m-3">
      <p>{q}</p>
      <button onClick={decrement}>-</button>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={q}
        onChange={handleChange}
        aria-label="Quantity"
        min={0}
      />
      <button onClick={increment}>+</button>
    </div>
  );
}
