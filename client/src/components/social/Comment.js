import {React} from "react";
import Avatar from "@material-ui/core/Avatar";
const Comment = ({comment}) => {
    return (<div className="col s12 m8 offset-m2">
    <div className="row valign-wrapper">
      <div className="col s2 m1">
        <Avatar className="comment-avatar">{comment.author[0]}</Avatar>
      </div>
      <div className="col s10 m11">
        <span className="comment-author">{comment.author}</span>
        <p style={{ marginTop: "5px" }}>
          {comment.text}
        </p>
      </div>
    </div>
  </div>)
}
export default Comment;