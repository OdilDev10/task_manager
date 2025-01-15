import { Button, Modal } from "antd";
import React, { useState } from "react";
import FormTask from "./FormTask";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";

const ModalDetailTask = ({
  open,
  setOpenModal,
}: {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [statusForm, setStatusForm] = useState<"edit" | "detail">("detail");
  return (
    <>
      <Modal
        title="Detalles de tarea"
        open={open}
        onOk={() => {
          setOpenModal(!open);
        }}
        onCancel={() => {
          setOpenModal(!open);
        }}
      >
        {statusForm === "detail" ? (
          <>
            Detalle
            <Button
              onClick={() => {
                setStatusForm("edit");
              }}
            >
              Editar
            </Button>
          </>
        ) : (
          <>
            <FormTask
              localGetAllTask={function (selectedTab: TaskStatusEnum): void {
                console.log(selectedTab);
              }}
              status={TaskStatusEnum.COMPLETED}
              setIsModalOpen={setOpenModal}
            />
            <Button
              onClick={() => {
                setStatusForm("detail");
              }}
            >
              Detalle
            </Button>
            <Button onClick={() => {}}>Guardar</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalDetailTask;
