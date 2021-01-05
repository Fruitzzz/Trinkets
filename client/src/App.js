import { React, useEffect } from "react";
import M from "materialize-css/dist/js/materialize";
import "materialize-css";
import MenuBar from "./components/menuBar/MenuBar";
import "./style.css";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
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
  );
};

export default App;
