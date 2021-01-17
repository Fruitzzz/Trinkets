import { useState, useCallback, useEffect } from "react";
const storageName = "userData";
export const useUser = () => {
  const [user, setUser] = useState({
    token: null,
    id: null,
    name: null,
  });
  const signIn = useCallback((token, id, name) => {
    setUser({ token, id, name });
    localStorage.setItem(storageName, JSON.stringify({ token, id, name }));
  }, []);
  const logout = useCallback(() => {
    setUser({
      token: null,
      id: null,
      name: null,
    });
    localStorage.removeItem(storageName);
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      signIn(data.token, data.id, data.name);
    }
  }, [signIn]);
  return { signIn, logout, user };
};
