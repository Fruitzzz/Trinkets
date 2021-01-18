import { React, useEffect, useCallback, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../technical/Loader";
import { Chip } from "react-materialize";
import OptionalField from "./OptionalField";
import Comment from "./Comment";
import AddComment from "../social/AddComment";
import LikeSection from "../social/LikeSection";
import {SocketContext} from "../../context/socket.context";
const ItemPage = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const params = useParams();
  const [item, setItem] = useState(null);
  const fetchItem = useCallback(async () => {
    try {
      socket.emit("reqItem", params.id)
    } catch (e) {
      history.push("/notFound");
    }
  }, [params.id, socket, history]);
  useEffect(() => {
    fetchItem();
  }, [fetchItem]);
  useEffect(() => {
    socket.on("resItem", (fetched) => {
      setItem(fetched)
    })
  }, [socket])
  if (!item) {
    return <Loader />;
  }
  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <ul className="collection with-header">
          <li className="collection-header">
            <p className=" flow-text center-align">Название: {item.title}</p>
          </li>
          <li className="collection-item">
            <p className="flow-text center-align">
              Коллекция: {item.collectionTitle}
            </p>
          </li>
          <li className="collection-item">
            <span className="flow-text">Теги:</span>
            {item.tags.map((tag, index) => (
              <Chip className="right" key={index}>
                {tag.tag}
              </Chip>
            ))}
          </li>
          {item.optionalFields.map((field, index) => (
            <OptionalField key={index} field={field} index={index} />
          ))}
        </ul>
      </div>
      <LikeSection likes={item.likes} />
      <Comment />
      <AddComment />
    </div>
  );
};
export default ItemPage;
