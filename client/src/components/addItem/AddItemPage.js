import { React, useContext } from "react";
import AddItemForm from "./AddItemForm";
import { useItem } from "../../hooks/item.hook";
import { UserContext } from "../../context/user.context";
const AddItemPage = () => {
    const {openedCollection, setOpenedCollection} = useContext(UserContext)
  return (
    <div className="row content">
      <div className="col s12">
          <button onClick={() => {
              console.log(openedCollection);
          }}>fasdfas</button>
      </div>
    </div>
  );
};
export default AddItemPage;
