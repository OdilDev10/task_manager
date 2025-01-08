import TaskStatusEnum from "../enums/TaskStatusEnum";
import { TaskInterface } from "../interfaces/TaskInterface";
import instanceAxios from "./axiosconfig";

export const getAllTasks = async (status: TaskStatusEnum) => {
  try {
    const allTasks = await instanceAxios.get(`tasks?status=${status}`);
    return allTasks.data;
  } catch (error) {
    console.log(error);
    return "Error getting all tasks";
  }
};

export const postCreateTask = async (data: TaskInterface) => {
  try {
    const task = await instanceAxios.post("tasks", data);
    console.log(task.data, "task");
    return task.data;
  } catch (error) {
    console.log(error);
    return "Error creating task";
  }
};

export const deleteTask = async (id: number) => {
  try {
    const task = await instanceAxios.delete(`tasks/${id}`);
    console.log(task.data, "task");
    return task.data;
  } catch (error) {
    console.log(error);
    return "Error deleting task";
  }
};

export const disableTask = async (id: number) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user.id, "user.id");
  try {
    const task = await instanceAxios.put(`tasks/${id}/${user.id}/disable `);
    console.log(task.data, "task");
    return task.data;
  } catch (error) {
    console.log(error);
    return "Error deleting task";
  }
};
