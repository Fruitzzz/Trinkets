import { React, Suspense} from "react";
import { HashRouter as Router } from "react-router-dom";
import { useUser } from "./hooks/user.hook";
import { UserContext } from "./context/user.context";
import { useRoutes } from "./Routes";
import { CommonContext } from "./context/common.context";
import { useCommon } from "./hooks/common.hook";
import { ThemeProvider } from "styled-components";
import {I18nextProvider} from "react-i18next"
import { useTheme } from "./hooks/theme.hook";
import MenuBar from "./components/menuBar/MenuBar";
import i18n from "./localization";
import GlobalStyle from "./components/technical/GlobalStyle";
import "./style.css";
import "materialize-css";
const App = () => {
  const theme = useTheme();
  const { user, signIn, logout } = useUser();
  const { openedUser, openUserHandler } = useCommon();
  const routes = useRoutes(user);
  return (
    <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
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
          <Suspense fallback={<></>}>
            <Router>
              <div className="App">
                <GlobalStyle />
                <MenuBar />
                <div className="container">{routes}</div>
              </div>
            </Router>
          </Suspense>
        </UserContext.Provider>
      </CommonContext.Provider>
    </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
