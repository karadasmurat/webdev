import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function SessionValidator() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ user: null });
  const [error, setError] = useState(null);

  // AuthContext
  const { authState, authDispatch } = useContext(AuthContext);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get("/api/auth/validate-session", {
        withCredentials: true,
      })
      .then((response) => {
        // instead of setting data, we dispatch an action to set context.
        // setData(response.data);
        authDispatch({
          type: "auth/login",
          payload: { user: { email: response.data.email } },
        });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchData, []);

  return <div>SessionValidator</div>;
}
