import {React, useState} from "react";
import {Link} from "react-router-dom";
import { Icon } from "react-materialize";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHttp } from "../../hooks/http.hook";
import RemoveAlert from "../technical/RemoveAlert";
const UserTools = ({user, setUsers}) => {
    const [open, setOpen] = useState(false);
    const { request, loading} = useHttp();
    const blockHandler = async () => {
        const fetched = await request("/api/admin/block", "POST", {id: user._id});
        setUsers(fetched);
    }
    const deleteHandler = async () => {
        const fetched = await request("/api/admin/delete", "POST", {id: user._id});
        setUsers(fetched);
    }
    const openAlert = () => {
        setOpen(true);
    }
    return (
        <td>
        <Tooltip arrow title="Перейти в профиль">
          <Link to={`/profile/${user._id}`} disabled={loading}>
          <IconButton>
            <Icon>account_box</Icon>
          </IconButton>
          </Link>
        </Tooltip>
        <Tooltip arrow title="Заблокировать">
        <IconButton onClick={blockHandler} disabled={loading}>
          <Icon >block</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Удалить">
        <IconButton onClick={openAlert} disabled={loading}>
          <Icon>delete</Icon>
          </IconButton>
        </Tooltip>
        <RemoveAlert open={open} setOpen={setOpen} loading={loading} onAccept={deleteHandler}/>
      </td>
    )
}
export default UserTools;