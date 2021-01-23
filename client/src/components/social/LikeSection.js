import { React, useContext } from "react";
import { Icon } from "react-materialize";
import { UserContext } from "../../context/user.context";
import {useMessage} from "../../hooks/message.hook";
const LikeSection = ({ likes, socket }) => {
  const message = useMessage();
  const { user } = useContext(UserContext);
  const clickHandler = () => {
    if(user.isAuthenticated) {
    socket.emit("like", user.id);
    }
    else {
      message("Необходима авторизация");
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
      <p className="right flow-text">Комментарии</p>
    </div>
  );
};
export default LikeSection;
