import {React} from "react";
import Avatar from "@material-ui/core/Avatar";
const Comment = () => {
    return (<div className="col s12 m8 offset-m2">
    <div className="row valign-wrapper">
      <div className="col s2 m1">
        <Avatar className="comment-avatar">A</Avatar>
      </div>
      <div className="col s10 m11">
        <span>Author</span>
        <p className="black-text" style={{ marginTop: "5px" }}>
          Textcomment-avatarcomment-avatarcomment-avatarcomment-avatarcomment-avatar
        </p>
      </div>
    </div>
  </div>)
}
export default Comment;