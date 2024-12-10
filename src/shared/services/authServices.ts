import axios from "axios";
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
    const results = await instanceAxios.post("login", data);
    return results.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Error específico de Axios

      if (Array.isArray(error?.response?.data?.errors)) {
        console.log(error.response?.data?.errors, "Array");
      }

      if (error?.response?.data?.error) {
        console.log(error.response?.data.error, "string");
      }

      return error.response?.data || "Error en el servidor";
    } else {
      // Otros errores no relacionados con Axios
      console.error("Unknown Error:", error);
      return "Error desconocido";
    }
  }
};
