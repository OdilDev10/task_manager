import { Avatar, Button, List } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { PaginationConfig } from "antd/es/pagination";
import { useState } from "react";
import Swal from "sweetalert2";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import ModalCreateTask from "./ModalCreateTask";
import ModalDetailTask from "./ModalDetailTask";
import { disableTask } from "../../../shared/services/taskServices";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";

const TaskListDashboard = ({
  data,
  pagination,
  localGetAllTask,
  status,
}: {
  data: ITask[];
  pagination: PaginationConfig | undefined;
  localGetAllTask: (selectedTab: TaskStatusEnum) => void;
  status: TaskStatusEnum;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <List
        pagination={{
          ...pagination,
          showSizeChanger: false,
          pageSize: 5,
          total: pagination?.total,
          onChange: (page) => {
            console.log("Cambiando a la página:", page);
          },
        }}
        dataSource={data}
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Listado</h3>
            <ModalCreateTask />
          </div>
        }
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item.title}
              description={item.content}
            />

            <div style={{ display: "flex" }}>
              <ButtonGroup>
                {/* <Button
                  style={{
                    color: "var(--primary-color)",
                    borderColor: "var(--primary-color)",
                  }}
                >
                  Check
                </Button> */}
                <ModalDetailTask open={openModal} setOpenModal={setOpenModal} />
                <Button
                  style={{ color: "green", borderColor: "green" }}
                  onClick={() => {
                    setOpenModal(!openModal);
                  }}>
                  Detalle
                </Button>

                <Button
                  style={{ color: "red", borderColor: "red" }}
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        disableTask(item.id)
                          .then((res) => {
                            console.log(res);
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
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
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default TaskListDashboard;
