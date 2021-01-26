import { React, useCallback, useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Loader from "../technical/Loader";
import { useHttp } from "../../hooks/http.hook";
import CollectionCard from "./CollectionCard";
import { Icon } from "react-materialize";
import { useCommon } from "../../hooks/common.hook";
import { CommonContext } from "../../context/common.context";
import { useTranslation } from "react-i18next";
const UserPage = () => {
  const history = useHistory();
  const { isOwner } = useCommon();
  const { t } = useTranslation();
  const [collections, setCollections] = useState(null);
  const params = useParams();
  const { request } = useHttp();
  const { setOpenedUser, openedUser } = useContext(CommonContext);
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request(`/api/collections/user/${params.id}`);
      setOpenedUser({ id: fetched.ownerId, name: fetched.ownerName });
      setCollections(fetched.collections);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, params.id, history, setOpenedUser]);
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);
  if (!collections) {
    return <Loader />;
  }
  return (
    <div className="row content">
      <div className="col s12" style={{ fontSize: "24px" }}>
        {isOwner(openedUser.id) && (
          <div className="fixed-action-btn">
            <Link
              to="/addCollection"
              className="btn-floating btn-large indigo darken-1"
            >
              <Icon>add</Icon>
            </Link>
          </div>
        )}
      </div>
      <div className="col s12">
        <h3>{`${t("userPage")} ${openedUser.name}`}</h3>
        {!!collections.length ? (
          collections.map((item, index) => (
            <CollectionCard
              key={index}
              collection={item}
              setCollections={setCollections}
            />
          ))
        ) : (
          <div className="col s12">
            <h4
              className="center-align grey-text text-lighten-1"
              style={{ marginTop: "250px" }}
            >
             {t("nothing")}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserPage;
