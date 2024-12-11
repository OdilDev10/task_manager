import axios from "axios";
import {
  LoginInterface,
  RegisterInterface,
} from "../interfaces/AuthInterfaces";
import instanceAxios from "./axiosconfig";
import Swal from "sweetalert2";

export const postRegisterUser = async (data: RegisterInterface) => {
  try {
    console.log("Datos enviados al backend:", data); // Debug
    const results = await instanceAxios.post("register", data);
    console.log("Respuesta del backend:", results.data);
    return results.data;
  } catch (error) {
    authError(error);
  }
};

export const postLoginUser = async (data: LoginInterface) => {
  try {
    const results = await instanceAxios.post("login", data);
    Swal.fire(results.data?.message);
    localStorage.setItem("token", results.data?.token);
    localStorage.setItem("user", JSON.stringify(results.data?.user));
    return true;
  } catch (error) {
    authError(error);
  }
};

export const authError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (Array.isArray(error?.response?.data?.errors)) {
      console.log(error.response?.data?.errors[0], "Array");
      Swal.fire(`${error.response?.data.errors[0].message}`);
    }

    if (error?.response?.data?.error) {
      console.log(error.response?.data.error, "string");
      Swal.fire(`${error.response?.data.error}`);
    }

    return error.response?.data || "Error en el servidor";
  } else {
    console.error("Unknown Error:", error);
    return "Error desconocido";
  }
};
