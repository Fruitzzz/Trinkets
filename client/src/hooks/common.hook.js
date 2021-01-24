import { useCallback, useState, useContext} from "react";
import { UserContext } from "../context/user.context";
export const useCommon = () => {
  const themes = {
    dark : {
      color: "white",
      background: "#181818"
    },
    light: {
      color: "#181818",
      background: "white"
    }
  }
  const { user } = useContext(UserContext);
  const [openedUser, setOpenedUser] = useState(null);
  const [theme, setTheme] = useState(themes.dark);
  const openUserHandler = useCallback((user) => {
    setOpenedUser(user);
  }, []);
  const isOwner = (id) => {
    if (user.isAdmin) return true;
    return user.id === id;
  };
  const swapTheme = () => {
    theme.light? setTheme(themes.dark) : setTheme(themes.light)
  }
  return { openedUser, openUserHandler, isOwner, swapTheme, theme};
};
