import { React, useContext, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import { Modal } from "react-materialize";
import Button from "@material-ui/core/Button";
import { ItemContext } from "../../context/item.context";
import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../../hooks/http.hook";
const AddItemModal = () => {
  const { request, loading, error, clearError } = useHttp();
  const { setFields, newItem } = useContext(ItemContext);
  const message = useMessage();
  const openHandler = () => {
    setFields(newItem.optionalFields);
  };
  const addItemHandler = async () => {
    try {
      await request("/api/collections/addNewItem", "POST", { ...newItem });
    } catch (e) {}
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  return (
    <Modal
      actions={[
        <Button
          variant="outlined"
          className="modal-close blue-border-btn"
          node="button"
        >
          Закрыть
        </Button>,
        <Button
          variant="outlined"
          className="blue-border-btn"
          node="button"
          onClick={addItemHandler}
          disabled={loading}
        >
          Добавить элемент
        </Button>,
      ]}
      options={{
        onOpenStart: openHandler,
      }}
      header="Modal Header"
      id="add-modal"
      open={false}
      trigger={
        <Button variant="outlined" className="blue-border-btn right">
          Добавить элемент
        </Button>
      }
    >
      <AddItemForm />
    </Modal>
  );
};
export default AddItemModal;
