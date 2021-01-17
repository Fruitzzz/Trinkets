import { React, useContext } from "react";
import { ItemContext } from "../../context/item.context";
import { Chip, Icon } from "react-materialize";
import OptionalField from "./OptionalField";
const AddItemForm = () => {
  const { newItem, editNewItem, setTags } = useContext(ItemContext);

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          value={newItem.title}
          id="item-title"
          type="text"
          name="title"
          onChange={editNewItem}
          className="custom-input"
        />
        <label htmlFor="item-title">Название</label>
      </div>
      <div className="input-field col s12">
        <Chip
          close={false}
          closeIcon={<Icon className="close">close</Icon>}
          options={{
            data: newItem.tags,
            placeholder: "Введите тег",
            secondaryPlaceholder: "+ Тег",
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
          <OptionalField key={index} item={item} index={index}/>
      ))}
    </div>
  );
};
export default AddItemForm;
