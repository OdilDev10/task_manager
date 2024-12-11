import { useEffect, useState } from "react";
import CustomTabs from "../../shared/components/CustomTabs";
import { TaskInterface } from "../../shared/interfaces/TaskInterface";
import { getAllTasks } from "../../shared/services/taskServices";
import TaskList from "./components/TaskList";
import UserTab from "./components/UserTab";

const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);

  const dtoTasks = (data: any[]) => {
    let results = data?.map((item) => {
      return {
        id: item?.id || "",
        title: item?.title || "",
        content: item?.content || "",
        userId: item?.userId || "",
        status: item?.status || "",
      };
    });
    return results;
  };

  useEffect(() => {
    getAllTasks().then((data) => {
      setAllTasks(dtoTasks(data.data));
      console.log(data);
    });
  }, []);
  return (
    <div>
      <CustomTabs
        styles={{ flex: 3 }}
        tabs={[
          {
            key: "Tab1",
            label: "Pendientes",
            children: <TaskList listado={allTasks} />,
          },
          {
            key: "Tab2",
            label: "Hechas",
            children: <TaskList listado={allTasks} />,
          },
          {
            key: "Tab3",
            label: "Canceladas",
            children: <TaskList listado={allTasks} />,
          },
          {
            key: "Tab4",
            label: "Usuarios",
            children: <UserTab />,
          },
        ]}
      />
    </div>
  );
};

export default DashboardPage;
