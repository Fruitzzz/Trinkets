import React from "react";

const SignInModal = () => {
  return (
    <div id="sign-in-modal" className="modal">
      <div className="modal-content">
        <div className="row">
            <h4>Вход</h4>
          <div className="input-field col s6">
            <input id="sign-in-name" type="text" />
            <label htmlFor="sign-in-name">Имя</label>
          </div>
          <div className="input-field col s6">
            <input id="sign-in-password" type="password"/>
            <label htmlFor="sign-in-password">Пароль</label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-flat modal-close">
          <i className="material-icons left">cancel</i>
          Закрыть
        </button>
        <button className="btn-flat">
          <i className="material-icons right">send</i>
          Вход
        </button>
      </div>
    </div>
  );
};
export default SignInModal;
