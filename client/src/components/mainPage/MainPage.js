import { React, useState, useEffect, useCallback, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import Cloud from "./Cloud";
import CollectionCard from "../collection/CollectionCard";
import Item from "../item/Item";
import Loader from "../technical/Loader";
import {CommonContext} from "../../context/common.context"
const MainPage = () => {
  const { request } = useHttp();
  const [collections, setCollections] = useState(null);
  const [items, setItems] = useState(null);
  const {theme} = useContext(CommonContext)
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request("/api/collections/biggestCollections");
      setCollections(fetched);
    } catch (e) {}
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
        <Cloud/>
      </div>
      <div className="col s12">
        {collections.map((collection, index) => (
          <CollectionCard key={index} collection={collection} readOnly />
        ))}
      </div>
      <div className="col s12">
        <h3>Новые элементы</h3>
        <ul className="collection">
          {items.map((item, index) => (
            <Item key={index} item={item} readOnly />
          ))}
        </ul>
        <button onClick={() => {
          console.log(theme);
        }}>fdasfs</button>
      </div>
    </div>
  );
};
export default MainPage;
