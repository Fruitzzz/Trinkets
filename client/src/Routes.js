import React from "react";
import MainPage from "./components/mainPage/MainPage";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUpPage from "./components/authentication/SignUpPage";
import SignInPage from "./components/authentication/SignInPage";
import UserPage from "./components/content/UserPage";
import NotFound from "./components/technical/NotFound";
import AddCollPage from "./components/addCollection/AddCollPage";
import Collection from "./components/content/Collection";
import AddItemPage from "./components/addItem/AddItemPage";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/collection/:id">
        <Collection/>
      </Route>
      <Route path="/signUp">
        <SignUpPage />
      </Route>
      <Route path="/signIn">
        <SignInPage />
      </Route>
      <Route path="/profile/:id">
        <UserPage/>
      </Route>
      <Route path="/notFound">
        <NotFound/>
      </Route>
      <Route path="/addCollection">
        <AddCollPage/>
      </Route>
      <Route path="/addItem">
      <AddItemPage/>
      </Route>
      <Redirect to="/notFound"/>
    </Switch>
  );
};
export default Routes;
