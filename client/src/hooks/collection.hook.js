import { useState, useContext } from "react";
import { CommonContext } from "../context/common.context";
export const useCollection = () => {
  const { openedUser } = useContext(CommonContext);
  const [collection, setCollection] = useState({
    ownerName: openedUser.name,
    ownerId: openedUser.id,
    title: "",
    description: "",
    subject: "",
    image: null,
    optionalFields: [],
  });
  const editCollection = (event) => {
    setCollection({ ...collection, [event.target.name]: event.target.value });
  };
  const setImage = (image) => {
    setCollection({ ...collection, image });
  };
  const addField = (event) => {
    setCollection({
      ...collection,
      optionalFields: [
        ...collection.optionalFields,
        { type: event.target.name, name: "", value: event.target.name === "date"? Date.now() : ""},
      ],
    });
  };
  const deleteField = (index) => {
    const fields = collection.optionalFields;
    fields.splice(index, 1);
    setCollection({ ...collection, optionalFields: fields });
  };
  const changeField = (event) => {
    const fields = collection.optionalFields;
    fields[event.target.id].name = event.target.value;
    setCollection({ ...collection, optionalFields: fields });
  };
  return {
    collection,
    editCollection,
    addField,
    deleteField,
    changeField,
    setImage,
  };
};
