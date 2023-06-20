import { useContext } from "react";
import { MealContext } from "../../contexts/MealContext";

export default function MealsList() {
  // consume context
  const meals = useContext(MealContext);
  return meals.length ? (
    <ul>
      {meals.map((m) => (
        <li>{m.name}</li>
      ))}
    </ul>
  ) : (
    <h1>No meals found.</h1>
  );
}
