import Parent from "./Parent";
import UserContextProvider from "../../contexts/UserContext";

export default function ContextApp() {
  return (
    <UserContextProvider>
      <Parent />
    </UserContextProvider>
  );
}
