import { UserInterface } from "../interfaces/UserInterface";
import instanceAxios from "./axiosconfig";

export const getAllUsers = async () => {
  try {
    const allUsers = await instanceAxios.get("users");
    return allUsers.data;
  } catch (error) {
    console.log(error);
    return "Error getting all users";
  }
};

export const postCreateUser = async (data: UserInterface) => {
  try {
    const results = await instanceAxios.post("users", data);
    console.log(results, "results");
    return results.data;
  } catch (error) {
    console.log(error);
    return "Error getting all users";
  }
};
