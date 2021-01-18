import { createContext } from "react";

export const ItemContext = createContext({
  newItem: null,
  items: [],
  addItem: () => {},
  setFields: () => {},
  setItems: () => {},
  editNewItem: () => {},
  changeFields: () => {},
  removeTag: () => {},
  setTags: () => {},
});
