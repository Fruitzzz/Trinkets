import {React, useContext} from "react";
import { Icon } from "react-materialize";
import {UserContext} from "../../context/user.context";
import { Link } from "react-router-dom";
import {Link as FlatButton} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import background from "../../images/UserBackground.jpg";
import SearchForm from "../search/SearchForm";
import SwitchTheme from "../technical/SwithTheme";
const MobileMenu = () => {
  const {logout, user} = useContext(UserContext);
  return (
    <ul className="sidenav" id="mobile">
      {user.isAuthenticated && (
      <li>
        <div className="user-view">
          <div className="background">
            <img alt="back" src={background}></img>
          </div>
          <Avatar className="avatar indigo darken-1">{user.name[0]}</Avatar>
          <span className="name">{user.name}</span>
        </div>
      </li>)
}
      <li>
        <SearchForm/>
      </li>
      <li>
        {user.isAuthenticated ? (
          <Link className="sidenav-close" to={`/profile/${user.id}`}>
            <Icon >favorite</Icon>
            Моя коллекция
          </Link>
        ) : (
          <Link className="nav-link sidenav-close" to="/signIn">
            Вход
          </Link>
        )}
      </li>
      <li>
        {user.isAuthenticated ? (
          <Link className="nav-link sidenav-close" to="/" onClick={logout}>Выход</Link>
        ) : (
          <Link className="nav-link sidenav-close" to="/signUp">
            Регистрация
          </Link>
        )}
      </li>
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <SwitchTheme/>
      </li>
      <li>
        <FlatButton className="flat-button">
          <Icon>language</Icon>
          Английский
        </FlatButton>
      </li>
    </ul>
  );
};
export default MobileMenu;
