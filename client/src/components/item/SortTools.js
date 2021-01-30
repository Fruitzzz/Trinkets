import { React, useState } from "react";
import { Dropdown } from "react-materialize";
import { Link as FlatButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
const SortTools = ({ items, setItems }) => {
  const [sortDirection, setSortDirection] = useState();
  const { t } = useTranslation();
  const sortHandler = (event) => {
    let sorted = [];
    if (!sortDirection || sortDirection === "desc") {
      sorted = items.sort((a, b) => {
        if (a[event.target.name] > b[event.target.name]) return 1;
        if (a[event.target.name] < b[event.target.name]) return -1;
        else return 0;
      });
      setSortDirection("asc");
    } else {
      sorted = items.sort((a, b) => {
        if (a[event.target.name] < b[event.target.name]) return 1;
        if (a[event.target.name] > b[event.target.name]) return -1;
        else return 0;
      });
      setSortDirection("desc");
    }
    setItems([...sorted]);
  };
  return (
    <Dropdown
      id="sort-variant"
      trigger={
        <Button variant="outlined" className="blue-border-btn right">
          {t("sort")}
        </Button>
      }
    >
      <FlatButton
        name="title"
        onClick={sortHandler}
        className=" nav-link flat-button"
      >
        {t("sortByName")}
      </FlatButton>
      <FlatButton
        name="creationDate"
        onClick={sortHandler}
        className=" nav-link flat-button"
      >
        {t("sortByDate")}
      </FlatButton>
      
    </Dropdown>
  );
};
export default SortTools;
