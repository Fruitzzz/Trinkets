import { React} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import SignUpPage from "./components/authentication/SignUpPage";
import SignInPage from "./components/authentication/SignInPage";
import UserPage from "./components/collection/UserPage";
import NotFound from "./components/technical/NotFound";
import AddCollPage from "./components/addCollection/AddCollPage";
import CollectionPage from "./components/collection/CollectionPage";
import ItemPage from "./components/item/ItemPage";
import AdminPage from "./components/admin/AdminPage";
import SearchPage from "./components/search/SearchPage";
export const useRoutes = (user) => {
  if (user.isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/collection/:id" component={CollectionPage} />
        <Route path="/profile/:id" component={UserPage} />
        <Route path="/notFound" component={NotFound} />
        <Route path="/addCollection" component={AddCollPage} />
        <Route path="/item/:id" component={ItemPage} />
        <Route path="/search/:searchText" component={SearchPage}/>
        {user.isAdmin && <Route path="/admin" component={AdminPage} />}
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/collection/:id" component={CollectionPage} />
      <Route path="/signUp" component={SignUpPage} />
      <Route path="/signIn" component={SignInPage} />
      <Route path="/notFound" component={NotFound} />
      <Route path="/profile/:id" component={UserPage} />
      <Route path="/item/:id" component={ItemPage} />
      <Route path="/search/:searchText" component={SearchPage}/>
      <Redirect to="/" />
    </Switch>
  );
};
