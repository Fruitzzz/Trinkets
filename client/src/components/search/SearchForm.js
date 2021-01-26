import { React, useState } from "react";
import { Icon } from "react-materialize";
import { useMessage } from "../../hooks/message.hook";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
const SearchForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const message = useMessage();
  const [searchText, setSearchText] = useState("");
  const changeHandler = (event) => {
    setSearchText(event.target.value);
  };
  const searchHandler = () => {
    if (searchText.length > 0) {
      history.push(`/search/${searchText}`);
      setSearchText("");
    } else message("Строка поиска пуста");
  };
  return (
    <div className="input-field">
      <input
        id="search"
        type="search"
        className="search"
        placeholder={t("searchPlaceHolder")}
        value={searchText}
        onChange={changeHandler}
      />
      <Icon onClick={searchHandler}>search</Icon>
    </div>
  );
};
export default SearchForm;
