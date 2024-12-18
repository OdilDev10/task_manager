import { Avatar, Button, List } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { TaskInterface } from "../../../shared/interfaces/TaskInterface";
import ModalCreateTask from "./ModalCreateTask";

const TaskListDashboard = ({ data }: { data: TaskInterface[] }) => {
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
