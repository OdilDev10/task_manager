import { PaginationConfig } from "antd/es/pagination";
import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";

const TaskList = ({
  listado,
  pagination,
  localGetAllTask,
  status,
}: {
  listado: ITask[];
  pagination: PaginationConfig | undefined;
  localGetAllTask: (selectedTab: TaskStatusEnum) => void;
  status: TaskStatusEnum;
}) => {
  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3 }}>
        <TaskListDashboard
          localGetAllTask={localGetAllTask}
          data={listado}
          pagination={pagination}
          status={status}
        />
      </div>
    </ContainerTask>
  );
};

export default TaskList;
