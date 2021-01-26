import React from "react";
import {useTranslation} from "react-i18next";
const NotFound = () => {
  const {t} = useTranslation();
  return (
      <div className="col s12">
        <h1>404</h1>
        <h2>{t("notFound")}</h2>
      </div>
  );
};
export default NotFound;