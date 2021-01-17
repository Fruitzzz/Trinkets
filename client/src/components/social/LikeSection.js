import {React} from "react";
import {Icon} from "react-materialize";
const LikeSection = ({likes}) => {
    return (
        <div className="col s12 m8 offset-m2">
        <Icon>favorite_border</Icon>
        <span
          style={{ verticalAlign: "top", fontSize: "16px" }}
        >{` ${likes.length}`}</span>
        <p className="right flow-text">Комментарии</p>
      </div>
    )
}
export default LikeSection