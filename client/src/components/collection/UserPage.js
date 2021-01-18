import { React, useCallback, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Loader from "../technical/Loader";
import { useHttp } from "../../hooks/http.hook";
import CollectionCard from "./CollectionCard";
import { Icon } from "react-materialize";
const UserPage = () => {
  const history = useHistory();
  const [collections, setCollections] = useState(null);
  const [owner, setOwner] = useState(null);
  const params = useParams();
  const { request } = useHttp();
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request(`/api/collections/user/${params.id}`);
      setCollections(fetched.collections);
      setOwner(fetched.ownerName);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, params.id, history]);
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);
  if (!collections) {
    return <Loader />;
  }
  return (
    <div className="row content">
      <div className="col s12" style={{ fontSize: "24px" }}>
        <div className="fixed-action-btn">
          <Link
            to="/addCollection"
            className="btn-floating btn-large indigo darken-1"
          >
            <Icon>add</Icon>
          </Link>
        </div>
      </div>
      <div className="col s12">
        <h3>{`Страница пользователя ${owner}`}</h3>
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
              Тут пока ничего нет
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserPage;
