import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { ITask } from "../../../shared/schemas/tasksSchemas";
import { PaginationCustom } from "../DashboardPage";
import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";

const TaskList = ({
  listado,
  pagination,
  localGetAllTask,
  status,
  setPagination,
}: {
  listado: ITask[];
  pagination: PaginationCustom;
  localGetAllTask: (
    selectedTab: TaskStatusEnum,
    pag?: PaginationCustom
  ) => void;
  status: TaskStatusEnum;
  setPagination: React.Dispatch<React.SetStateAction<PaginationCustom>>;
}) => {
  console.log(listado, "listado");
  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3, padding: "1rem" }}>
        <TaskListDashboard
          localGetAllTask={localGetAllTask}
          data={listado}
          pagination={pagination}
          status={status}
          setPagination={setPagination}
        />
      </div>
    </ContainerTask>
  );
};

export default TaskList;
