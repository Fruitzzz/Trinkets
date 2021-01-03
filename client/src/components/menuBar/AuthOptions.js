import React from 'react';
const AuthOptions = ({ isAuth }) => {
  if (isAuth) {
    return (
      <li>
        <button className="btn-flat">Выход</button>
      </li>
    );
  } else {
    return (
      <li>
          <button className="btn-flat modal-trigger" data-target="sign-in-modal">Вход</button>
         <button className="btn-flat modal-trigger" data-target="sign-up-modal">Регистрация</button>
      </li>
    );
  }
};
export default AuthOptions;
