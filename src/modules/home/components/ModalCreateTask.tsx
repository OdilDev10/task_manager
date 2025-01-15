import { Button, Modal } from "antd";
import { useState } from "react";
import FormTask from "./FormTask";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { AudioOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import type { GetProps } from "antd";
import Swal from "sweetalert2";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
        padding: "20px 0px",
      }}
    >
      <Button type="primary" onClick={showModal}>
        Agregar
      </Button>
      <Search
        placeholder="Search..."
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={onSearch}
      />

      <InfoCircleOutlined
        onClick={() => {
          Swal.fire({
            title: "Campos por los que filtra",
            text: "Nombre, Descripcio.",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
        }}
      />
      <Modal
        title="Agregar Tarea"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <FormTask
          localGetAllTask={localGetAllTask}
          status={status}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default ModalCreateTask;
