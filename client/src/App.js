import { React, useEffect } from "react";
import "materialize-css";
import MenuBar from "./components/menuBar/MenuBar";
import "./style.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "./hooks/user.hook";
import { UserContext } from "./context/user.context";
import {useRoutes} from "./Routes";
import { CommonContext } from "./context/common.context";
import {useCommon} from "./hooks/common.hook";
const App = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const { user, signIn, logout} = useUser();
  const {openedUser, openUserHandler, swapTheme, theme} = useCommon();
  const routes = useRoutes(user);
  return (
    <CommonContext.Provider value={{
      openedUser,
      setOpenedUser: openUserHandler,
      theme,
      swapTheme
    }}>
    <UserContext.Provider value={{
      signIn, logout, user
    }}>
      <Router>
        <div className="App">
          <MenuBar />
            <div className="container">
              {routes}
            </div>
        </div>
      </Router>
    </UserContext.Provider>
    </CommonContext.Provider>
  );
};

export default App;
