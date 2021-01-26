import { createContext } from "react";

export const CommonContext = createContext({
  openedUser: null,
  setOpenedUser: () => {},
});
