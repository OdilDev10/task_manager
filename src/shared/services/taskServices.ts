import instanceAxios from "./axiosconfig";

export const getAllTasks = async () => {
  try {
    const allTasks = await instanceAxios.get("tasks");
    return allTasks.data;
  } catch (error) {
    console.log(error);
    return "Error getting all tasks";
  }
};
