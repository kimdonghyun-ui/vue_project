import axios from "axios";
import { setInterceptors } from "./common/interceptors";

function createAxiosService() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

function createAxiosServiceWithAuth(url) {
  const axiosService = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/${url}`,
  });

  return setInterceptors(axiosService);
}

export const axiosService = createAxiosService();
export const posts = createAxiosServiceWithAuth("");
