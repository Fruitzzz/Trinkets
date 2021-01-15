import { useState, useContext } from "react";
import {UserContext} from "../context/user.context";
export const useItem = () => {
    const {openedCollection} = useContext(UserContext);
  const [item, setItem] = useState({
    title: "",
    tags: [],
    optionalFields: [],
    collectionName: openedCollection.title,
    collectionId: openedCollection.id,
  });
  const editItem = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const setFields = (fields) => {
    setItem({ ...item, optionalFields: fields });
  };
  const changeFields = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  return { item, editItem, setFields, changeFields };
};
