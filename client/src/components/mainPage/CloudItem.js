import React from "react";

const CloudItem = (props) => {
  return (
    <div
      {...props}
      onClick={() => {
        alert(props.title);
      }}
    >
      {props.title}
    </div>
  );
};
export default CloudItem;
