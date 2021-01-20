import { React, useState} from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  DialogContent,
} from "@material-ui/core";
import { Icon, TextInput, Textarea } from "react-materialize";
import Dropzone from "../technical/Dropzone";
import SubjectsPicker from "../technical/SubjectsPicker";
const UpdateCollectionModal = ({ collection, open, setOpen, updateHandler, loading}) => {
  const [update, setUpdate] = useState({
    id: collection._id,
    ownerId: collection.ownerId, 
    title: collection.title,
    description: collection.description,
    subject: collection.subject,
    image: null,
  });
  const handleClose = () => {
    setUpdate({
      title: collection.title,
      description: collection.description,
      subject: collection.subject,
      image: null,
    });
    setOpen(false);
  };
  const changeHandler = (event) => {
    setUpdate({ ...update, [event.target.name]: event.target.value });
  };
  const setImage = (image) => {
    setUpdate({ ...update, image: image });
  };
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar>
        <Toolbar>
          <Icon onClick={handleClose} disabled={loading}>
            close
          </Icon>
          <Typography className="modal-header" variant="h6">
            Редактирование коллекции
          </Typography>
          <Button
            autoFocus
            color="inherit"
            disabled={loading}
            onClick={() => {
              updateHandler(update);
            }}
          >
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent className="container">
        <div className="row content">
          <Dropzone setImage={setImage} />
          <div className="col s12 m7 offset-m1" style={{ marginTop: "25px" }}>
            <TextInput
              name="title"
              s={12}
              className="custom-input"
              onChange={changeHandler}
              defaultValue={update.title}
              label={"Название"}
            />
          </div>
          <div className="col s12 m7 offset-m1">
            <Textarea
              name="description"
              s={12}
              className="custom-input"
              onChange={changeHandler}
              defaultValue={update.description}
              label={"Описание"}
            />
          </div>
          <div className="col s12 m7 offset-m1">
            <div className="col s12">
              <SubjectsPicker
                value={update.subject}
                changeHandler={changeHandler}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateCollectionModal;
