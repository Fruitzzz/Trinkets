import {React, useEffect} from "react";
import M from "materialize-css/dist/js/materialize";
import 'materialize-css';
import MenuBar from  './components/menuBar/MenuBar';
import './style.css';
import SignInModal from "./components/menuBar/SignInModal";
import SignUpModal from "./components/menuBar/SignUpModal";
import MainPage from "./components/mainPage/MainPage";
const  App = () => {
  useEffect(() => {
   M.AutoInit()
  });
  return (
    <div className="App">
      <MenuBar/>
      <MainPage/>
      <SignInModal/>
      <SignUpModal/>
    </div>
  );
}

export default App;
