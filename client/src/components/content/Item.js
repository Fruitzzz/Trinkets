import React from "react";
import { Icon, Chip } from "react-materialize";
import {Link} from "react-router-dom";
const Item = ({ index, item }) => {
  return (
    <li className="collection-item avatar" style={{ paddingBottom: "30px" }}>
      <Link to={`/item/${item._id}`}><Icon className="circle">attach_file</Icon></Link>
      <span className="title">{`Название: ${item.title}`}</span>
      <p>{`Коллекция: ${item.collectionTitle}`}</p>
      <div>
        {`Теги: `}
        {item.tags.map((tag, index) => (
          <Chip key={index}>{tag.tag}</Chip>
        ))}
      </div>
      <div className="right">
        <Icon>favorite_border</Icon>
        <span
          style={{ verticalAlign: "top", fontSize: "16px" }}
        >{` ${item.likes.length}`}</span>
      </div>
      <Icon className="secondary-content blue-grey-text text-darken-2">
        highlight_off
      </Icon>
    </li>
  );
};
export default Item;
