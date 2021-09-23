import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class UserService {
  getPortfolioList() {
    return axios.get(API_URL + "portfolio", { headers: authHeader() });
  }

  addPortfolio(portfolio) {
    return axios.post(API_URL + "portfolio", portfolio, {
      headers: authHeader(),
    });
  }

  savePortfolio(portfolio) {
    return axios.post(API_URL + "portfolio/" + portfolio.id, portfolio, {
      headers: authHeader(),
    });
  }

  deletePortfolio(id) {
    return axios.delete(API_URL + "portfolio/" + id, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
