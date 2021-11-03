import axios from "axios";
import authHeader from "./auth-header";

import config from "../config";

var API_URL = config.API_URL;

class NotificationService {
  getNotifications() {
    return axios.get(API_URL + "notifications", { headers: authHeader() });
  }

  getNotification(notificationId) {
    return axios.get(API_URL + "notifications/" + notificationId, { headers: authHeader() });
  }

  getSentNotifications () {
    return axios.get(API_URL + "notifications/sent", { headers: authHeader() });
  }

  clearNotifications() {
    return axios.get(API_URL + "notifications/clear", { headers: authHeader() });
  }

  sendNotification(notification) {
    return axios.post(API_URL + "notifications", notification, {
      headers: authHeader(),
    });
  }
  

  acceptNotification(notificationId) {
    return axios.post(API_URL + "notifications/accept/" + notificationId, {
      headers: authHeader(),
    });
  }

  declineNotification(notificationId) {
    return axios.post(API_URL + "notifications/decline/" + notificationId, {
      headers: authHeader(),
    });
  }
  
}

export default new NotificationService();
