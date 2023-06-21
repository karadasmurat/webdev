import { useContext } from "react";
import { MealContext } from "../../contexts/MealContext";

export default function MealsList() {
  // consume context
  const meals = useContext(MealContext);
  return (
    <>
      {meals.length ? (
        meals.map((m) => (
          <div className="card p-2 m-2" style={{ width: "11rem" }}>
            {m.name}
          </div>
        ))
      ) : (
        <h1>No meals found.</h1>
      )}
    </>
  );
}
