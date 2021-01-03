import React from "react";

const SignUpModal = () => {
  return (
    <div id="sign-up-modal" className="modal">
      <div className="modal-content">
          <div className="row">
          <h4>Регистрация</h4>
        <div className="input-field col s12">
          <input id="sign-up-name" type="text" />
          <label htmlFor="sign-up-name">Имя</label>
        </div>
        <div className="input-field col s12">
          <input id="sign-up-email" type="email" className="validate" />
          <label htmlFor="sign-up-email">Email</label>
        </div>
        <div className="input-field col s6">
          <input id="sign-up-password" type="password"/>
          <label htmlFor="sign-up-password">Пароль</label>
        </div>
        <div className="input-field col s6">
          <input id="sign-up-confirm" type="password"/>
          <label htmlFor="sign-up-confirm">Повторить пароль</label>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-flat modal-close">
          <i className="material-icons left">cancel</i>
          Закрыть
        </button>
        <button className="btn-flat">
          <i className="material-icons right">send</i>
          Регистрация
        </button>
      </div>
      </div>
    </div>
  );
};
export default (SignUpModal);
