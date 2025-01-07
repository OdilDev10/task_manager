import { PaginationConfig } from "antd/es/pagination";
import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";

const TaskList = ({ listado, pagination }: { listado: any[], pagination: PaginationConfig | undefined }) => {
  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3 }}>
        <TaskListDashboard data={listado} pagination={pagination} />
      </div>
    </ContainerTask>
  );
};

export default TaskList;
