import { createContext } from "react";

type Meal = {
  id: string;
  name: string;
  calories: number;
};

// Step 1 - create context
// initial state
const meals = [
  { id: "1", name: "meal c01", calories: 11 },
  { id: "2", name: "meal c02", calories: 22 },
  { id: "3", name: "meal c03", calories: 33 },
];

export const MealContext = createContext<Meal[]>(meals);

// Step 2 - provider component
type MealContextProviderProps = {
  children: React.ReactNode;
};
export default function MealContextProvider({
  children,
}: MealContextProviderProps) {
  return <MealContext.Provider value={meals}>{children}</MealContext.Provider>;
}
