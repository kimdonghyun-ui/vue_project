import { getUserList } from "../../api/posts";

const getDefaultState = () => {
  return {
    users: [],
  };
};

const postStore = {
  namespaced: true,
  state: getDefaultState(),
  getters: {},
  mutations: {
    setResponse(state, data) {
      state.users = data;
    },
  },
  actions: {
    async getUsers({ commit }) {
      const { data } = await getUserList(); //api통신
      console.log("액션", data);
      commit("setResponse", data); //유저 정보 state에 넣기

      // setCookieRefresh(data.refresh);

      return data;
    },
  },
};

export default postStore;
