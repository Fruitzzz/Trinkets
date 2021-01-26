import { React, useContext, useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import Button from "@material-ui/core/Button";
import { ItemContext } from "../../context/item.context";
import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../../hooks/http.hook";
import { Icon } from "react-materialize";
import { useTranslation } from "react-i18next";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
const AddItemModal = () => {
  const { request, loading, error, clearError } = useHttp();
  const { setFields, newItem, setItems} = useContext(ItemContext);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const message = useMessage();
  const addItemHandler = async () => {
    try {
     const items = await request("/api/items/addNewItem", "POST", { ...newItem });
     setItems(items);
     setOpen(false);
    } catch (e) {}
  };
  const handleClickOpen = () => {
    setOpen(true);
    setFields(newItem.optionalFields);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  return (
    <div>
      <Button variant="outlined" className="blue-border-btn" onClick={handleClickOpen}>
        {t("addItem")}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar>
          <Toolbar>
            <Icon  onClick={handleClose} disabled={loading}>
              close
            </Icon>
            <Typography className="modal-header" variant="h6">
              {t("addingItem")}
            </Typography>
            <Button autoFocus color="inherit" disabled={loading} onClick={addItemHandler}>
              {t("addItem")}
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <AddItemForm/>
      </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddItemModal;
