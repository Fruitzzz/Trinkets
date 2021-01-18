import {React, useContext} from "react";
import Item from "./Item";
import AddItemModal from "../addItem/AddItemModal";
import {ItemContext} from "../../context/item.context";
const ItemsSection = () => {
    const {items} = useContext(ItemContext)
    return (
        <div>
        <div className="col s6">
          <h4>Элементы коллекции</h4>
        </div>
        <div className="col s12">
          <AddItemModal/>
        </div>
        <div className="col s12">
          <ul className="collection">
            {
                items.map((item, index) => (
                    <Item key={index} item={item} index={index}/>
                ))
            }
          </ul>
        </div>
      </div>
    )
}

export default ItemsSection