import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";

const TaskList = ({ listado }: { listado: any[] }) => {
  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3 }}>
        <TaskListDashboard data={listado} />
      </div>
    </ContainerTask>
  );
};

export default TaskList;
