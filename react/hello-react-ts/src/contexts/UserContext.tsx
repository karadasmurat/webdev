import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserInfo {
  name: string;
  username: string;
}

// the type of context "value", {userInfo, setUserInfo} where state is of type UserInfo
interface UserInfoContext {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const ANON_USER_INFO: UserInfo = { name: "anonymous user", username: "anon" };

// declare and export a context, which will be read by useContext hook:
export const UserContext = createContext<UserInfoContext>({
  userInfo: ANON_USER_INFO,
  setUserInfo: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  // Note that when component mounts, before useEffect runs, initial state will be visible in UI!
  const [userInfo, setUserInfo] = useState<UserInfo>(ANON_USER_INFO);

  // const { data } = useFetch<UserInfo>(
  //   "https://jsonplaceholder.typicode.com/users/1"
  // );
  // console.log("data[0]", data[0]);

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function simulateLoading() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }
  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://jsonplaceholder.typicode.com/users/2")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    simulateLoading().then(fetchData);
    // fetchData();

    // return () => {
    //   console.log("useFetch: cleanup");
    // };
  }, []);

  return (
    // Provide a dynamic state value, and setter
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
