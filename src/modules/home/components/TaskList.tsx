import { PaginationConfig } from "antd/es/pagination";
import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";
import { ITask } from "../../../shared/schemas/tasksSchemas";

const TaskList = ({ listado, pagination }: { listado: ITask[], pagination: PaginationConfig | undefined }) => {
  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3 }}>
        <TaskListDashboard data={listado} pagination={pagination} />
      </div>
    </ContainerTask>
  );
};

export default TaskList;
