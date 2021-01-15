import {React, useCallback, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Loader from "../technical/Loader";
import { useHttp } from "../../hooks/http.hook";
import CollectionCard from "./CollectionCard";
import Button from "@material-ui/core/Button";
const UserPage = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const params = useParams();
  const { request } = useHttp();
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request(`/api/collections/user/${params.id}`);
      setData(fetched);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, params.id, history]);
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);
  if (!data) {
    return <Loader />;
  }
  return (
    <div className="row content">
      <div className="col s12" style={{ fontSize: "24px" }}>
        <Link
          className="blue-grey-text text-darken-2 right"
          to="/addCollection"
        >
          <Button className="blue-border-btn" variant="outlined">Добавить коллекцию</Button>
        </Link>
      </div>
        <div className="col s12">
          <h3>{`Страница пользователя ${data.ownerName}`}</h3>
          {!!data.collections.length? (
            data.collections.map((item, index) => (
              <CollectionCard key={index} collection={item} />
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
