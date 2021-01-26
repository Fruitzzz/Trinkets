import { React, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import {Icon} from "react-materialize"
import { useMessage } from "../../hooks/message.hook";
import {UserContext} from "../../context/user.context";
import { Link as FlatButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
const SignInPage = () => {
  const user = useContext(UserContext)
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const { t } = useTranslation();
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const signInHandler = async () => {
    try {
      const data = await request("/api/auth/signIn", "POST", { ...form });
      user.signIn(data.token, data.userId, data.userName, data.isAdmin)
      history.push("/");
    } catch (e) {}
  };
  return (
    <div className="row auth-form">
      <h2>{t("signIn")}</h2>
      <div className="input-field col s12">
        <input
          id="sign-in-name"
          type="text"
          name="name"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-in-name">{t("name")}</label>
      </div>
      <div className="input-field col s12">
        <input
          id="sign-in-password"
          type="password"
          name="password"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-in-password">{t("password")}</label>
      </div>
      <div className="col s12">
        <FlatButton
          className="btn-flat right flat-button"
          disabled={loading}
          onClick={signInHandler}
        >
          <Icon className="right">send</Icon>
          {t("signIn")}
        </FlatButton>
        <Link to="/signUp">
         {t("offerToSignUp")}
        </Link>
      </div>
    </div>
  );
};
export default SignInPage;
