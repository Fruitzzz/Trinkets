import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignUpPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
        />
        <label htmlFor="sign-up-name">Имя</label>
      </div>
      <div className="input-field col s12">
        <input
          value={form.email}
          id="sign-up-email"
          type="email"
          className="validate"
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
        />
        <label htmlFor="sign-up-confirm">Повторить пароль</label>
      </div>
      <div className="col s12">
        <button className="btn-flat right" disabled={comparePasswords()}>
          <i className="material-icons right">send</i>
          Регистрация
        </button>
        <Link to="/">Уже есть аккаунт? Войдите.</Link>
      </div>
    </div>
  );
};
export default SignUpPage;
