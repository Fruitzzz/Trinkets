import { React, useCallback, useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import AddCollForm from "./AddCollForm";
import Button from "@material-ui/core/Button";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { CollectionContext } from "../../context/collection.context";
import { useCollection } from "../../hooks/collection.hook";
import { useHistory } from "react-router-dom";
const AddCollPage = () => {
  const history = useHistory();
  const [subjects, setSubjects] = useState([]);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const {
    editCollection,
    collection,
    addField,
    removeField,
    changeField,
  } = useCollection();

  const addHandler = async () => {
    try {
      await request("/api/collections/addNew", "POST", {
        ...collection,
      });
      history.push(`/profile/${collection.ownerId}`);
    } catch (e) {}
  };

  const fetchSubjects = useCallback(async () => {
    try {
      const fetched = await request("/api/collections/subjects");
      setSubjects(fetched.subjects);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

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
        subjects,
      }}
    >
      <div className="row content">
        <Dropzone />
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
