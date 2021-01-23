import { useCallback, useState, useContext } from "react";
import { UserContext } from "../context/user.context";
export const useCommon = () => {
  const { user } = useContext(UserContext);
  const [openedUser, setOpenedUser] = useState(null);
  const openUserHandler = useCallback((user) => {
    setOpenedUser(user);
  }, []);
  const isOwner = (id) => {
    if (user.isAdmin) return true;

    return user.id === id;
  };
  return { openedUser, openUserHandler, isOwner };
};
