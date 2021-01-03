import React from "react";
import Avatar from "@material-ui/core/Avatar";
import background from "../../images/UserBackground.jpg"
import { Link } from "@material-ui/core";
import AuthOptions from "./AuthOptions";
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
          <i className="material-icons blue-grey-text text-darken-2">search</i>
        </div>
      </li>
      {isAuth && (
        <li>
          <Link>
            <i className="material-icons">favorite</i>
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
          <label className="grey-text text-darken-1">
            <i className="material-icons">brightness_4</i>
            <input type="checkbox" />
            <span className="lever" />
            <i className="material-icons">brightness_5</i>
          </label>
        </div>
      </li>
      <li>
        <Link>
          <i className="material-icons">language</i>
          Английский
        </Link>
      </li>
    </ul>
  );
};
export default MobileMenu;
