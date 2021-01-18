import { React, useContext } from "react";
import { Icon, Chip } from "react-materialize";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { ItemContext } from "../../context/item.context";
const Item = ({ item }) => {
  const {request} = useHttp();
  const {setItems} = useContext(ItemContext);

  const removeClickHandler = async () => {
   const response = await request("/api/collections/removeItem", "POST", {itemId: item._id, collectionId: item.collectionId});
   setItems([...response]);
  }
  return (
    <li className="collection-item avatar">
      <Link to={`/item/${item._id}`}>
        <Icon className="circle">attach_file</Icon>
      </Link>
      <span className="title">{`Название: ${item.title}`}</span>
      <p>{`Коллекция: ${item.collectionTitle}`}</p>
      <div>
        {`Теги: `}
        {item.tags.map((tag, index) => (
          <Chip key={index}>{tag.tag}</Chip>
        ))}
      </div>
      <Icon className="secondary-content blue-grey-text text-darken-2" onClick={removeClickHandler}>
        highlight_off
      </Icon>
    </li>
  );
};
export default Item;
