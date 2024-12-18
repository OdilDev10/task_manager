import { Avatar, Button, List } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import ModalCreateTask from "./ModalCreateTask";
import { TaskInterface } from "../../../shared/interfaces/TaskInterface";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../../shared/services/taskServices";

const TaskListDashboard = ({ data }: { data: TaskInterface[] }) => {
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const dtoTasks = (data: any[]) => {
    let results = data?.map((item) => {
      return {
        id: item?.id || "",
        title: item?.title || "",
        content: item?.content || "",
        status: item?.status || "",
      };
    });
    return results;
  };

  // useEffect(() => {
  //   getAllTasks().then((data) => {
  //     setAllTasks(dtoTasks(data.data));
  //     console.log(data);
  //   });
  // }
  // , []);
  return (
    <>
      <List
        pagination={{ position: "bottom", align: "center", pageSize: 6 }}
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
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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

                <Button style={{ color: "red", borderColor: "red" }}>
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
