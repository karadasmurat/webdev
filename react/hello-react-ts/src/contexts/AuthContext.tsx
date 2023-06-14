import { ReactNode, createContext, useContext, useReducer } from "react";

// nullable type
type UserProfile = {
  email: string | undefined;
} | null;

type StateType = {
  user: UserProfile;
};

type ActionType =
  | { type: "auth/login"; payload: UserProfile }
  | { type: "auth/logout" };

type ContextType = {
  authState: StateType;
  authDispatch: React.Dispatch<ActionType>;
};

const INITIAL_STATE: StateType = { user: { email: "anon@mail.com" } };
const INITIAL_CONTEXT: ContextType = {
  authState: INITIAL_STATE,
  authDispatch: () => {},
};

export const AuthContext = createContext<ContextType>(INITIAL_CONTEXT);

export function authReducer(state: StateType, action: ActionType): StateType {
  console.log("authReducer");

  switch (action.type) {
    case "auth/login":
      console.log("auth/login");
      return { ...state, user: action.payload };
    case "auth/logout":
      return { ...state, user: null };

    default:
      console.log("authReducer: UNKNOWN action");
      return state;
  }
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);

  console.log("AutContext:", authState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
