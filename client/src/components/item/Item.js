import { React, useContext } from "react";
import { Icon, Chip } from "react-materialize";
import { Link } from "react-router-dom";
import { useCommon } from "../../hooks/common.hook";
import { useHttp } from "../../hooks/http.hook";
import { ItemContext } from "../../context/item.context";
import {useHistory} from "react-router-dom";
import { useTranslation } from "react-i18next";
const Item = ({ item, readOnly }) => {
  const { isOwner } = useCommon();
  const { request } = useHttp();
  const { setItems } = useContext(ItemContext);
  const history = useHistory();
  const { t } = useTranslation();
  const removeHandler = async () => {
    const response = await request("/api/items/removeItem", "POST", {
      itemId: item._id,
      collectionId: item.collectionId,
    });
    setItems(response);
  };
  const onChipClick = (event) => {
    history.push(`/search/${event.target.innerHTML}`);
  };
  return (
    <li className="collection-item avatar">
      <Link to={`/item/${item._id}`}>
        <Icon className="circle">attach_file</Icon>
      </Link>
      <span className="title">{`${t("title")}: ${item.title}`}</span>
      <p>
        {`${t("collection")}: `}
        <Link
          className=" indigo-text text-darken-4
"
          to={`/collection/${item.collectionId}`}
        >
          {item.collectionTitle}
        </Link>
      </p>
      <div>
        {`${t("tags")}: `}
        {item.tags.map((tag, index) => (
          <Chip name={tag.tag} key={index} onClick={onChipClick} style={{cursor: "pointer"}}>
            {tag.tag}
          </Chip>
        ))}
      </div>
      <p>{`${t("addDate")}: ${item.creationDate.slice(0, 10)}`}</p>
      {isOwner(item.ownerId) && !readOnly && (
        <Icon
          className="secondary-content"
          onClick={removeHandler}
        >
          highlight_off
        </Icon>
      )}
    </li>
  );
};
export default Item;
