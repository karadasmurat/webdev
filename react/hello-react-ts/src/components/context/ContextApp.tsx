import Parent from "./Parent";
import UserContextProvider from "./UserContextProvider";

export default function ContextApp() {
  return (
    <UserContextProvider>
      <Parent />
    </UserContextProvider>
  );
}
