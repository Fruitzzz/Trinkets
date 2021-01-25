import { React, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "./hooks/user.hook";
import { UserContext } from "./context/user.context";
import { useRoutes } from "./Routes";
import { CommonContext } from "./context/common.context";
import { useCommon } from "./hooks/common.hook";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/theme.hook";
import MenuBar from "./components/menuBar/MenuBar";
import GlobalStyle from "./components/technical/GlobalStyle";
import "./style.css";
import "materialize-css";
const App = () => {
  const theme  = useTheme();
  const { user, signIn, logout } = useUser();
  const { openedUser, openUserHandler } = useCommon();
  const routes = useRoutes(user);
  useEffect(() => {
    window.M.AutoInit();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CommonContext.Provider
        value={{
          openedUser,
          setOpenedUser: openUserHandler,
        }}
      >
        <UserContext.Provider
          value={{
            signIn,
            logout,
            user,
          }}
        >
          <Router>
            <div className="App">
              <GlobalStyle />
              <MenuBar />
              <div className="container">{routes}</div>
            </div>
          </Router>
        </UserContext.Provider>
      </CommonContext.Provider>
    </ThemeProvider>
  );
};

export default App;
