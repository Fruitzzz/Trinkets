import { createContext } from "react";

export const ItemContext = createContext({
  newItem: null,
  items: [],
  addItem: () => {},
  setFields: () => {},
  editNewItem: () => {},
  changeFields: () => {},
  removeTag: () => {},
  setTags: () => {},
});
