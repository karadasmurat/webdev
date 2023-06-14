import { useContext } from "react";
import GrandChild from "./GrandChild";
import { UserContext } from "../../contexts/UserContext";

export default function Child() {
  const { userInfo } = useContext(UserContext);
  return (
    <div className="card m-2 p-2">
      <h3>Child</h3>
      <p>username from context: {userInfo.username}</p>
      <GrandChild />
    </div>
  );
}
