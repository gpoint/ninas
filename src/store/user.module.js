import UserService from "../api/services/user.service";

const data = JSON.parse(localStorage.getItem("user"));
const initialState = data
  ? { status: { loggedIn: true }, data }
  : { status: { loggedIn: false }, data: null };

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    getProfile({ commit }) {
      UserService.getProfile().then((response) => {
        commit("saveProfile", response.data);
      });
    },
  },
  mutations: {
    saveProfile(state, data) {
      state.profile = data.result;
    },
  },
};
