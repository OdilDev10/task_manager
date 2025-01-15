import { Avatar, Button, List } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import { disableTask } from "../../../shared/services/taskServices";
import { PaginationCustom } from "../DashboardPage";
import ContainerTask from "./ContainerTask";
import ModalDetailTask from "./ModalDetailTask";
import { useTheme } from "../../../context/ThemeContext";

const TaskList = ({
  listado,
  pagination,
  localGetAllTask,
  status,
}: {
  listado: ITask[];
  pagination: PaginationCustom;
  localGetAllTask: (
    selectedTab: TaskStatusEnum,
    pag?: PaginationCustom
  ) => void;
  status: TaskStatusEnum;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3, padding: "1rem" }}>
        <div>
          <ModalDetailTask open={openModal} setOpenModal={setOpenModal} />
          <List
            style={{
              padding: "20px",
              backgroundColor: theme === "light" ? "#f5f5f5" : "#444",
              borderRadius: "8px",
            }}
            pagination={{
              showSizeChanger: true,
              pageSize: pagination?.limit,
              total: pagination?.totalRecords, // Total de registros
              current: pagination?.currentPage,
              pageSizeOptions: ["5", "10", "20"],
              showTotal: (total, range) => {
                return `${range[0]}-${range[1]} de ${total} items`;
              },
              onChange: (page: number, pageSize: number) => {
                localGetAllTask(status, {
                  ...pagination,
                  currentPage: page,
                  limit: pageSize,
                });
                console.log("Cambiando a la página:", page, pageSize);
              },
            }}
            dataSource={listado}
            itemLayout="horizontal"
            renderItem={(item, index) => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom:
                    theme === "light" ? "1px solid #e8e8e8" : "none",
                  backgroundColor: theme === "light" ? "#fff" : "#333",
                  borderRadius: "8px",
                  margin: "8px 0",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      style={{ border: "2px solid var(--primary-color)" }}
                    />
                  }
                  title={
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {item.title} - ID: {item.id}
                    </span>
                  }
                  description={
                    <span style={{ color: "#6b6b6b" }}>{item.content}</span>
                  }
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "green", borderColor: "green" }}
                    onClick={() => {
                      setOpenModal(!openModal);
                    }}>
                    Detalle
                  </Button>

                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¡No podrás revertir esto!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, eliminar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          disableTask(item?.id || 0)
                            .then((res) => {
                              console.log(res);
                              Swal.fire({
                                title: "Eliminado",
                                text: "El elemento ha sido eliminado.",
                                icon: "success",
                              });
                              localGetAllTask(status);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }
                      });
                    }}>
                    Eliminar
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </ContainerTask>
  );
};

export default TaskList;
