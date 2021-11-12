import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class AssessorService {
  getProfile() {
    return axios.get(API_URL + "assessor", { headers: authHeader() });
  }

  getAssessor(userId) {
    return axios.get(API_URL + "assessor/user/" + userId, { headers: authHeader() });
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
    return axios.patch(API_URL + "assessor/education/" + index, formData, {
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

  // CAB xperience
  addCABJob(job) {
    return axios.post(API_URL + "assessor/cab-experience", job, {
      headers: authHeader(),
    });
  }

  updateCABJob(index, job) {
    return axios.put(API_URL + "assessor/cab-experience/" + index, job, {
      headers: authHeader(),
    });
  }

  uploadCABJobEvidence(index, formData) {
    return axios.put(API_URL + "assessor/cab-experience/" + index, formData, {
      headers: authHeader(),
    });
  }

  deleteCABJob(index) {
    return axios.delete(API_URL + "assessor/cab-experience/" + index, {
      headers: authHeader(),
    });
  }

  // Portfolios
  addPortfolio(portfolio) {
    return axios.post(API_URL + "assessor/portfolio", portfolio, {
      headers: authHeader(),
    });
  }

  updatePortfolio(index, portfolio) {
    return axios.put(API_URL + "assessor/portfolio/" + index, portfolio, {
      headers: authHeader(),
    });
  }

  deletePortfolio(index) {
    return axios.delete(API_URL + "assessor/portfolio/" + index, {
      headers: authHeader(),
    });
  }

  getAssessors() {
    return axios.get(API_URL + "assessor/paged", {
      headers: authHeader(),
    });
  }
}

export default new AssessorService();
