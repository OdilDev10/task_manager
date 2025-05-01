import { Button, Modal } from "antd";
import { useState } from "react";
import FormTask from "./FormTask";

const ModalCreateTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar
      </Button>
      <Modal
        title="Agregar Tarea"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormTask />
      </Modal>
    </div>
  );
};

export default ModalCreateTask;
