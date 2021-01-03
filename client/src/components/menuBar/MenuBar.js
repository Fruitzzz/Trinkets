import { React} from "react";
import Avatar from "@material-ui/core/Avatar";
import MobileMenu from "./MobileMenu";
import AuthOptions from "./AuthOptions";
import { Dropdown, Icon } from "react-materialize";
import { Link } from "@material-ui/core";
const MenuBar = () => {  
  const isAuth = false;
  return (
    <nav>
      <div className="nav-wrapper white z-depth-3">
        <span className="brand-logo blue-grey-text text-darken-2">
          Trinkets
        </span>
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
          <AuthOptions isAuth={isAuth} />
          <li>
            {isAuth && (
              <Dropdown
                trigger={
                  <Avatar className=" avatar avatar-desk red lighten-2">
                    A
                  </Avatar>
                }
              >
                <Link className="blue-grey-text text-darken-2">
                  <Icon className="blue-grey-text text-darken-2">
                    favorite
                  </Icon>
                  Моя коллекция
                </Link>
                <Link className="blue-grey-text text-darken-2">
                  <Icon className="blue-grey-text text-darken-2">
                    language
                  </Icon>
                  Английский
                </Link>
              </Dropdown>
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
            <Icon className="blue-grey-text text-darken-2">
              search
            </Icon>
          </div>
        </form>
      </div>
      <MobileMenu isAuth={isAuth}/>
    </nav>
  );
};
export default MenuBar;
