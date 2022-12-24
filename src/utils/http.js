import { getToken } from "@/utils/token";
import { axios } from "taro-axios";

const http = axios.create({
  baseURL: "",
  timeout: 1000,
  // adapter: TaroAdapter, // 替换默认的适配器，原模块通过适配器使用http
});

http.interceptors.request.use(
  (config) => {
    // const token = getToken() || "";
    // if (token !== "") {
    //   config.auth.token = `Bear ${token}`;
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (config) => config,
  (error) => {
    Promise.reject(error);
  }
);

export default http;
