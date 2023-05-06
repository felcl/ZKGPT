import axios from "axios";
import {store} from "../store";
export const Axios = axios.create({
  baseURL: "http://18.136.140.46:8084/", //测试服务器
  // timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
Axios.interceptors.request.use((config) => {
    console.log(store.state.token)
    config.headers.token = store.state.token;
    return config;
});
Axios.interceptors.response.use(
  (res) => {
      return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default Axios;
