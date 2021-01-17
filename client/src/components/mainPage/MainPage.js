import React from "react";
import Cloud from "./Cloud";
//import CollectionCard from "../collection/CollectionCard";
//import CollectionItem from "../content/Item";
/*<div className="col s12">
<h3>Популярные коллекции</h3>
  <CollectionCard />
  <CollectionCard />
  <CollectionCard />
</div>*/
/*<ul className="collection">
<CollectionItem />
<CollectionItem />
<CollectionItem />
</ul>*/
const MainPage = () => {
  return (
    <div className="row">
      <div className="col s12">
        <Cloud />
      </div>
      <div className="col s12">
        <h3>Новые элементы</h3>
      </div>
    </div>
  );
};
export default MainPage;
