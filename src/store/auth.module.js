import AuthService from "../api/services/auth.service";

AuthService.validateLoggedIn();

const data = JSON.parse(localStorage.getItem("user"));
const initialState = data
  ? { status: { loggedIn: true }, data }
  : { status: { loggedIn: false }, data: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, obj) {
      AuthService.login(obj.model)
        .then((response) => {
          commit("loginSuccess", response.data);
          obj.success(response.data);
        })
        .catch((error) => obj.failure(error));
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, obj) {
      AuthService.register(obj.model)
        .then((response) => {
          commit("registerSuccess", response.data);
          obj.success(response.data);
        })
        .catch((error) => obj.failure(error));
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, user) {
      state.status.loggedIn = false;
      state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
