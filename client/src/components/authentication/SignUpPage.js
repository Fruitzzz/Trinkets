import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { Link as FlatButton } from "@material-ui/core";
const SignUpPage = () => {
  const history = useHistory();
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
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
      <h2>Регистрация</h2>
      <div className="input-field col s12">
        <input
          value={form.name}
          id="sign-up-name"
          type="text"
          name="name"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-up-name">Имя</label>
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
        <label htmlFor="sign-up-password">Пароль</label>
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
        <label htmlFor="sign-up-confirm">Повторить пароль</label>
      </div>
      <div className="col s12">
        <FlatButton
          className="btn-flat blue-grey-text text-darken-2 right"
          disabled={comparePasswords() || loading}
          onClick={signUpHandler}
        >
          <i className="material-icons right">send</i>
          Регистрация
        </FlatButton>
        <Link to="/signIn">Уже есть аккаунт? Войдите.</Link>
      </div>
    </div>
  );
};
export default SignUpPage;
