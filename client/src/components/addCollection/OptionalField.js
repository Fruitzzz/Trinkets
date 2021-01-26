import { React, useContext} from "react";
import { Icon } from "react-materialize";
import { CollectionContext } from "../../context/collection.context";
import { useTranslation } from "react-i18next";
const OptionalField = ({ type, index }) => {
  const {collection, changeField, removeField } = useContext(CollectionContext);
  const { t } = useTranslation();
  return (
    <div className=" input-field col s12">
      <Icon className="prefix" name={index} onClick={removeField}>close</Icon>
    <input
      value={collection.optionalFields[index].name}
      id={index}
      type="text"
      name={type}
      className="custom-input"
      onChange={changeField}
    />
    <label htmlFor={index}>{t("fieldName")}</label>
    </div>
  );
};
export default OptionalField;
