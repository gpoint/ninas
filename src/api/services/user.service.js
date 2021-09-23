import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class UserService {
  getProfile() {
    return axios.get(API_URL + "user/profile", { headers: authHeader() });
  }

  saveProfile(user) {
    return axios.post(API_URL + "user/profile", user, {
      headers: authHeader(),
    });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
