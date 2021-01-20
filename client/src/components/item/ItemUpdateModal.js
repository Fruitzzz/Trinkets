import { React, useState} from "react";
import { Chip, Icon, TextInput } from "react-materialize";
import {
    Dialog,
    AppBar,
    Toolbar,
    Typography,
    Button,
    DialogContent,
  } from "@material-ui/core";
const UpdateItemModal = ({item, open, setOpen, updateHandler, loading}) => {
    const [update, setUpdate] = useState({
        id: item._id,
        title: item.title,
        tags: item.tags
    })
    const handleClose = () => {
        setUpdate({
            title: item.title,
            tags: item.tags
        })
        setOpen(false);
    }
    const changeHandler = (event) => {
        setUpdate({...update, [event.target.name]: event.target.value});
    }
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
          <Chip
          close={false}
          closeIcon={<Icon className="close">close</Icon>}
          name="tags"
          options={{
            data: update.tags,
            placeholder: "Введите тег",
            secondaryPlaceholder: "+ Тег",
            autocompleteOptions: {
              data: {
                Apple: null,
                Google: null,
                Microsoft: null,
              },
              minLength: 1,
              onAutocomplete: function noRefCheck() {},
            },
            onChipAdd: (event) => {
              setUpdate({...update, tags:[...event[0].M_Chips.chipsData]});
            },
            onChipDelete: (event) => {
              setUpdate({...update, tags:[...event[0].M_Chips.chipsData]});
            },
          }}
        />
          </div>
        </div>
      </DialogContent>
    </Dialog>
    )
}
export default UpdateItemModal;