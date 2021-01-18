import { React } from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
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
          <Collapsible accordion>
            <CollapsibleItem
              expanded={false}
              header={field.name}
              icon={<Icon>more_horiz</Icon>}
            >
              <ReactMarkdown plugins={[gfm]} children={field.value} />
            </CollapsibleItem>
          </Collapsible>
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
