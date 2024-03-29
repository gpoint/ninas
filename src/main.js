/*!

=========================================================
* Vue Argon Dashboard - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";

// import { FontAwesomeIcon } from '@fontawesome/vue-fontawesome';

const appInstance = createApp(App);

appInstance.use(router);
appInstance.use(store);
appInstance.use(ArgonDashboard);

// appInstance.component('font-awesome-icon', FontAwesomeIcon);

appInstance.mount("#app");
