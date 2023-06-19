/* 
Context provides a way to pass data through the component tree without having to pass props down manually at every level.
*/

import { ReactNode, createContext, useReducer } from "react";
import { Todo } from "../models/Todo";
import useFetch from "../hooks/useFetch";

// State representation - type definition for the state
type StateType = {
  user: string;
  todos: Todo[];
};

// type definition for actions, that will be managed by reducer:
// discriminated union type
type ActionType =
  | { type: "todos/set"; payload: Todo[] }
  | { type: "todos/create"; payload: Todo }
  | { type: "todos/delete"; payload: Todo }
  | { type: "failure"; error: string };

type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

// initial state, with an empy array:
const INITIAL_STATE: StateType = {
  user: "Draco",
  todos: [
    { _id: "6483594d2cc35bb2b20f4870", title: "Mock Todo 01" },
    { _id: "2", title: "Mock Todo 02" },
  ],
};
const INITIAL_CONTEXT: ContextType = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

// declare and export a context, which will be read by useContext hook:
// it will contain an object,
export const TodoContext = createContext<ContextType>(INITIAL_CONTEXT);

// Consolidate state logic with a reducer
export function todoReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "todos/set":
      return { ...state, todos: action.payload };
    case "todos/create":
      return { ...state, todos: [...state.todos, action.payload] };
    case "todos/delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id != action.payload._id),
      };
    default:
      // throw Error("Unknown action: " + action.type);
      return state;
  }
}

// component returns a context Provider that will wrap children property.
export function TodoContextProvider({ children }: { children: ReactNode }) {
  // dynamic state (and dispatch, managed with useReducer) that will be provided to consumers
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE);

  return (
    // Provide a dynamic state value (managed with useReducer) and dispatch
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
