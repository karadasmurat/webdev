import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Set up an authentication system
  //   const isAuthenticated = true;
  const { authState } = useContext(AuthContext);
  console.log("ProtectedRoute > authState:", authState);

  // This hook returns the current location object.
  // A location is a particular entry in the history stack, usually analogous to a "page" or "screen" in your app.
  const location = useLocation();

  return authState.user ? (
    <div>
      <h3>Guarded.</h3>
      {children}
    </div>
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
}
