import instanceAxios from "./axiosConfig";

export const getAllUsers = async () => {
  try {
    const allUsers = await instanceAxios.get("users");
    return allUsers.data;
  } catch (error) {
    console.log(error);
    return "Error getting all users";
  }
};
