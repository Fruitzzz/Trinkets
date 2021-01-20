import { React } from "react";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
const RemoveAlert = ({ open, setOpen, loading, onAccept}) => {
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
          Вы уверены, что хотите удалить?
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          disabled={loading}
          color="primary"
          autoFocus
        >
          Нет
        </Button>
        <Button onClick={onAccept} disabled={loading} color="primary">
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RemoveAlert;
