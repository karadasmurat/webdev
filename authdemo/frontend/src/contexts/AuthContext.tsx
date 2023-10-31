import { ReactNode, createContext, useReducer } from "react";

type UserProfile = {
  email: string;
  userId?: string;
  role?: string;
};

type StateType = {
  // nullable property
  user: UserProfile | null;
};

type ActionType =
  | { type: "auth/login"; payload: StateType }
  | { type: "auth/logout" };

type ContextType = {
  authState: StateType;
  authDispatch: React.Dispatch<ActionType>;
};

// const INITIAL_STATE: StateType = { user: { email: "anon@mail.com" } };
const INITIAL_STATE: StateType = { user: null };
const INITIAL_CONTEXT: ContextType = {
  authState: INITIAL_STATE,
  authDispatch: () => {},
};

export const AuthContext = createContext<ContextType>(INITIAL_CONTEXT);

export function authReducer(state: StateType, action: ActionType): StateType {
  console.log("BEGIN authReducer", action.type);

  switch (action.type) {
    case "auth/login":
      console.log("auth/login");
      const loggedInUser = { ...state, ...action.payload };
      console.log(loggedInUser);
      return loggedInUser;
    case "auth/logout":
      return { ...state, user: null };

    default:
      console.log("authReducer: UNKNOWN action");
      return state;
  }
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);

  console.log("AuthContextProvider > authState:", authState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
