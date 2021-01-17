import { React, useCallback, useState, useEffect } from "react";
import Loader from "../technical/Loader";
import { useHttp } from "../../hooks/http.hook";
import { useParams, useHistory } from "react-router-dom";
import Alc from "../../images/Alc.jpg";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import ItemsSection from "./ItemsSection";
import { useItem } from "../../hooks/item.hook";
import { ItemContext } from "../../context/item.context";
const CollectionPage = () => {
  const { request } = useHttp();
  const history = useHistory();
  const params = useParams();
  const [collection, setCollection] = useState(null);
  const {
    newItem,
    items,
    addItem,
    editNewItem,
    changeFields,
    removeTag,
    setTags,
    setItems,
    setFields,
  } = useItem();
  const fetchCollection = useCallback(async () => {
    try {
      const fetched = await request(`/api/collections/collection/${params.id}`);
      setCollection(fetched.collection);
      setItems(fetched.items);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, params.id, history, setItems]);
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);
  if (!collection) {
    return <Loader />;
  }
  return (
    <ItemContext.Provider
      value={{
        newItem: {
          ...newItem,
          collectionTitle: collection.title,
          collectionId: collection._id,
          optionalFields: collection.optionalFields,
        },
        items,
        editNewItem,
        changeFields,
        removeTag,
        setTags,
        addItem,
        setFields
      }}
    >
      <div className="row content">
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
          <ItemsSection />
        </div>
      </div>
    </ItemContext.Provider>
  );
};
export default CollectionPage;
