import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { PaginationCustom } from "../DashboardPage";
import FormTask from "./FormTask";
import { SearchProps } from "antd/es/input";

// type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ModalCreateTask = ({
  localGetAllTask,
  status,
  pagination,
}: {
  localGetAllTask: (
    selectedTab: TaskStatusEnum,
    pag?: PaginationCustom
  ) => void;
  status: TaskStatusEnum;
  pagination: PaginationCustom;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const onSearch: SearchProps["onSearch"] = (value, _e, _info) => {
  //   console.log(value);
  //   setSearchParam(value)

  //   localGetAllTask(status, { ...pagination, param: value });
  // };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchParam.trim() !== "") {
        localGetAllTask(status, { ...pagination, param: searchParam });
      }
    }, 600);

    return () => clearTimeout(timerId);
  }, [searchParam]);
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
      <Input
        placeholder="Search..."
        // allowClear
        // enterButton="Search"
        size="middle"
        // onSearch={onSearch}
        onChange={(e: any) => {
          setSearchParam(e.target.value);
        }}
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
        onCancel={handleCancel}
      >
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
