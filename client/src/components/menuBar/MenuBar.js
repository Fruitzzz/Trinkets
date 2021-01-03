import { React} from "react";
import Avatar from "@material-ui/core/Avatar";
import MobileMenu from "./MobileMenu";
import AuthOptions from "./AuthOptions";
import { Dropdown } from "react-materialize";
import { Link } from "@material-ui/core";
const MenuBar = () => {
  /* const [switchLang, setLang] = useState(false);
  const handleChange = (event) => {
    setLang(event.target.checked);
  };*/
  
  const isAuth = false;
  return (
    <nav>
      <div className="nav-wrapper white z-depth-3">
        <span className="brand-logo blue-grey-text text-darken-2">
          Trinkets
        </span>
        <a href="!#" data-target="mobile" className="sidenav-trigger">
          <i className="material-icons blue-grey-text">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <div className="switch">
              <label className="blue-grey-text text-darken-2">
                <i className="material-icons">brightness_4</i>
                <input type="checkbox" />
                <span className="lever"></span>
                <i className="material-icons">brightness_5</i>
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
                  <i className="material-icons blue-grey-text text-darken-2">
                    favorite
                  </i>
                  Моя коллекция
                </Link>
                <Link className="blue-grey-text text-darken-2">
                  <i className="material-icons blue-grey-text text-darken-2">
                    language
                  </i>
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
            <i className="material-icons blue-grey-text text-darken-2">
              search
            </i>
          </div>
        </form>
      </div>
      <MobileMenu isAuth={isAuth}/>
    </nav>
  );
};
export default MenuBar;
