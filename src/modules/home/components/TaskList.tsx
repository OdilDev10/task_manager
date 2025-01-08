import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";

const TaskList = ({
  listado,
  pagination,
  localGetAllTask,
  status,
}: {
  listado: ITask[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalRecords: number;
  };
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
