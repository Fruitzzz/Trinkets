import { React, useContext } from "react";
import { TextInput } from "react-materialize";
import { ItemContext } from "../../context/item.context";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
const OptionalField = ({ item, index }) => {
  const { changeFields, newItem } = useContext(ItemContext);
  const checkHandler = (event) => {
    changeFields(index, event.target.checked);
  };
  const changeHandler = (event) => {
    changeFields(index, event.target.value);
  };
  const dateHandler = (date) => {
    const format = date.toString().slice(4, 15);
    changeFields(index, format);
  };
  switch (item.type) {
    case "boolean": {
      return (
        <div className="col s12 m6 offset-m3">
          <label>
            <input
              type="checkbox"
              onChange={checkHandler}
              id={`checkbox-${index}`}
            />
            <span>{item.name}</span>
          </label>
        </div>
      );
    }
    case "number": {
      return (
        <div className="input-field col s12 m6 offset-m3">
          <input
            value={newItem.optionalFields[index].value}
            id={`number-${index}`}
            type="text"
            name="title"
            onChange={changeHandler}
            className="custom-input"
          />
          <label htmlFor={`number-${index}`}>{item.name}</label>
        </div>
      );
    }
    case "text": {
      return (
        <div className="input-field col s12 m6 offset-m3">
          <textarea
            value={newItem.optionalFields[index].value}
            id={`text-${index}`}
            className="materialize-textarea custom-input"
            onChange={changeHandler}
          />
          <label htmlFor={`text-${index}`}>{item.name}</label>
        </div>
      );
    }
    case "date": {
      return (
        <div
          className="input-field col s12 m6 offset-m3"
          style={{ padding: 0 }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="col s12"
              variant="dialog"
              format="dd/MM/yyyy"
              margin="normal"
              id={`date-${index}`}
              label={item.name}
              value={newItem.optionalFields[index].value}
              onChange={dateHandler}
            />
          </MuiPickersUtilsProvider>
        </div>
      );
    }
    default: {
      return (
        <div
          className="input-field col s12 m6 offset-m3"
          style={{ padding: 0 }}
        >
          <TextInput
            s={12}
            value={newItem.optionalFields[index].value}
            className="custom-input"
            id={`title-${index}`}
            onChange={changeHandler}
            data-length={25}
            label={item.name}
          />
        </div>
      );
    }
  }
};
export default OptionalField;
