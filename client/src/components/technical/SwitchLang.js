import {React} from "react";
import { Link as FlatButton } from "@material-ui/core";
import {Icon} from "react-materialize";
import {useTranslation} from "react-i18next";
const SwitchLang = () => {
    const {t, i18n} = useTranslation();
    const switchHandler = () => {
        i18n.language === "en"? i18n.changeLanguage("ru") : i18n.changeLanguage("en");
    }
    return (
        <FlatButton onClick={switchHandler} className="nav-link flat-button">
        <Icon>language</Icon>
        {t("language")}
      </FlatButton>
    )
}
export default SwitchLang;