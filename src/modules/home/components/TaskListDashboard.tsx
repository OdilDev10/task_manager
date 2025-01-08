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
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import type { GetProps } from "antd";

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

const TaskListDashboard = ({
  data,
  pagination,
  localGetAllTask,
  status,
  setPagination,
}: {
  data: ITask[];
  pagination: PaginationCustom;
  localGetAllTask: (
    selectedTab: TaskStatusEnum,
    pag?: PaginationCustom
  ) => void;
  status: TaskStatusEnum;
  setPagination: React.Dispatch<React.SetStateAction<PaginationCustom>>;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    localGetAllTask(status, { ...pagination, param: value });
    console.log(_e, "e");
  };
  return (
    <>
      <List
        pagination={{
          showSizeChanger: true,
          pageSize: pagination?.limit,
          total: pagination?.totalRecords, // Total de registros
          current: pagination?.currentPage,
          pageSizeOptions: ["2", "5", "10", "20"],
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} de ${total} items`;
          },
          onChange: (page: number, pageSize: number) => {
            // Hacer una llamada al backend para obtener los datos de la nueva página
            localGetAllTask(status, {
              ...pagination,
              currentPage: page,
              limit: pageSize,
            });
            console.log("Cambiando a la página:", page, pageSize);
          },
        }}
        dataSource={data}
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Listado</h3>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={onSearch}
              onClear={() => {}}
            />
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
            ID: {item.id}
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
