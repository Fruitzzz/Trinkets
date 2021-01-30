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
  const signIn = useCallback((user) => {
    setUser({ ...user, isAuthenticated: !!user.token });
    localStorage.setItem(storageName, JSON.stringify({ ...user}));
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
      signIn(data);
    }
  }, [signIn]);
  return { signIn, logout, user };
};
