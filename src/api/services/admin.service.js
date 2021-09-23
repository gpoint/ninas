import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class AdminService {
  getAssessors() {
    return axios.get(API_URL + "admin/assessors", { headers: authHeader() });
  }

  saveProfile(admin) {
    return axios.post(API_URL + "admin/profile", admin, {
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

export default new AdminService();
