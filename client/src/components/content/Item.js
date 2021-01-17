import React from "react";
import { Icon, Chip } from "react-materialize";
const Item = ({ index, item }) => {
  return (
    <li className="collection-item avatar" style={{paddingBottom: "30px"}}>
      <Icon className="circle">attach_file</Icon>
      <span className="title">{`Название: ${item.title}`}</span>
      <p>{`Коллекция: ${item.collectionTitle}`}</p>
      <p>
        Теги: {
          item.tags.map((tag, index) => (<Chip key={index}>{tag.tag}</Chip>))
        }
      </p>
      <p className="right">
        <Icon>favorite_border</Icon>
        <span style={{verticalAlign: "top", fontSize: "16px"}}>{` ${item.likes.length}`}</span>
      </p>
      <Icon className="secondary-content blue-grey-text text-darken-2">highlight_off</Icon>
    </li>
  );
};
export default Item;
