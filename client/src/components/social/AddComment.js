import { React, useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import Button from "@material-ui/core/Button";
import { useMessage } from "../../hooks/message.hook";
import {useTranslation} from "react-i18next";
const AddComment = ({ socket }) => {
  const { user } = useContext(UserContext);
  const {t} = useTranslation();
  const [comment, setComment] = useState({
    author: user.name,
    authorId: user.id,
    text: "",
  });
  const message = useMessage();
  const changeHandler = (event) => {
    setComment({ ...comment, text: event.target.value });
  };
  const clickHandler = () => {
    if (comment.text.trim().length !== 0) socket.emit("addComment", comment);
    else message("Введите текст комментария");
    setComment({...comment, text: ""});
  };
  return (
    <div className="input-field col s12 m8 offset-m2">
      <textarea
        value={comment.text}
        id="comment-input"
        className="materialize-textarea custom-input"
        onChange={changeHandler}
      />
      <label htmlFor="comment-input">{t("leaveComment")}</label>
      <Button
        variant="outlined"
        className="blue-border-btn left"
        onClick={clickHandler}
      >
        {t("post")}
      </Button>
    </div>
  );
};
export default AddComment;
