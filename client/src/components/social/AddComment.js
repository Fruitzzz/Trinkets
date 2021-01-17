import { React,  useContext, useState } from "react";
import {UserContext} from "../../context/user.context";
const AddComment = () => {
    const {user} = useContext(UserContext);
    const [comment, setComment] = useState({
        author: user.name,
        authorId: user.id,
        text: ""
    });
    const changeHandler = (event) => {
        setComment({...comment, text: event.target.value});
    }
  return (
    <div className="input-field col s12 m8 offset-m2">
      <textarea
        value={comment.text}
        id="comment-input"
        className="materialize-textarea custom-input"
        onChange={changeHandler}
      />
      <label htmlFor="comment-input">Оставьте комментарий</label>
    </div>
  );
};
export default AddComment;

