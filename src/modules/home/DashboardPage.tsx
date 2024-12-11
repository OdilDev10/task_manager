import { useEffect, useState } from "react";
import CustomTabs from "../../shared/components/CustomTabs";
import { TaskInterface } from "../../shared/interfaces/TaskInterface";
import { getAllTasks } from "../../shared/services/taskServices";
import TaskStatusEnum from "../../shared/enums/TaskStatusEnum";
import TaskList from "./components/TaskList";
import UserTab from "./components/UserTab";

const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);
  const [selectedTab, setSelectedTab] = useState<TaskStatusEnum>(
    TaskStatusEnum.COMPLETED
  );

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
    getAllTasks(selectedTab).then((data) => {
      setAllTasks(dtoTasks(data.data));
      console.log(data);
    });
  }, [selectedTab]);

  const onChangeTab = (e: TaskStatusEnum) => {
    if (
      e == TaskStatusEnum.CANCELLED ||
      e == TaskStatusEnum.PENDING ||
      e == TaskStatusEnum.COMPLETED
    ) {
      setSelectedTab(e);
      console.log(e);
    }
  };
  return (
    <div>
      <CustomTabs
        onChange={onChangeTab}
        styles={{ flex: 3 }}
        tabs={[
          {
            key: TaskStatusEnum.COMPLETED,
            label: "Pendientes",
            children: <TaskList listado={allTasks} />,
          },
          {
            key: "Tab2",
            label: "Pendientes",
            children: <CompletedTasks listado={completedTasks} />,
          },
          {
            key: TaskStatusEnum.CANCELLED,
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
