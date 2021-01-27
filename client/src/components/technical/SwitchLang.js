import { React } from "react";
import { Link as FlatButton } from "@material-ui/core";
import { Icon } from "react-materialize";
import { useTranslation } from "react-i18next";
const SwitchLang = () => {
  const { t, i18n } = useTranslation();
  const savedLang = (lang) => {
    localStorage.setItem("lang", JSON.stringify({ type: lang }));
  };
  const switchHandler = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("ru");
      savedLang("ru");
    } else {
      i18n.changeLanguage("en");
      savedLang("en");
    }
  };
  return (
    <FlatButton onClick={switchHandler} className="nav-link flat-button">
      <Icon>language</Icon>
      {t("language")}
    </FlatButton>
  );
};
export default SwitchLang;
