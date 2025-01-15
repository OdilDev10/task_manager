import { Avatar, Button, List } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import { disableTask } from "../../../shared/services/taskServices";
import { PaginationCustom } from "../DashboardPage";
import ContainerTask from "./ContainerTask";
import ModalDetailTask from "./ModalDetailTask";

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

  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3, padding: "1rem" }}>
        <div>
          <ModalDetailTask open={openModal} setOpenModal={setOpenModal} />
          <List
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
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
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: "1px solid #f0f0f0",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  margin: "8px 0",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      style={{
                        border: "2px solid var(--primary-color)",
                      }}
                    />
                  }
                  title={
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {item.title} - ID: {item.id}
                    </span>
                  }
                  description={
                    <div
                      style={{
                        color: "#6b6b6b",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {item.content} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Ut maiores culpa, ipsum veniam odit,
                      impedit accusamus minus optio sint excepturi eaque esse
                      nisi debitis voluptatibus asperiores error voluptatum
                      consectetur quae.
                    </div>
                  }
                  style={{
                    flex: "1",
                    minWidth: "400px",
                  }}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "orange", borderColor: "orange" }}
                    onClick={() => {
                      setOpenModal(!openModal);
                    }}
                  >
                    Detalle
                  </Button>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "green", borderColor: "green" }}
                    onClick={() => {
                      setOpenModal(!openModal);
                    }}
                  >
                    Editar
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
                    }}
                  >
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
