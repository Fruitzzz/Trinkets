import React from "react";
import Cloud from "./Cloud";
import CollectCard from "./CollectCard";
import CollectItem from "./CollectItem";
const MainPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <Cloud />
        </div>
        <h3>Популярные коллекции</h3>
        <CollectCard />
        <CollectCard />
        <CollectCard />
        <h3>Новые элементы</h3>
        <ul className="collection">
          <CollectItem/>
          <CollectItem/>
          <CollectItem/>
        </ul>
      </div>
    </div>
  );
};
export default MainPage;
