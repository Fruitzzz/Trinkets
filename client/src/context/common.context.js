import { createContext } from "react";

export const CommonContext = createContext({
  theme: null,
  language: null,
  openedUser: null,
  setOpenedUser: () => {},
});
