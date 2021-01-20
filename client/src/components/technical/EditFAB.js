import { React, useState, useEffect } from "react";
import { Icon } from "react-materialize";
import RemoveAlert from "./RemoveAlert";
import M from "materialize-css";
const EditFAB = ({ updateHandler, deleteHandler, loading,}) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    M.FloatingActionButton.init(document.querySelector(".fixed-action-btn"));
  });
  return (
    <div className="fixed-action-btn">
      <button className="btn-floating btn-large indigo darken-1">
        <Icon>build</Icon>
      </button>
      <ul>
        <li>
          <button
            className="btn-floating indigo darken-1"
            onClick={handleOpenModal}
          >
            <Icon>delete</Icon>
          </button>
        </li>
        <li>
          <button className="btn-floating indigo darken-1" onClick={() => {
            updateHandler(true);
          }}>
            <Icon>mode_edit</Icon>
          </button>
        </li>
      </ul>
      <RemoveAlert
        open={open}
        setOpen={setOpen}
        loading={loading}
        onAccept={deleteHandler}
      />
    </div>
  );
};
export default EditFAB;
