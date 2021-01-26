import { React, useContext } from "react";
import { Dropdown, Icon } from "react-materialize";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import SearchForm from "../search/SearchForm";
import Avatar from "@material-ui/core/Avatar";
import MobileMenu from "./MobileMenu";
import SwitchTheme from "../technical/SwitchTheme";
import SwitchLang from "../technical/SwitchLang";
import { useTranslation } from "react-i18next";
const MenuBar = () => {
  const { logout, user } = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <nav>
      <div className="nav-wrapper  z-depth-3">
        <Link to="/">
          <span className="brand-logo">Trinkets</span>
        </Link>
        <Icon data-target="mobile" className="sidenav-trigger hide-on-large">
          menu
        </Icon>
        <ul className="right hide-on-med-and-down">
          <li>
            <SwitchTheme />
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
                <Link className="nav-link" to={`/profile/${user.id}`}>
                  <Icon>favorite</Icon>
                  {t("favorite")}
                </Link>
                {user.isAdmin && (
                  <Link className="nav-link" to="/admin">
                    <Icon>stars</Icon>
                    {t("admin")}
                  </Link>
                )}
                <SwitchLang />
                <Link className="nav-link" to="/" onClick={logout}>
                  <Icon>exit_to_app</Icon>
                  {t("logout")}
                </Link>
              </Dropdown>
            ) : (
              <Dropdown
                trigger={<Avatar className=" avatar avatar-desk grey"></Avatar>}
              >
                <Link className="nav-link" to="/signIn">
                  <Icon>arrow_forward</Icon>
                  {t("signIn")}
                </Link>
                <Link className="nav-link" to="/signUp">
                  <Icon>person_add</Icon>
                  {t("signUp")}
                </Link>
                <SwitchLang />
              </Dropdown>
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
