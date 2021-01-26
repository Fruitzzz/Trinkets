import { React, useContext } from "react";
import { ItemContext } from "../../context/item.context";
import { Chip, Icon } from "react-materialize";
import OptionalField from "./OptionalField";
import { useTranslation } from "react-i18next";
const AddItemForm = () => {
  const { newItem, editNewItem, setTags } = useContext(ItemContext);
  const { t } = useTranslation();
  return (
    <div className="row" style={{ marginTop: "80px" }}>
      <div className="input-field col s12 m6 offset-m3">
        <input
          value={newItem.title}
          id="item-title"
          type="text"
          name="title"
          onChange={editNewItem}
          className="custom-input"
        />
        <label htmlFor="item-title">{t("title")}</label>
      </div>
      <div className="input-field col s12 m6 offset-m3">
        <Chip
          close={false}
          closeIcon={<Icon className="close">close</Icon>}
          options={{
            data: newItem.tags,
            placeholder: t("enterTag"),
            secondaryPlaceholder: t("enterAnotherTag"),
            autocompleteOptions: {
              data: {
                Apple: null,
                Google: null,
                Microsoft: null,
              },
              minLength: 1,
              onAutocomplete: function noRefCheck() {},
            },
            onChipAdd: (event) => {
              setTags([...event[0].M_Chips.chipsData]);
            },
            onChipDelete: (event) => {
              setTags([...event[0].M_Chips.chipsData]);
            },
          }}
        />
      </div>
      {newItem.optionalFields.map((item, index) => (
        <OptionalField key={index} item={item} index={index} />
      ))}
    </div>
  );
};
export default AddItemForm;
