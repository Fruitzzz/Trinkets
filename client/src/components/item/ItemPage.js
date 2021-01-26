import { React, useEffect, useCallback, useState, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { SocketContext } from "../../context/socket.context";
import { useCommon } from "../../hooks/common.hook";
import { UserContext } from "../../context/user.context";
import { Chip } from "react-materialize";
import { useHttp } from "../../hooks/http.hook";
import { useTranslation } from "react-i18next";
import Loader from "../technical/Loader";
import OptionalField from "./OptionalField";
import Comment from "../social/Comment";
import AddComment from "../social/AddComment";
import LikeSection from "../social/LikeSection";
import EditFAB from "../technical/EditFAB";
import UpdateItemModal from "./ItemUpdateModal";
const ItemPage = () => {
  const { isOwner } = useCommon();
  const socket = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { request, loading } = useHttp();
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const [item, setItem] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const fetchItem = useCallback(async () => {
    try {
      await socket.emit("reqItem", params.id);
    } catch (e) {}
  }, [params.id, socket]);
  const deleteHandler = async () => {
    try {
      await request("/api/items/removeItem", "POST", { itemId: item._id });
      history.push(`/collection/${item.collectionId}`);
    } catch (e) {}
  };
  const updateHandler = async (update) => {
    try {
      const response = await request("/api/items/updateItem", "POST", {
        ...update,
      });
      setItem({ ...response });
      setOpenUpdate(false);
    } catch (e) {}
  };
  useEffect(() => {
    fetchItem();
  }, [fetchItem]);
  useEffect(() => {
    socket.on("invalidItem", () => {
      history.push("/notFound");
    });
  });
  useEffect(() => {
    socket.on("resItem", (fetched) => {
      setItem(fetched);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateItem", (item) => {
      setItem(item);
    });
  }, [socket]);
  if (!item) {
    return <Loader />;
  }
  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <ul className="collection with-header">
          <li className="collection-header">
            <h3 className="center-align">{item.title}</h3>
          </li>
          <li className="collection-item">
            <p className="flow-text ">{t("collection")}: {item.collectionTitle}</p>
          </li>
          <li className="collection-item">
            <span className="flow-text">{`${t("tags")}: `}</span>
            {item.tags.map((tag, index) => (
              <Link key={index} to={`/search/${tag.tag}`}>
              <Chip className="right">
                {tag.tag}
              </Chip>
              </Link>
            ))}
          </li>
          <li className="collection-item">
            <span className="flow-text">
              {t("addDate")}: {item.creationDate.slice(0, 10)}
            </span>
          </li>
          {item.optionalFields.map((field, index) => (
            <OptionalField key={index} field={field} index={index} />
          ))}
        </ul>
      </div>
      <LikeSection likes={item.likes} socket={socket} />
      {user.isAuthenticated && <AddComment socket={socket} />}
      {item.comments.reverse().map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      {isOwner(item.ownerId) && (
        <EditFAB
          deleteHandler={deleteHandler}
          loading={loading}
          updateHandler={setOpenUpdate}
        />
      )}
      <UpdateItemModal
        item={item}
        open={openUpdate}
        setOpen={setOpenUpdate}
        updateHandler={updateHandler}
        loading={loading}
      />
    </div>
  );
};
export default ItemPage;
