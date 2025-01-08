import { Button, Modal } from "antd";
import { useState } from "react";
import FormTask from "./FormTask";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";

const ModalCreateTask = ({
  localGetAllTask,
  status,
}: {
  localGetAllTask: (selectedTab: TaskStatusEnum) => void;
  status: TaskStatusEnum;
}) => {
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
        onCancel={handleCancel}>
        <FormTask localGetAllTask={localGetAllTask} status={status} />
      </Modal>
    </div>
  );
};

export default ModalCreateTask;
