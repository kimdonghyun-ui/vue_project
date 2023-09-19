import { axiosService } from "./index";

function registerUser(userData) {
  return axiosService.post("auth/local/register", userData);
}

function loginUser(userData) {
  return axiosService.post("auth/local", userData);
}

function refreshToken(userData) {
  return axiosService.post("auth/refreshToken", userData);
}

export { registerUser, loginUser, refreshToken };
