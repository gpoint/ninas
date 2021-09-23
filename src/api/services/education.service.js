import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class UserService {
  getEducationList() {
    return axios.get(API_URL + "education", { headers: authHeader() });
  }

  addEducation(education) {
    return axios.post(API_URL + "education", education, {
      headers: authHeader(),
    });
  }

  saveEducation(education, index) {
    return axios.post(API_URL + "education/" + index, education, {
      headers: authHeader(),
    });
  }

  uploadCertificate(id, file) {
    var formData = new FormData();
    formData.append("file", file);

    var headers = {
      "Content-Type": "multipart/form-data",
      Authorization: authHeader().Authorization,
    };

    return axios.post(API_URL + "education/certificate/" + id, formData, {
      headers,
      // onUploadProgress: progressFunction,
    });
  }

  getCertificate(index) {
    return axios.get(API_URL + "education/" + index + "/certificate", {
      headers: authHeader(),
    });
  }

  deleteEducation(id) {
    return axios.delete(API_URL + "education/" + id, { headers: authHeader() });
  }
}

export default new UserService();
