import { React, useEffect, useState } from "react";
import { Icon } from "react-materialize";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { Link as FlatButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
const SignUpPage = () => {
  const history = useHistory();
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
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
      await request("/api/auth/signUp", "POST", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      history.push("/");
    } catch (e) {}
  };
  const comparePasswords = () => {
    return form.password !== form.confirmPassword || form.password === "";
  };
  return (
    <div className="row auth-form">
      <h2>{t("signUp")}</h2>
      <div className="input-field col s12">
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
      <div className="input-field col s12">
        <input
          value={form.email}
          id="sign-up-email"
          type="email"
          className="validate custom-input"
          name="email"
          onChange={changeHandler}
        />
        <label htmlFor="sign-up-email">Email</label>
      </div>
      <div className="input-field col s12">
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
      <div className="input-field col s12">
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
      <div className="col s12">
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
    </div>
  );
};
export default SignUpPage;
