import { useContext } from "react";
import { MealContext } from "../../contexts/MealContext";

export default function MealsFooter() {
  // consume context
  const meals = useContext(MealContext);
  return <div>Number of meals today: {meals.length}</div>;
}
