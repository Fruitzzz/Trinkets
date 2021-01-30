import { React, useCallback, useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useParams, useHistory } from "react-router-dom";
import { useItem } from "../../hooks/item.hook";
import { ItemContext } from "../../context/item.context";
import { Image } from "cloudinary-react";
import Loader from "../technical/Loader";
import ItemsSection from "../item/ItemsSection";
import CollapsibleMarkdown from "../technical/CollapsibleMarkdown";
import EditFAB from "../technical/EditFAB";
import UpdateCollectionModal from "../collection/UpdateCollectionModal";
import { useCommon } from "../../hooks/common.hook";
import {useMessage} from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";
const CollectionPage = () => {
  const { isOwner } = useCommon();
  const { request, loading, error, clearError } = useHttp();
  const history = useHistory();
  const message = useMessage();
  const { t } = useTranslation();
  const params = useParams();
  const [collection, setCollection] = useState(null);
  const {
    newItem,
    items,
    editNewItem,
    changeFields,
    removeTag,
    setTags,
    setItems,
    setFields,
    clearItem
  } = useItem();
  const [openUpdate, setOpenUpdate] = useState(false);
  const fetchCollection = useCallback(async () => {
    try {
      const fetched = await request(`/api/collections/collection/${params.id}`);
      setCollection(fetched.collection);
      setItems(fetched.items);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, params.id, history, setItems]);
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);
  if (!collection) {
    return <Loader />;
  }
  const deleteHandler = async () => {
    try {
      await request("/api/collections/removeCollection", "POST", {
        id: collection._id,
        image: collection.imageId
      });
      history.push(`/profile/${collection.ownerId}`);
    } catch (e) {}
  };
  const updateHandler = async (update) => {
    try {
      const response = await request(
        "/api/collections/updateCollection",
        "POST",
        {
          ...update,
        }
      );
      const currentCollection = response.find(
        (item) => item._id === collection._id
      );
      setCollection(currentCollection);
      setOpenUpdate(false);
    } catch {}
  };
  return (
    <ItemContext.Provider
      value={{
        newItem: {
          ...newItem,
          collectionTitle: collection.title,
          collectionId: collection._id,
          optionalFields: collection.optionalFields,
          ownerId: collection.ownerId,
        },
        items,
        editNewItem,
        changeFields,
        removeTag,
        setTags,
        setItems,
        setFields,
        clearItem
      }}
    >
      <div className="row content">
        <div className="col s12 m6">
          <Image
            cloudName="dxqkl2we4"
            publicId={collection.imageId}
            className="responsive-img"
          />
        </div>
        <div className="col s12 m6">
          <ul className="collection with-header">
            <li className="collection-header">
              <h3 className="center-align">{collection.title}</h3>
            </li>
            <li className="collection-item">
              <p className="flow-text">{`${t("author")}: ${collection.ownerName}`}</p>
            </li>
            <li className="collection-item">
              <p className="flow-text">{`${t("subject")}: ${collection.subject}`}</p>
            </li>
            <li className="collection-item">
              <p className="flow-text">{`${t("amount")}: ${items.length}`}</p>
            </li>
          </ul>
        </div>
        <div className="col s12">
          <CollapsibleMarkdown
            header={t("description")}
            description={collection.description}
          />
          <ItemsSection />
        </div>
      </div>
      {isOwner(collection.ownerId) && (
        <EditFAB deleteHandler={deleteHandler} updateHandler={setOpenUpdate} />
      )}
      <UpdateCollectionModal
        collection={collection}
        open={openUpdate}
        setOpen={setOpenUpdate}
        updateHandler={updateHandler}
        loading={loading}
      />
    </ItemContext.Provider>
  );
};
export default CollectionPage;
