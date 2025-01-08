import { Avatar, Button, List } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { useState } from "react";
import Swal from "sweetalert2";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import ModalCreateTask from "./ModalCreateTask";
import ModalDetailTask from "./ModalDetailTask";
import { disableTask } from "../../../shared/services/taskServices";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { PaginationCustom } from "../DashboardPage";

const TaskListDashboard = ({
  data,
  pagination,
  localGetAllTask,
  status,
}: {
  data: ITask[];
  pagination: PaginationCustom;
  localGetAllTask: (selectedTab: TaskStatusEnum) => void;
  status: TaskStatusEnum;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <List
        pagination={{
          showSizeChanger: false,
          pageSize: pagination?.limit,
          total: pagination?.totalRecords,
          current: pagination?.currentPage,
          onChange: (page) => {
            console.log("Cambiando a la página:", page);
          },
          ...pagination,
        }}
        dataSource={data}
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Listado</h3>
            <ModalCreateTask
              status={status}
              localGetAllTask={localGetAllTask}
            />
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
                        disableTask(item?.id || 0)
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
