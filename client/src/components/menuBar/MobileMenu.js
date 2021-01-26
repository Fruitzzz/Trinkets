import { React, useContext } from "react";
import { Icon, SideNav } from "react-materialize";
import { UserContext } from "../../context/user.context";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import background from "../../images/UserBackground.jpg";
import SearchForm from "../search/SearchForm";
import SwitchTheme from "../technical/SwitchTheme";
import SwitchLang from "../technical/SwitchLang";
import { useTranslation } from "react-i18next";
const MobileMenu = () => {
  const { logout, user } = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <SideNav
      id="mobile"
      options={{
        draggable: true,
      }}
      trigger={<></>}
    >
      {user.isAuthenticated && (
        <li>
          <div className="user-view">
            <div className="background">
              <img alt="back" src={background}></img>
            </div>
            <Avatar className="avatar indigo darken-1">{user.name[0]}</Avatar>
            <span className="name">{user.name}</span>
          </div>
        </li>
      )}
      <li>
        <SearchForm />
      </li>
      <li>
        {user.isAuthenticated ? (
          <Link className="sidenav-close" to={`/profile/${user.id}`}>
            <Icon>favorite</Icon>
            {t("favorite")}
          </Link>
        ) : (
          <Link className="nav-link sidenav-close" to="/signIn">
            {t("signIn")}
          </Link>
        )}
      </li>
      <li>
        {user.isAuthenticated ? (
          <Link className="nav-link sidenav-close" to="/" onClick={logout}>
            {t("logout")}
          </Link>
        ) : (
          <Link className="nav-link sidenav-close" to="/signUp">
            {t("signUp")}
          </Link>
        )}
      </li>
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <SwitchTheme />
      </li>
      <li>
        <SwitchLang />
      </li>
    </SideNav>
  );
};
export default MobileMenu;
