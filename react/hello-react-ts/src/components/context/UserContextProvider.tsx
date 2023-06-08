import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../../models/User";

// declare and export a context, which will be read by useContext hook:
const INITIAL_STATE = { name: "anonymous user", username: "anon" };
export const UserContext = createContext(INITIAL_STATE);

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  useEffect(() => fetchUser(), []);

  function fetchUser() {
    axios
      .get<User>("https://jsonplaceholder.typicode.com/users/1")
      .then((res) =>
        setUserInfo({
          ...userInfo,
          name: res.data.name,
          username: res.data.username,
        })
      )
      .catch((err) => console.log(err));
  }

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}
