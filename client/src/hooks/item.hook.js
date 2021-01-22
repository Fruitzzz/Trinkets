import { useState } from "react";

export const useItem = () => {
  const [newItem, setNewItem] = useState({
    title: "",
    tags: [],
    optionalFields: [],
    collectionTitle: null,
    collectionId: null,
  });

  const [items, setItems] = useState([]);
  const removeTag = (event) => {
    const currentTags = newItem.tags;
    currentTags.splice(event.target.name, 1);
    setNewItem({ ...newItem, tags: currentTags });
  };

  const setTags = (tags) => {
    setNewItem({ ...newItem, tags: tags });
  };

  const editNewItem = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const setFields = (fields) => {
    setNewItem({ ...newItem, optionalFields: fields });
  };

  const changeFields = (index, value) => {
    const fields = newItem.optionalFields;
    fields[index].value = value;
    setNewItem({ ...newItem, optionalFields: fields });
  };

  return {
    newItem,
    editNewItem,
    changeFields,
    removeTag,
    setTags,
    items,
    setItems,
    setFields,
  };
};
