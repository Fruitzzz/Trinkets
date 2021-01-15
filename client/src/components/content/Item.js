import React from "react";
import { Icon } from "react-materialize";
const Item = () => {
  return (
    <li className="collection-item avatar">
      <Icon className="circle">attach_file</Icon>
      <span className="title">Title</span>
      <p>Collection:</p>
      <p>Tags:</p>
      <p className="right"><Icon >favorite_border</Icon>0</p>
      <Icon className="secondary-content">highlight_off</Icon>
    </li>
  );
};
export default Item;
