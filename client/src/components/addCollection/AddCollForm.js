import { React, useContext, useEffect, useState } from "react";
import { CollectionContext } from "../../context/collection.context";
import Button from "@material-ui/core/Button";
import { Link as FlatButton } from "@material-ui/core";
import { Dropdown, Icon } from "react-materialize";
import OptionalField from "./OptionalField";
import SubjectsPicker from "../technical/SubjectsPicker";
const AddCollForm = () => {
  const { collection, editCollection, addField } = useContext(
    CollectionContext
  );
  const [fields, setFields] = useState(collection.optionalFields);
  useEffect(() => {
    setFields(collection.optionalFields);
  }, [setFields, collection.optionalFields]);
  return (
    <div>
      <div className=" input-field col s12 m7 offset-m1">
        <input
          value={collection.title}
          id="collection-title"
          type="text"
          name="title"
          onChange={editCollection}
          className="custom-input"
        />
        <label htmlFor="collection-title">Название</label>
      </div>
      <div className="input-field col s12 m7 offset-m1">
        <textarea
          id="collection-description"
          className="materialize-textarea custom-input"
          name="description"
          value={collection.description}
          onChange={editCollection}
        />
        <label htmlFor="collection-description">Описание</label>
      </div>
      <div className="col s12 m7 offset-m1 right">
        <SubjectsPicker
          value={collection.subject}
          changeHandler={editCollection}
        />
      </div>
      {fields.map((item, index) => (
        <OptionalField key={index} type={item.type} index={index} />
      ))}
      <div className="col s12">
        <Dropdown
          id="selectField"
          trigger={
            <Button
              variant="outlined"
              className="right blue-border-btn"
              style={{ marginTop: "10px" }}
              name="string"
            >
              Добавить поле
            </Button>
          }
        >
          <FlatButton
            className="blue-grey-text text-darken-2 nav-link flat-button"
            name="date"
            onClick={addField}
          >
            <Icon className="blue-grey-text text-darken-2">date_range</Icon>
            Дата
          </FlatButton>
          <FlatButton
            className="blue-grey-text text-darken-2 nav-link flat-button"
            name="boolean"
            onClick={addField}
          >
            <Icon className="blue-grey-text text-darken-2">check_box</Icon>
            Да/Нет
          </FlatButton>
          <FlatButton
            className="blue-grey-text text-darken-2 nav-link flat-button"
            name="number"
            onClick={addField}
          >
            <Icon className="blue-grey-text text-darken-2">exposure_zero</Icon>
            Число
          </FlatButton>
          <FlatButton
            className="blue-grey-text text-darken-2 nav-link flat-button"
            name="title"
            onClick={addField}
          >
            <Icon className="blue-grey-text text-darken-2">title</Icon>
            Надпись
          </FlatButton>
          <FlatButton
            className="blue-grey-text text-darken-2 nav-link flat-button"
            name="text"
            onClick={addField}
          >
            <Icon className="blue-grey-text text-darken-2">text_fields</Icon>
            Текст
          </FlatButton>
        </Dropdown>
      </div>
    </div>
  );
};
export default AddCollForm;
