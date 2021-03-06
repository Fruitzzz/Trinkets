import { React, useContext } from "react";
import { Icon } from "react-materialize";
import { UserContext } from "../../context/user.context";
import {useMessage} from "../../hooks/message.hook";
import {useTranslation} from "react-i18next";
const LikeSection = ({ likes, socket }) => {
  const message = useMessage();
  const { user } = useContext(UserContext);
  const {t} = useTranslation();
  const clickHandler = () => {
    if(user.isAuthenticated) {
    socket.emit("like", user.id);
    }
    else {
      message("needAuth");
    }
  };
  return (
    <div className="col s12 m8 offset-m2">
      <Icon
        className={likes.includes(user.id) ? "red-text" : null}
        onClick={clickHandler}
      >
        {likes.includes(user.id) ? "favorite" : "favorite_border"}
      </Icon>
      <span
        style={{ verticalAlign: "top", fontSize: "16px" }}
      >{` ${likes.length}`}</span>
      <p className="right flow-text">{t("comments")}</p>
    </div>
  );
};
export default LikeSection;
