import { React, useEffect } from "react";
import "materialize-css";
import MenuBar from "./components/menuBar/MenuBar";
import "./style.css";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "./hooks/user.hook";
import { UserContext } from "./context/user.context";
const App = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const { user, signIn, logout} = useUser();
  return (
    <UserContext.Provider value={{
      signIn, logout, user, isAuthenticated: !!user.token
    }}>
      <Router>
        <div className="App">
          <MenuBar />
          <main>
            <div className="container">
              <Routes />
            </div>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
