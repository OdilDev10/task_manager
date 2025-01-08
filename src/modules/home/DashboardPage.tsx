import { useEffect, useState } from "react";
import CustomTabs from "../../shared/components/CustomTabs";
import TaskStatusEnum from "../../shared/enums/TaskStatusEnum";
import {
  IUserRegister,
  UserRegisterSchema,
} from "../../shared/schemas/authSchemas";
import { ITask, TaskSchemaCreate } from "../../shared/schemas/tasksSchemas";
import { getAllTasks } from "../../shared/services/taskServices";
import { getAllUsers } from "../../shared/services/userServices";
import TaskList from "./components/TaskList";
import UserTab from "./components/UserTab";

const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [allUsers, setAllUsers] = useState<IUserRegister[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    totalRecords: 1,
  });
  const [selectedTab, setSelectedTab] = useState<TaskStatusEnum>(
    TaskStatusEnum.COMPLETED
  );

  const dtoTasks = (data: unknown[]): ITask[] => {
    return data?.map((item) => {
      return TaskSchemaCreate.parse(item); // Valida y transforma
    });
  };

  // Función para transformar y validar usuarios
  const dtoUsers = (data: unknown[]): IUserRegister[] => {
    return data.map((item) => {
      return UserRegisterSchema.parse(item); // Valida y transforma
    });
  };
  const localGetAllUsers = () => {
    getAllUsers().then((response) => {
      console.log(response?.data, "users");
      setPagination({
        currentPage: response?.pagination.currentPage,
        limit: response?.pagination?.limit,
        totalRecords: response?.pagination.totalRecords,
        totalPages: response?.pagination.totalPages,
      });
      setAllUsers(dtoUsers(response?.data));
    });
  };
  const localGetAllTask = (selectedTab: TaskStatusEnum) => {
    getAllTasks(selectedTab).then((response) => {
      setAllTasks(dtoTasks(response?.data));
      setPagination({
        currentPage: response?.pagination.currentPage,
        limit: response?.pagination?.limit,
        totalRecords: response?.pagination.totalRecords,
        totalPages: response?.pagination.totalPages,
      });

      console.log(response?.data, "data");
    });
  };

  const onChangeTab = (e: TaskStatusEnum) => {
    console.log(e);
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
                localGetAllTask={function (selectedTab: TaskStatusEnum): void {
                  localGetAllTask(selectedTab);
                }}
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
                localGetAllTask={function (selectedTab: TaskStatusEnum): void {
                  localGetAllTask(selectedTab);
                }}
                status={TaskStatusEnum.COMPLETED}
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
                localGetAllTask={function (selectedTab: TaskStatusEnum): void {
                  localGetAllTask(selectedTab);
                }}
                status={TaskStatusEnum.COMPLETED}
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
