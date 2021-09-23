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
          commit("loginSuccess", {
            user: response.data,
            success: obj.success,
          });
        })
        .catch(obj.error);
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, obj) {
      AuthService.register(obj.model)
        .then((response) => {
          commit("registerSuccess", {
            user: response.data,
            success: obj.success,
          });
        })
        .catch(obj.error);
    },
  },
  mutations: {
    loginSuccess(state, obj) {
      state.status.loggedIn = true;
      state.user = obj.user;
      obj.success(obj.user);
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, obj) {
      state.status.loggedIn = true;
      state.user = obj.user;
      obj.success(obj.user);
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
