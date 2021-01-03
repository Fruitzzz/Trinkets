import React from "react";
import Avatar from "@material-ui/core/Avatar";
import background from "../../images/UserBackground.jpg"
import { Link } from "@material-ui/core";
import AuthOptions from "./AuthOptions";
import { Icon } from "react-materialize";
const MobileMenu = ({ isAuth }) => {
  return (
    <ul className="sidenav" id="mobile">
      <li>
        <div className="user-view">
          <div className="background">
            <img alt="back" src={background}></img>
          </div>
          <Avatar className=" avatar red lighten-2">A</Avatar>
          <span className="name">Name</span>
          <span>{"Количество элементов: 30"}</span>
        </div>
      </li>
      <li>
        <div className="input-field">
          <input
            className="search"
            type="search"
            placeholder="Начните печатать.."
          />
          <Icon className="blue-grey-text text-darken-2">search</Icon>
        </div>
      </li>
      {isAuth && (
        <li>
          <Link>
            <Icon>favorite</Icon>
            Моя коллекция
          </Link>
        </li>
      )}
      <AuthOptions isAuth={isAuth} />
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <div className="switch">
          <label className="blue-grey-text text-darken-2">
            <Icon>brightness_4</Icon>
            <input type="checkbox" />
            <span className="lever" />
            <Icon>brightness_5</Icon>
          </label>
        </div>
      </li>
      <li>
        <Link>
          <Icon>language</Icon>
          Английский
        </Link>
      </li>
    </ul>
  );
};
export default MobileMenu;
