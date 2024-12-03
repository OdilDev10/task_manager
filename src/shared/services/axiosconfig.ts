import axios from "axios";

const { VITE_DEV_URL, DEBUG } = import.meta.env;

const getToken = () => localStorage.getItem("access") || "";

console.log(DEBUG, VITE_DEV_URL);

const peticion = axios.create({
  baseURL: VITE_DEV_URL,
  headers: {
    Authorization: `${getToken()}`,
    "Content-Type": "application/json",
  },
});
export default peticion;
