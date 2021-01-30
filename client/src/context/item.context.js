import { createContext } from "react";

export const ItemContext = createContext({
  newItem: null,
  items: [],
  setFields: () => {},
  setItems: () => {},
  editNewItem: () => {},
  changeFields: () => {},
  removeTag: () => {},
  setTags: () => {},
  clearItem: () => {}
});
