import { createContext } from "react";

export const CommonContext = createContext({
  language: null,
  openedUser: null,
  setOpenedUser: () => {},
});
