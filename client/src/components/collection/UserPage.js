import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../technical/Loader";
import NotFound from "../technical/NotFound";
import { useHttp } from "../../hooks/http.hook";
import CollectionCard from "./CollectionCard";
const UserPage = () => {
  const [onLoad, setLoad] = useState(true);
  const [data, setData] = useState(null);
  const [isValid, setValid] = useState(true);
  const params = useParams();
  const { request } = useHttp();
  const fetchData = useCallback(async () => {
    try {
      const data = await request(`/api/content/${params.id}`, "GET");
      setValid(true);
      setData(data); 
      setLoad(false);
    } catch (e) {
        console.log(e.message);
      setValid(false);
      setLoad(false);
    }
  }, [request, params.id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (onLoad) {
    return <Loader />;
  }
  return <div className="row">{isValid ?
        (<div className="col s12">
            <h3>{`Страница пользователя ${data[0].ownerName}`}</h3>
            {
                data.map((item, index) => <CollectionCard key={index} content={item}/>)
            }
        </div>)
      : (<NotFound />)
      }</div>;
};
export default UserPage;
