import { createContext } from "react";

export const CollectionContext = createContext({
  collection: null,
  subjects: null,
  editCollection: () => {},
  addField: () => {},
  removeField: () => {},
  changeField: () => {},
  setImage: () => {},
});
