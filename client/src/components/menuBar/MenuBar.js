import { React, useContext} from "react";
import { Dropdown, Icon} from "react-materialize";
import { Link } from "react-router-dom";
import { Link as FlatButton } from "@material-ui/core";
import { UserContext } from "../../context/user.context";
import SearchForm from "../search/SearchForm";
import Avatar from "@material-ui/core/Avatar";
import MobileMenu from "./MobileMenu";
import SwitchTheme from "../technical/SwithTheme";
const MenuBar = () => {
  const { logout, user } = useContext(UserContext);
  return (
    <nav>
      <div className="nav-wrapper  z-depth-3">
        <Link to="/">
          <span className="brand-logo">
            Trinkets
          </span>
        </Link>
        <a href="!#" data-target="mobile" className="sidenav-trigger">
          <Icon>menu</Icon>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
           <SwitchTheme/>
          </li>
          <li>
            {user.isAuthenticated ? (
              <Link
                className="nav-link"
                to="/"
                onClick={logout}
              >
                Выход
              </Link>
            ) : (
              <Link
                className="nav-link"
                to="/signIn"
              >
                Вход
              </Link>
            )}
          </li>
          <li>
            {user.isAuthenticated ? (
              <Dropdown
                trigger={
                  <Avatar className=" avatar avatar-desk indigo darken-1">
                    {user.name[0]}
                  </Avatar>
                }
              >
                <Link
                  className="nav-link"
                  to={`/profile/${user.id}`}
                >
                  <Icon>favorite</Icon>
                  Моя коллекция
                </Link>
                {user.isAdmin && (
                  <Link
                    className="nav-link"
                    to="/admin"
                  >
                    <Icon>stars</Icon>
                    Админ
                  </Link>
                )}
                <FlatButton className="nav-link flat-button">
                  <Icon>language</Icon>
                  Английский
                </FlatButton>
              </Dropdown>
            ) : (
              <Link
                className="nav-link"
                to="/signUp"
              >
                Регистрация
              </Link>
            )}
          </li>
        </ul>
        <form className="hide-on-med-and-down search-form">
          <SearchForm />
        </form>
      </div>
      <MobileMenu />
    </nav>
  );
};
export default MenuBar;
