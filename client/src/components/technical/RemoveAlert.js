import { React } from "react";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
import {useTranslation} from "react-i18next";
const RemoveAlert = ({ open, setOpen, loading, onAccept}) => {
  const {t} = useTranslation();
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
          {t("alert")}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          disabled={loading}
          color="primary"
          autoFocus
        >
          {t("no")}
        </Button>
        <Button onClick={onAccept} disabled={loading} color="primary">
          {t("yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RemoveAlert;
