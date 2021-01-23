import { React, useContext } from "react";
import { Icon, Chip } from "react-materialize";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { ItemContext } from "../../context/item.context";
import { useCommon } from "../../hooks/common.hook";
const Item = ({ item }) => {
  const { isOwner } = useCommon();
  const { request } = useHttp();
  const { setItems } = useContext(ItemContext);

  const removeClickHandler = async () => {
    const response = await request("/api/items/removeItem", "POST", {
      itemId: item._id,
      collectionId: item.collectionId,
    });
    setItems([...response]);
  };
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
      <p>{`Дата добавления: ${item.creationDate.slice(0, 10)}`}</p>
      {isOwner(item.ownerId) && (
        <Icon
          className="secondary-content blue-grey-text text-darken-2"
          onClick={removeClickHandler}
        >
          highlight_off
        </Icon>
      )}
    </li>
  );
};
export default Item;
