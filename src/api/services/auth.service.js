import axios from "axios";

import config from "../config";
import authHeader from "./auth-header";

var API_URL = config.API_URL;

class AuthService {
  validateLoggedIn() {
    if (localStorage.getItem("user") == null) {
      return;
    }
    if (authHeader().Authorization == undefined) {
      localStorage.removeItem("user");
      window.location = window.location.href;
    }
    axios
      .get(API_URL + "user", {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data.isError) {
          localStorage.removeItem("user");
          window.location = window.location.href;
        } else {
          var data = JSON.parse(localStorage.getItem("user"));
          data.user = response.data.result;
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch(() => {
        localStorage.removeItem("user");
        window.location = window.location.href;
      });
  }

  login(user) {
    return axios.post(API_URL + "auth/login", {
      email: user.email,
      password: user.password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "auth/register", {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      phone: user.phone,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
  }
}

export default new AuthService();
