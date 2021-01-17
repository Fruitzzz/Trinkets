import { useState, useContext } from "react";
import { UserContext } from "../context/user.context";
export const useCollection = () => {
  const { user } = useContext(UserContext);
  const [collection, setCollection] = useState({
    ownerName: user.name,
    ownerId: user.id,
    title: "",
    description: "",
    subject: "",
    pictureURL: null,
    optionalFields: [],
  });
  const [image, setImage] = useState(null);
  const editCollection = (event) => {
    setCollection({ ...collection, [event.target.name]: event.target.value });
  };
  const addField = (event) => {
    setCollection({
      ...collection,
      optionalFields: [
        ...collection.optionalFields,
        { type: event.target.name, name: "", value: ""},
      ],
    });
  };
  const removeField = (event) => {
    const fields = collection.optionalFields;
    fields.splice(event.target.name, 1);
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
    removeField,
    changeField,
    setImage,
    image,
  };
};
