import React from "react";
import TagCloud from "react-tag-cloud";
import randomColor from "randomcolor";
import CloudItem from "./CloudItem";
const Cloud = () => {
  const data = ["Алкоголь", "Марки", "Карточки", "Крышки"];
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
      {data.map((item, index) => {
        return <CloudItem key={index} title={item} />;
      })}
    </TagCloud>
  );
};
export default Cloud;
