import { React, useEffect,} from "react";
import Dropzone from "../technical/Dropzone";
import AddCollForm from "./AddCollForm";
import Button from "@material-ui/core/Button";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { CollectionContext } from "../../context/collection.context";
import { useCollection } from "../../hooks/collection.hook";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
const AddCollPage = () => {
  const history = useHistory();
  const { loading, request, error, clearError } = useHttp();
  const { t } = useTranslation();
  const message = useMessage();
  const {
    editCollection,
    collection,
    addField,
    deleteField,
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
        deleteField,
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
            {t("addCollection")}
          </Button>
        </div>
      </div>
    </CollectionContext.Provider>
  );
};

export default AddCollPage;
