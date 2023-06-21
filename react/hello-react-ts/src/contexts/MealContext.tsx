import { createContext, useState } from "react";

type Meal = {
  id: string;
  name: string;
  calories: number;
};

// fallback state
const meals_fallback = [
  { id: "1", name: "fb meal 01", calories: 11 },
  { id: "2", name: "fb meal 02", calories: 22 },
];

// Step 1 - create context
// The initial value passed to createContext is used as a "fallback value".
// It's only used when a component consuming the context is rendered outside the scope of a matching Provider.
export const MealContext = createContext<Meal[]>(meals_fallback);

type MealContextProviderProps = {
  children: React.ReactNode;
};

// Step 2 - provider component (providing its own state)
export default function MealContextProvider({
  children,
}: MealContextProviderProps) {
  const meals_init = [
    { id: "1", name: "meal 01", calories: 11 },
    { id: "2", name: "meal 02", calories: 22 },
    { id: "3", name: "meal 03", calories: 33 },
  ];

  const [meals, setMeals] = useState(meals_init);

  return <MealContext.Provider value={meals}>{children}</MealContext.Provider>;
}
