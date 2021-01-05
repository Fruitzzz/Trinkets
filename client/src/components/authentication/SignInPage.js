import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignInPage = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <div className="row auth-form">
      <h2>Вход</h2>
      <div className="input-field col s12">
        <input
          id="sign-in-name"
          type="text"
          name="name"
          onChange={changeHandler}
        />
        <label htmlFor="sign-in-name">Имя</label>
      </div>
      <div className="input-field col s12">
        <input
          id="sign-in-password"
          type="password"
          name="password"
          onChange={changeHandler}
        />
        <label htmlFor="sign-in-password">Пароль</label>
      </div>
      <div className="col s12">
        <Link to="/">
          <button className="btn-flat right">
            <i className="material-icons right">send</i>
            Вход
          </button>
        </Link>
        <Link to="/">Нет аккаунта? Зарегистрируйтесь.</Link>
      </div>
    </div>
  );
};
export default SignInPage;
