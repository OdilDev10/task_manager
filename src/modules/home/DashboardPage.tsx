import { useEffect, useState } from "react";
import CustomTabs from "../../shared/components/CustomTabs";
import { TaskInterface } from "../../shared/interfaces/TaskInterface";
import { getAllTasks } from "../../shared/services/taskServices";
import TaskStatusEnum from "../../shared/enums/TaskStatusEnum";
import TaskList from "./components/TaskList";
import UserTab from "./components/UserTab";
import { getAllUsers } from "../../shared/services/userServices";
import { UserInterface } from "../../shared/interfaces/UserInterface";
import { PaginationConfig } from "antd/es/pagination";

const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [pagination, setPagination] = useState<Partial<PaginationConfig>>({});
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
  const dtoUsers = (data: any[]) => {
    let results = data.map((item) => {
      return {
        id: item?.id || "",
        name: item?.name || "",
        lastName: item?.lastName || "",
        email: item?.email || "",
      };
    });

    return results;
  };

  const localGetAllUsers = () => {
    getAllUsers().then((response) => {
      console.log(response.data, "users");
      setPagination({
        current: response.pagination.currentPage,
        pageSize: 5,
        total: response.pagination.totalRecords,
      });
      setAllUsers(dtoUsers(response.data));
    });
  };
  const localGetAllTask = (selectedTab: TaskStatusEnum) => {
    getAllTasks(selectedTab).then((response) => {
      setAllTasks(dtoTasks(response?.data));
      setPagination({
        current: response.pagination.currentPage,
        pageSize: 5,
        total: response.pagination.totalRecords,
      });

      console.log(response?.data, "data");
    });
  };

  const onChangeTab = (e: TaskStatusEnum) => {
    if (
      e == TaskStatusEnum.CANCELLED ||
      e == TaskStatusEnum.PENDING ||
      e == TaskStatusEnum.COMPLETED
    ) {
      setSelectedTab(e);
      localGetAllTask(e);
      console.log(e);
      return;
    }
    localGetAllUsers();
  };

  useEffect(() => {
    localGetAllTask(selectedTab);
  }, [selectedTab]);

  return (
    <div>
      <CustomTabs
        onChange={onChangeTab}
        styles={{ flex: 3 }}
        tabs={[
          {
            key: TaskStatusEnum.COMPLETED,
            label: "Completadas",
            children: (
              <TaskList
                listado={allTasks}
                pagination={pagination}
                localGetAllTask={localGetAllTask}
                status={TaskStatusEnum.COMPLETED}
              />
            ),
          },
          {
            key: TaskStatusEnum.PENDING,
            label: "Pendientes",
            children: (
              <TaskList
                listado={allTasks}
                pagination={pagination}
                localGetAllTask={localGetAllTask}
                status={TaskStatusEnum.PENDING}
              />
            ),
          },
          {
            key: TaskStatusEnum.CANCELLED,
            label: "Canceladas",
            children: (
              <TaskList
                listado={allTasks}
                pagination={pagination}
                localGetAllTask={localGetAllTask}
                status={TaskStatusEnum.CANCELLED}
              />
            ),
          },
          {
            key: "Tab4",
            label: "Usuarios",
            children: <UserTab allUsers={allUsers} />,
          },
        ]}
      />
    </div>
  );
};

export default DashboardPage;
