import { React, useState} from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-materialize";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHttp } from "../../hooks/http.hook";
import RemoveAlert from "../technical/RemoveAlert";
import { useTranslation } from "react-i18next";
const UserTools = ({ user, setUsers }) => {
  const [open, setOpen] = useState(false);
  const { request, loading } = useHttp();
  const { t } = useTranslation();
  const blockHandler = async () => {
    try {
      const fetched = await request("/api/admin/block", "POST", {
        id: user._id,
      });
      setUsers(fetched);
    } catch (e) {}
  };
  const deleteHandler = async () => {
    try {
      const fetched = await request("/api/admin/delete", "POST", {
        id: user._id,
      });
      setUsers(fetched);
    } catch (e) {}
  };
  const swapRoleHandler = async () => {
    try {
      const fetched = await request("/api/admin/swap", "POST", {
        id: user._id,
      });
      setUsers(fetched);
    } catch (e) {}
  };
  const openAlert = () => {
    setOpen(true);
  };
  return (
    <td>
      <Tooltip arrow title={t("goToProfile")}>
        <Link to={`/profile/${user._id}`} disabled={loading}>
          <IconButton>
            <Icon>account_box</Icon>
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip arrow title={t("block")}>
        <IconButton onClick={blockHandler} disabled={loading}>
          <Icon>block</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={t("delete")}>
        <IconButton onClick={openAlert} disabled={loading}>
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={t("swapRole")}>
        <IconButton onClick={swapRoleHandler} disabled={loading}>
          <Icon>autorenew</Icon>
        </IconButton>
      </Tooltip>
      <RemoveAlert
        open={open}
        setOpen={setOpen}
        loading={loading}
        onAccept={deleteHandler}
      />
    </td>
  );
};
export default UserTools;
