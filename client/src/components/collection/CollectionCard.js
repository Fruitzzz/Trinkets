import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-materialize";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useHttp } from "../../hooks/http.hook";
import Alc from "../../images/Alc.jpg";
const CollectionCard = ({ collection, setCollections }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { loading, request } = useHttp();
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const acceptHandler = async () => {
    try {
      const response = await request(
        "/api/collections/removeCollection",
        "POST",
        { id: collection._id, ownerId: collection.ownerId }
      );
      setOpen(false);
      setCollections([...response]);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="card col s12 m4 hoverable">
      <div className="card-image">
        <img alt="collection" src={Alc} />
        <button
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClickMenu}
          className="btn-floating halfway-fab waves-effect waves-light  indigo darken-1"
        >
          <Icon>build</Icon>
        </button>
      </div>
      <div className="card-content">
        <span className="card-title">{collection.title}</span>
        <p>
          Type:
          <Link
            className="blue-grey-text text-darken-2"
            to={`/profile/${collection.ownerId}`}
          >
            {` ${collection.subject}`}
          </Link>
        </p>
        <p>
          Author:
          <Link
            className="blue-grey-text text-darken-2"
            to={`/profile/${collection.ownerId}`}
          >
            {` ${collection.ownerName}`}
          </Link>
        </p>
      </div>
      <div className="card-actions">
        <Link key={collection._id} to={`/collection/${collection._id}`}>
          <button className="btn-flat right" style={{ marginBottom: "10px" }}>
            Подробнее
          </button>
        </Link>
      </div>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Редактировать</MenuItem>
        <MenuItem onClick={handleOpenModal}>Удалить коллекцию</MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Вы уверены, что хотите удалить коллекцию?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseModal} disabled={loading} color="primary" autoFocus>
            Нет
          </Button>
          <Button onClick={acceptHandler} disabled={loading} color="primary">
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CollectionCard;
