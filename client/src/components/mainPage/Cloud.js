import {React, useState, useCallback, useEffect} from "react";
import TagCloud from "react-tag-cloud";
import randomColor from "randomcolor";
import CloudItem from "./CloudItem";
import { useHttp } from "../../hooks/http.hook";
const Cloud = () => {
  const { request } = useHttp();
  const [tags, setTags] = useState([]);
  const fetchTags = useCallback(async () => {
    try {
      const fetched = await request("/api/items/tags");
      setTags(fetched);
    }
    catch(e) {}
  }, [request])
  useEffect(() => {
    fetchTags();
  }, [fetchTags])
  return (
    <TagCloud
      className="tag-cloud"
      style={{
        fontFamily: "sans-serif",
        fontSize: 20,
        color: () => randomColor(),
        padding: 5,
        fontWeight: "bold",
      }}
    >
      {tags.map((item, index) => {
        return <CloudItem key={index} title={item.tag} />;
      })}
    </TagCloud>
  );
};
export default Cloud;
