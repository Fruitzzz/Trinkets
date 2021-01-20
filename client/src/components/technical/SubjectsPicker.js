import {React, useState, useEffect, useCallback} from "react";
import { useHttp } from "../../hooks/http.hook";
import {FormControl,
    Select,
    MenuItem,
    InputLabel,} from "@material-ui/core";
const SubjectsPicker = ({value, changeHandler}) => {
    const { request} = useHttp();
    const [subjects, setSubjects] = useState([]);
    const fetchSubjects = useCallback(async () => {
        try {
          const fetched = await request("/api/collections/subjects");
          setSubjects(fetched.subjects);
        } catch (e) {}
      }, [request]);
    
      useEffect(() => {
        fetchSubjects();
      }, [fetchSubjects]);
      return (
        <FormControl style={{ width: "100%", marginBottom: "15px" }}>
        <InputLabel>Тема</InputLabel>
        <Select
          name="subject"
          value={subjects.length === 0? "" : value}
          onChange={changeHandler}
          className="custom-input"
          displayEmpty
        >
          {
            subjects.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
          }
        </Select>
      </FormControl>
      )
}
export default SubjectsPicker;