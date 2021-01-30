import { React, useContext, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { UserContext } from "../../context/user.context";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import {useTranslation} from "react-i18next";
import GoogleLogin from "react-google-login";
import VKLogin from "react-vk-auth";
import vk from "../../images/vk.png";
const SocialNetworks = () => {
  const { request, loading, error, clearError } = useHttp();
  const message = useMessage();
  const history = useHistory();
  const {t} = useTranslation();
  const { signIn } = useContext(UserContext);
  const responseGoogle = async (response) => {
    try {
      if (response.profileObj) {
        const user = await request("/api/auth/socialSignIn", "POST", {
          ...response.profileObj,
          id: response.profileObj.googleId,
          isSocial: true,
        });
        setUser(user);
      }
    } catch (e) {}
  };
  const responseVK = async (response) => {
    try {
      const user = await request("/api/auth/socialSignIn", "POST", {
        name: response.session.user.first_name,
        email: response.session.user.domain,
        id: response.session.user.id,
        isSocial: true,
      });
      setUser(user);
    } catch (e) {}
  };
  const setUser = (user) => {
    signIn(user);
    history.push("/");
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [message, error, clearError]);
  return (
    <div className="col s12 offset-s2 m4 offset-m5">
      <div className="col s12">
        <GoogleLogin
          clientId="30672436636-ae1i1pr466utp9mrjushg3aa98ghffp8.apps.googleusercontent.com"
          buttonText={t("signInGoogle")}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          disabled={loading}
          cookiePolicy={"single_host_origin"}
          className="social-btn"
        />
      </div>
      <div className="col s12" style={{ marginTop: "20px" }}>
        <VKLogin
          className="btn-flat vk-button social-btn"
          apiId="7744756"
          callback={responseVK}
        >
          <img
            alt="vk"
            src={vk}
            width="20px"
            style={{ margin: "5px 25px -2px -25px" }}
          />
          <span>{t("signInVK")}</span>
        </VKLogin>
      </div>
    </div>
  );
};
export default SocialNetworks;
