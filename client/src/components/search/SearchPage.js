import { React, useEffect, useCallback, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../technical/Loader";
import Item from "../item/Item";
const SearchPage = () => {
  const params = useParams();
  const history = useHistory();
  const { request } = useHttp();
  const [searchResult, setSearchResult] = useState(null);
  const fetchSearchResults = useCallback(async () => {
    try {
      const fetched = await request(`/api/items/search/${params.searchText}`);
      setSearchResult(fetched);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, history, params.searchText]);
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);
  if (!searchResult) {
   return <Loader />;
  }
  return <div className="row content">
     <ul className="collection">
          {searchResult.map((item, index) => (
            <Item key={index} item={item} readOnly />
          ))}
        </ul>
  </div>;
};
export default SearchPage;
