import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class UtilService {

  uploadPicture(url, file, handleProgress) {
    return axios.post(API_URL + url, file, {
      onUploadProgress: handleProgress,
      headers: authHeader()
    });
  }

  removePicture(url) {
    return axios.delete(API_URL + url, {
      headers: authHeader()
    });
  }
}

export default new UtilService();
