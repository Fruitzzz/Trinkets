import React from "react";
import { Icon } from "react-materialize";
const CollectItem = () => {
  return (
    <li className="collection-item avatar">
      <Icon className="circle">attach_file</Icon>
      <span className="title">Title</span>
      <p>Collection:</p>
      <p>Tags:</p>
    </li>
  );
};
export default CollectItem;
