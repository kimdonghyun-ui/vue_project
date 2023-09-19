import store from "../../store/index";
import { Logout } from "../../utils/common";

export function setInterceptors(axiosService) {
  axiosService.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전에 어떤 처리를 할 수 있다.
      // console.log(
      //   "요청을 보내기 전에 어떤 처리를 할 수 있다."
      // );
      config.headers.Authorization = `Bearer ${store.state.token}`; //토큰 세팅
      return config;
    },
    function (error) {
      // 요청이 잘못되었을 때 에러가 컴포넌트 단으로 오기 전에 어떤 처리를 할 수 있다.
      return Promise.reject(error);
    },
  );

  axiosService.interceptors.response.use(
    function (response) {
      // 서버에 요청을 보내고 나서 응답을 받기 전에 어떤 처리를 할 수 있다.
      // console.log(
      //   "서버에 요청을 보내고 나서 응답을 받기 전에 어떤 처리를 할 수 있다",
      // );

      return response;
    },
    function (error) {
      // 응답이 에러인 경우에 미리 전처리할 수 있다.
      if (error.response.data.message === "Invalid token.") {
        console.log("토큰 만료됬으니까 리플래시토큰 갱신요청");
        return reToken(error, axiosService);
      }

      return Promise.reject(error);
    },
  );

  return axiosService;
}

const reToken = async (error, axiosService) => {
  try {
    await store.dispatch("RETOKEN"); // 토큰 재발급

    // 원래 요청을 다시 시도
    const originalRequest = error.config;
    return axiosService(originalRequest);
  } catch (error) {
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");

    Logout();
  }
};
