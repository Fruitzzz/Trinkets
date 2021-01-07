import { React, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import MobileMenu from "./MobileMenu";
import { Dropdown, Icon } from "react-materialize";
import { Link } from "react-router-dom";
import { Link as FlatButton } from "@material-ui/core";
import {UserContext} from "../../context/user.context";
const MenuBar = () => {
  const {logout, user, isAuthenticated} = useContext(UserContext);
  return (
    <nav>
      <div className="nav-wrapper white z-depth-3">
        <Link to="/">
        <span className="brand-logo blue-grey-text text-darken-2">
          Trinkets
        </span>
        </Link>
        <a href="!#" data-target="mobile" className="sidenav-trigger">
          <Icon className="blue-grey-text">menu</Icon>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <div className="switch">
              <label className="blue-grey-text text-darken-2">
                <Icon>brightness_4</Icon>
                <input type="checkbox" />
                <span className="lever"></span>
                <Icon>brightness_5</Icon>
              </label>
            </div>
          </li>
          <li>
            {isAuthenticated ? (
              <FlatButton className="blue-grey-text text-darken-2 nav-link" onClick={logout}>
                Выход
              </FlatButton>
            ) : (
              <Link
                className="blue-grey-text text-darken-2 nav-link"
                to="/signIn"
              >
                Вход
              </Link>
            )}
          </li>
          <li>
            {isAuthenticated ? (
              <Dropdown
                trigger={
                  <Avatar className=" avatar avatar-desk red lighten-2">
                    {user.name[0]}
                  </Avatar>
                }
              >
                <Link className="blue-grey-text text-darken-2 nav-link" to="/profile">
                  <Icon className="blue-grey-text text-darken-2">favorite</Icon>
                  Моя коллекция
                </Link>
                <FlatButton className="blue-grey-text text-darken-2 nav-link">
                  <Icon className="blue-grey-text text-darken-2">language</Icon>
                  Английский
                </FlatButton>
              </Dropdown>
            ) : (
              <Link
                className="blue-grey-text text-darken-2 nav-link"
                to="/signUp"
              >
                Регистрация
              </Link>
            )}
          </li>
        </ul>
        <form className=" hide-on-med-and-down search-form">
          <div className="input-field">
            <input
              id="search"
              type="search"
              className="search"
              placeholder="Начните печатать"
            />
            <Icon className="blue-grey-text text-darken-2">search</Icon>
          </div>
        </form>
      </div>
      <MobileMenu isAuth={isAuthenticated} />
    </nav>
  );
};
export default MenuBar;
