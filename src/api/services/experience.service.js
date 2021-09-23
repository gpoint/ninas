import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class UserService {
  getExperienceList() {
    return axios.get(API_URL + "experience", { headers: authHeader() });
  }

  addExperience(experience) {
    return axios.post(API_URL + "experience", experience, {
      headers: authHeader(),
    });
  }

  saveExperience(experience, index) {
    return axios.post(API_URL + "experience/" + index, experience, {
      headers: authHeader(),
    });
  }

  deleteExperience(id) {
    return axios.delete(API_URL + "experience/" + id, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
