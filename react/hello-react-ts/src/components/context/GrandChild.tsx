import { useContext } from "react";
import { UserContext } from "./UserContextProvider";

export default function GrandChild() {
  // Call useContext at the top level of your component to read and subscribe to context.
  const userInfo = useContext(UserContext);
  return (
    <div className="container">
      <h5>GrandChild</h5>
      <p>{userInfo.name}</p>
      <p>{userInfo.username}</p>
    </div>
  );
}
