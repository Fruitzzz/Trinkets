import { React, useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import Cloud from "./Cloud";
import CollectionCard from "../collection/CollectionCard";
import Item from "../item/Item";
import Loader from "../technical/Loader";
import { useTranslation } from "react-i18next";
const MainPage = () => {
  const { request } = useHttp();
  const [collections, setCollections] = useState(null);
  const [items, setItems] = useState(null);
  const { t } = useTranslation();
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request("/api/collections/biggestCollections");
      setCollections(fetched);
    } catch (e) {
      setCollections([]);
    }
  }, [request]);
  const fetchItems = useCallback(async () => {
    try {
      const fetched = await request("/api/items/lastItems");
      setItems(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchCollections();
    fetchItems();
  }, [fetchCollections, fetchItems]);
  if (!items || !collections) {
    return <Loader />;
  }
  return (
    <div className="row">
      <div className="col s12">
        <Cloud />
      </div>
      <div className="col s12">
        {collections.map((collection, index) => (
          <CollectionCard key={index} collection={collection} readOnly />
        ))}
      </div>
      <div className="col s12">
        <h3>{t("newItems")}</h3>
        <ul className="collection">
          {items.map((item, index) => (
            <Item key={index} item={item} readOnly />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MainPage;
