import {
  LoginInterface,
  RegisterInterface,
} from "../interfaces/AuthInterfaces";
import instanceAxios from "./axiosconfig";

export const postRegisterUser = async (data: RegisterInterface) => {
  try {
    const results = await instanceAxios.post("users", data);
    console.log(results.data);
    return results.data;
  } catch (error) {
    console.log(error);
    return "Error getting all users";
  }
};

export const postLoginUser = async (data: LoginInterface) => {
  try {
    console.log(data, "data");
    const results = await instanceAxios.post("login", data);
    console.log(results, "login");
    // return results.data;
  } catch (error) {
    console.log(error);
    return "Error getting all users";
  }
};
