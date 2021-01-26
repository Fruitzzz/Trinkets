import React from "react";
import {Link} from "react-router-dom"
const CloudItem = (props) => {
  return (
    <Link to={`/search/${props.title}`}>
    <div
      {...props}
    >
      {props.title}
    </div>
    </Link>
  );
};
export default CloudItem;
