import { createStore } from "vuex";
import { loginUser, refreshToken, registerUser } from "../api/auth";
import {
  setCookieToken,
  setCookieRefresh,
  setLocalStorageUser,
  getCookieToken,
  getCookieRefresh,
  getlocalStorageUser,
} from "@/utils/common";
import userStore from "./modules/userStore"; // 새로 생성한 모듈 불러오기

export default createStore({
  state: {
    user: getlocalStorageUser() || {},
    token: getCookieToken() || "",
    refresh: getCookieRefresh() || "",
    lnbOpen: false,
    menus: [
      {
        title: "Home",
        icon: "mdi-home-city",
        value: "home",
        link: "/home",
      },
      {
        title: "My Chat",
        icon: "mdi-chat",
        value: "chat",
        link: "/chat",
      },
      {
        title: "Users",
        icon: "mdi-account-group-outline",
        value: "users",
        link: "/users",
      },
    ],
  },
  getters: {
    isLogin(state) {
      const isEmpty = Object.keys(state.user).length === 0;
      return !isEmpty;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setToken(state, token) {
      state.token = token;
    },

    setRefresh(state, refresh) {
      state.refresh = refresh;
    },
  },
  actions: {
    //로그인 액션
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData); //api통신
      commit("setUser", data.user); //유저 정보 state에 넣기
      setLocalStorageUser(data.user); //유저 정보 LocalStorage 넣기
      commit("setToken", data.jwt); //토큰 state에 넣기
      setCookieToken(data.jwt); //토큰 쿠키에 넣기

      commit("setRefresh", data.refresh);
      setCookieRefresh(data.refresh);

      return data;
    },

    //토큰갱신
    async RETOKEN({ commit }) {
      const refresh = {
        token: this.state.refresh,
        renew: this.state.refresh,
      };

      const { data } = await refreshToken(refresh); //api통신
      commit("setToken", data.jwt); //토큰 state에 넣기
      setCookieToken(data.jwt); //토큰 쿠키에 넣기
      commit("setRefresh", data.refresh);
      setCookieRefresh(data.refresh);
      return data;
    },

    //회원가입 액션
    // eslint-disable-next-line no-unused-vars
    async SIGNUP({ commit }, userData) {
      console.log("SIGNUP", userData);
      // commit();
      const { data } = await registerUser(userData); //api통신
      commit("setUser", data.user); //유저 정보 state에 넣기
      setLocalStorageUser(data.user); //유저 정보 LocalStorage 넣기
      commit("setToken", data.jwt); //토큰 state에 넣기
      setCookieToken(data.jwt); //토큰 쿠키에 넣기

      commit("setRefresh", data.refresh);
      setCookieRefresh(data.refresh);

      return data;
    },
  },
  modules: {
    userStore: userStore, // 새 모듈 등록
  },
});
