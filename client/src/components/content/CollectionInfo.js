import { React } from "react";
import Alc from "../../images/Alc.jpg";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
const CollectionInfo = () => {
  return (
    <div>
      <div className="col s12 m6">
        <img alt="" className="responsive-img" src={Alc} />
      </div>
      <div className="col s12 m6">
        <ul className="collection with-header">
          <li className="collection-header">
            <h3 className="center-align">{collection.title}</h3>
          </li>
          <li className="collection-item">
            <p className="flow-text">Автор: {collection.ownerName}</p>
          </li>
          <li className="collection-item">
            <p className="flow-text"> Тема: {collection.subject}</p>
          </li>
          <li className="collection-item">
            <p className="flow-text"> Количество элементов: {items.length}</p>
          </li>
        </ul>
      </div>
      <div className="col s12">
        <Collapsible accordion>
          <CollapsibleItem
            expanded={false}
            header="Описание"
            icon={<Icon>more_horiz</Icon>}
          >
            <ReactMarkdown
              plugins={[gfm]}
              children={collection.description}
            ></ReactMarkdown>
          </CollapsibleItem>
        </Collapsible>
      </div>
    </div>
  );
};
export default CollectionInfo;
