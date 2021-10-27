import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class AssessorService {
  getProfile() {
    return axios.get(API_URL + "assessor", { headers: authHeader() });
  }

  saveProfile(assessor) {
    return axios.put(API_URL + "assessor", assessor, {
      headers: authHeader(),
    });
  }

  // Education
  addAcademicDegree(degree) {
    return axios.post(API_URL + "assessor/education", degree, {
      headers: authHeader(),
    });
  }

  updateAcademicDegree(index, degree) {
    return axios.put(API_URL + "assessor/education/" + index, degree, {
      headers: authHeader(),
    });
  }

  uploadDegreeCertificate(index, formData) {
    return axios.put(API_URL + "assessor/education/" + index, formData, {
      headers: authHeader(),
    });
  }

  deleteAcademicDegree(index) {
    return axios.delete(API_URL + "assessor/education/" + index, {
      headers: authHeader(),
    });
  }

  // Experience
  addJob(job) {
    return axios.post(API_URL + "assessor/experience", job, {
      headers: authHeader(),
    });
  }

  updateJob(index, job) {
    return axios.put(API_URL + "assessor/experience/" + index, job, {
      headers: authHeader(),
    });
  }

  uploadJobEvidence(index, formData) {
    return axios.put(API_URL + "assessor/experience/" + index, formData, {
      headers: authHeader(),
    });
  }

  deleteJob(index) {
    return axios.delete(API_URL + "assessor/experience/" + index, {
      headers: authHeader(),
    });
  }

  // Referees
  addReferee(referee) {
    return axios.post(API_URL + "assessor/referee", referee, {
      headers: authHeader(),
    });
  }

  updateReferee(index, referee) {
    return axios.put(API_URL + "assessor/referee/" + index, referee, {
      headers: authHeader(),
    });
  }

  deleteReferee(index) {
    return axios.delete(API_URL + "assessor/referee/" + index, {
      headers: authHeader(),
    });
  }
}

export default new AssessorService();
