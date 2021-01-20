import { React, useEffect,} from "react";
import Dropzone from "../technical/Dropzone";
import AddCollForm from "./AddCollForm";
import Button from "@material-ui/core/Button";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { CollectionContext } from "../../context/collection.context";
import { useCollection } from "../../hooks/collection.hook";
import { useHistory } from "react-router-dom";
const AddCollPage = () => {
  const history = useHistory();
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const {
    editCollection,
    collection,
    addField,
    removeField,
    changeField,
    setImage,
  } = useCollection();

  const addHandler = async () => {
    try {
      await request("/api/collections/addNewCollection", "POST", {
        ...collection,
      });
      history.push(`/profile/${collection.ownerId}`);
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <CollectionContext.Provider
      value={{
        editCollection,
        collection,
        addField,
        removeField,
        changeField,
        setImage,
      }}
    >
      <div className="row content">
        <Dropzone setImage={setImage}/>
        <AddCollForm />
        <div className="col s12">
          <Button
            variant="outlined"
            className="blue-border-btn"
            style={{ width: "100%", marginTop: "25px" }}
            onClick={addHandler}
            disabled={loading}
          >
            Добавить коллекцию
          </Button>
        </div>
      </div>
    </CollectionContext.Provider>
  );
};

export default AddCollPage;
