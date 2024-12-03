import ParamsSearch from "../interfaces/ParamsSearch";
import peticion from "./axiosconfig";

export const getAllUsers = async (params: ParamsSearch) => {
  try {
    let users = await peticion.get(`/users`);
    return users.data;
  } catch (error: any) {
    // showErrorModal(error?.response?.data);
    return error;
  }
};
