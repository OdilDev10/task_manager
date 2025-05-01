import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
});

export default instanceAxios;
