import { React } from "react";
import CollapsibleMarkdown from "../technical/CollapsibleMarkdown";
const OptionalField = ({ field }) => {
  switch (field.type) {
    case "boolean": {
      return (
        <li
          className="collection-item valign-wrapper"
          style={{ minHeight: "93px" }}
        >
          <label>
            <input type="checkbox" checked={!!field.value} readOnly />
            <span className="flow-text">{field.name}</span>
          </label>
        </li>
      );
    }
    case "text": {
      return (
        <li className="collection-item">
         <CollapsibleMarkdown header={field.name} description={field.value}/>
        </li>
      );
    }
    default: {
      return (
        <li className="collection-item">
          <p className="flow-text">{`${field.name}: ${field.value}`}</p>
        </li>
      );
    }
  }
};
export default OptionalField;
