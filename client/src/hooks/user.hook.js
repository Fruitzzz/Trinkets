import { useState, useCallback, useEffect } from "react";
const storageName = "userData";
export const useUser = () => {
  const [user, setUser] = useState({
    token: null,
    id: null,
    name: null,
    isAdmin: null,
    isAuthenticated: null
  });
  const signIn = useCallback((token, id, name, isAdmin) => {
    setUser({ token, id, name, isAdmin, isAuthenticated: !!token });
    localStorage.setItem(storageName, JSON.stringify({ token, id, name, isAdmin }));
  }, []);
  const logout = useCallback(() => {
    setUser({
      token: null,
      id: null,
      name: null,
      isAdmin: null
    });
    localStorage.removeItem(storageName);
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      signIn(data.token, data.id, data.name, data.isAdmin);
    }
  }, [signIn]);
  return { signIn, logout, user };
};
