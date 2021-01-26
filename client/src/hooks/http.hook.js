import { useCallback, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user.context";
export const useHttp = () => {
  const { user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {authorization: user.token}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.msg);
        }
        setLoading(false);
        return data;
      } catch (e) {
        if (e.message === "Unauthorized") {
          history.push("/");
          logout();
        }
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    [user.token, history, logout]
  );
  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError };
};
