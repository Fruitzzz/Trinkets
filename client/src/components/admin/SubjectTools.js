import { React, useState, useEffect, useCallback } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
const SubjectTools = () => {
  const message = useMessage();
  const { request, loading, clearError, error } = useHttp();
  const [pickedSubject, setPickedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const changeHandler = (event) => {
    setNewSubject(event.target.value);
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const pickSubjectHandler = (event) => {
    setPickedSubject(event.target.value);
  };

  const addHandler = async () => {
    try {
      const fetched = await request("/api/admin/addSubject", "POST", {
        name: newSubject,
      });
      setNewSubject("");
      setSubjects(fetched);
    } catch (e) {}
  };

  const deleteHandler = async () => {
    try {
      const fetched = await request("/api/admin/deleteSubject", "POST", {
        name: pickedSubject,
      });
      setPickedSubject("");
      setSubjects(fetched);
    } catch (e) {}
  };

  const fetchSubjects = useCallback(async () => {
    try {
      const fetched = await request("/api/collections/subjects");
      setSubjects(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <div className="col s12 l3 offset-l1">
      <div className=" input-field col s12">
        <input
          id="subject"
          value={newSubject}
          type="text"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="subject">Новая тема</label>
      </div>
      <div className="col s12">
        <Button variant="outlined" disabled={loading} onClick={addHandler}>
          Добавить тему коллекций
        </Button>
        <FormControl style={{ width: "100%", marginBottom: "15px" }}>
          <InputLabel>Тема</InputLabel>
          <Select
            name="subject"
            value={subjects.length === 0 ? "" : pickedSubject}
            onChange={pickSubjectHandler}
            className="custom-input"
            displayEmpty
          >
            {subjects.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" disabled={loading} onClick={deleteHandler}>
          Удалить выбранную тему
        </Button>
      </div>
    </div>
  );
};

export default SubjectTools;
