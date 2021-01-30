import { React, useEffect, useState, useContext } from "react";
import { Icon } from "react-materialize";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { UserContext } from "../../context/user.context";
import { Link as FlatButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import SocialNetworks from "./SocialNetworks";
const SignUpPage = () => {
  const history = useHistory();
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const { signIn } = useContext(UserContext);
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const signUpHandler = async () => {
    try {
      const user = await request("/api/auth/signUp", "POST", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      signIn(user);
      history.push("/");
    } catch (e) {}
  };
  const comparePasswords = () => {
    return form.password !== form.confirmPassword || form.password === "";
  };
  return (
    <div className="row auth-form">
      <div className="col s12 m6 offset-m3">
      <h2>{t("signUp")}</h2>
      </div>
      <div className="input-field col s12 m6 offset-m3">
        <input
          value={form.name}
          id="sign-up-name"
          type="text"
          name="name"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-up-name">{t("name")}</label>
      </div>
      <div className="input-field col s12 m6 offset-m3">
        <input
          value={form.email}
          id="sign-up-email"
          type="email"
          className="custom-input"
          name="email"
          onChange={changeHandler}
        />
        <label htmlFor="sign-up-email">Email</label>
      </div>
      <div className="input-field col s12 m6 offset-m3">
        <input
          value={form.password}
          id="sign-up-password"
          type="password"
          name="password"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-up-password">{t("password")}</label>
      </div>
      <div className="input-field col s12 m6 offset-m3">
        <input
          value={form.confirmPassword}
          id="sign-up-confirm"
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-up-confirm">{t("repeatPassword")}</label>
      </div>
      <div className="col s12 m6 offset-m3">
        <FlatButton
          className="btn-flat right"
          disabled={comparePasswords() || loading}
          onClick={signUpHandler}
        >
          <Icon className="right">send</Icon>
          {t("signUp")}
        </FlatButton>
        <Link to="/signIn">{t("offerToSignIn")}</Link>
      </div>
      <SocialNetworks />
    </div>
  );
};
export default SignUpPage;
