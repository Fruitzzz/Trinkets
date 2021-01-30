import { React, useContext } from "react";
import Item from "./Item";
import AddItemModal from "../addItem/AddItemModal";
import { ItemContext } from "../../context/item.context";
import { useCommon } from "../../hooks/common.hook";
import { useTranslation } from "react-i18next";
import SortTools from "./SortTools";
const ItemsSection = () => {
  const { isOwner } = useCommon();
  const { items, newItem, setItems } = useContext(ItemContext);
  const { t } = useTranslation();
  return (
    <div>
      <div className="col s12">
        <h4>{t("items")}</h4>
      </div>
      <div className="col s6">
        {isOwner(newItem.ownerId) && <AddItemModal />}
      </div>
      <div className="col s6">
        <SortTools items={items} setItems={setItems}/>
      </div>
      <div className="col s12">
        <ul className="collection">
          {items.map((item, index) => (
            <Item key={index} item={item} index={index}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemsSection;
