import { React, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import {UserContext} from "../../context/user.context";
import { Link as FlatButton } from "@material-ui/core";
const SignInPage = () => {
  const user = useContext(UserContext)
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
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
      user.signIn(data.token, data.userId, data.userName)
      history.push("/");
    } catch (e) {}
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
          className="custom-input"
        />
        <label htmlFor="sign-in-name">Имя</label>
      </div>
      <div className="input-field col s12">
        <input
          id="sign-in-password"
          type="password"
          name="password"
          onChange={changeHandler}
          className="custom-input"
        />
        <label htmlFor="sign-in-password">Пароль</label>
      </div>
      <div className="col s12">
        <FlatButton
          className="btn-flat blue-grey-text text-darken-2 right flat-button"
          disabled={loading}
          onClick={signInHandler}
        >
          <i className="material-icons right">send</i>
          Вход
        </FlatButton>
        <Link to="/signUp">
          Нет аккаунта? Зарегистрируйтесь.
        </Link>
      </div>
    </div>
  );
};
export default SignInPage;
