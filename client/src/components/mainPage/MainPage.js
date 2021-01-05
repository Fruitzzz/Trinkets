import React from "react";
import Cloud from "./Cloud";
import CollectCard from "../collection/CollectCard";
import CollectItem from "../collection/CollectItem";
const MainPage = () => {
  return (
    <div className="row">
      <div className="col s12">
        <Cloud />
      </div>
      <div className="col s12">
        <h3>Популярные коллекции</h3>
        <CollectCard />
        <CollectCard />
        <CollectCard />
      </div>
      <div className="col s12">
        <h3>Новые элементы</h3>
        <ul className="collection">
          <CollectItem />
          <CollectItem />
          <CollectItem />
        </ul>
      </div>
    </div>
  );
};
export default MainPage;
