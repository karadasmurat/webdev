import MealContextProvider from "../../contexts/MealContext";
import MealsFooter from "./MealsFooter";
import MealsList from "./MealsList";

export default function MealsApp() {
  return (
    <MealContextProvider>
      <MealsList />
      <MealsFooter />
    </MealContextProvider>
  );
}
