import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const GRANDCHILD_USER_INFO = {
  name: "Grand Child",
  username: "_CrazyGrandChild_",
};

export default function GrandChild() {
  // Call useContext at the top level of your component to read and subscribe to context.
  const { userInfo, setUserInfo } = useContext(UserContext);
  return (
    <div className="card m-2 p-2">
      <h5>GrandChild</h5>
      <p>{userInfo.name}</p>
      <p>{userInfo.username}</p>
      {/* set context value from the consumer */}
      <button
        onClick={() => {
          setUserInfo(GRANDCHILD_USER_INFO);
        }}
        className="btn btn-primary"
      >
        Change Username
      </button>
    </div>
  );
}
