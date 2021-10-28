import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class UserService {
  getProfile() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  saveProfile(user) {
    return axios.put(API_URL + "user", user, {
      headers: authHeader(),
    });
  }

  uploadProfilePicture(file, handleProgress) {
    return axios.post(API_URL + "user/upload-photo", file, {
      onUploadProgress: handleProgress,
      headers: authHeader()
    });
  }
}

export default new UserService();
