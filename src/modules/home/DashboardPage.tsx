import { useState } from "react";
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
import ModalCreateTask from "./components/ModalCreateTask";

export interface PaginationCustom {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalRecords: number;
  param: string;
}

const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [allUsers, setAllUsers] = useState<IUserRegister[]>([]);
  const [pagination, setPagination] = useState<PaginationCustom>({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
    totalRecords: 1,
    param: "",
  });
  const [selectedTab, setSelectedTab] = useState<TaskStatusEnum>(
    TaskStatusEnum.COMPLETED
  );

  const dtoTasks = (data: unknown[]): ITask[] => {
    return data?.map((item) => {
      return TaskSchemaCreate.parse(item);
    });
  };

  // Función para transformar y validar usuarios
  const dtoUsers = (data: unknown[]): IUserRegister[] => {
    return data.map((item) => {
      return UserRegisterSchema.parse(item); // Valida y transforma
    });
  };
  const localGetAllUsers = () => {
    getAllUsers(pagination).then((response) => {
      console.log(response?.data, "users");
      setPagination({
        currentPage: response?.pagination.currentPage,
        limit: response?.pagination?.limit,
        totalRecords: response?.pagination.totalRecords,
        totalPages: response?.pagination.totalPages,
        param: response?.pagination.param,
      });
      setAllUsers(dtoUsers(response?.data));
    });
  };
  const localGetAllTask = (
    selectedTab: TaskStatusEnum,
    pag?: PaginationCustom
  ) => {
    getAllTasks(selectedTab, pag || pagination).then((response) => {
      console.log(response?.data, "data");
      setAllTasks(dtoTasks(response?.data));
      setPagination({
        currentPage: response?.pagination.currentPage,
        limit: response?.pagination?.limit,
        totalRecords: response?.pagination.totalRecords,
        totalPages: response?.pagination.totalPages,
        param: response?.pagination.param,
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
              <div>
              <ModalCreateTask
                status={TaskStatusEnum.COMPLETED}
                localGetAllTask={localGetAllTask}
              />
              <TaskList
                listado={allTasks}
                pagination={pagination}
                localGetAllTask={localGetAllTask}
                status={TaskStatusEnum.COMPLETED}
              />
              </div>
            ),
          },
          {
            key: TaskStatusEnum.PENDING,
            label: "Pendientes",
            children: (
              <div>
                <ModalCreateTask
                  status={TaskStatusEnum.PENDING}
                  localGetAllTask={localGetAllTask}
                />

                <TaskList
                  listado={allTasks}
                  pagination={pagination}
                  localGetAllTask={localGetAllTask}
                  status={TaskStatusEnum.PENDING}
                />
              </div>
            ),
          },
          {
            key: TaskStatusEnum.CANCELLED,
            label: "Canceladas",
            children: (
              <div>
              <ModalCreateTask
                status={TaskStatusEnum.CANCELLED}
                localGetAllTask={localGetAllTask}
              />
              <TaskList
                listado={allTasks}
                pagination={pagination}
                localGetAllTask={localGetAllTask}
                status={TaskStatusEnum.CANCELLED}
              />
              </div>
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
