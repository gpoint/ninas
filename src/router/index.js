import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import Account from "../views/Account.vue";

import AuthLayout from "@/layout/AuthLayout";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

//Admin Views
import Dashboard from "../views/Dashboard.vue";

//Assessor Views
import AssessorProfile from "../views/AssessorProfile.vue";

//Administrator Views
import Assessors from "../views/Assessors.vue";


const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/account",
        name: "account",
        components: { default: Account },
      },
      {
        path: "/assessor",
        name: "assessor",
        components: { default: AssessorProfile },
      },
      {
        path: "/assessors",
        name: "assessors",
        components: { default: Assessors },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/forgot-password",
        name: "forgot",
        components: { default: ForgotPassword },
      },
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  const pages = {
    PUBLIC: ["login", "register", "home", "support"],
    PROTECTED: ["account"],
    ASSESSOR: ["assessor", "experience", "education", "referees"],
    ZONAL_COORDINATOR: ["zonal-coordinator"],
    MANAGER: ["manager"],
    ADMINISTRATOR: ["assessors"],
  };

  const authRequired = !pages.PUBLIC.includes(to.name);
  var loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired) {
    if (!loggedIn) {
      next("/login");
    }

    loggedIn = JSON.parse(loggedIn);

    if (loggedIn.tokenType != "Bearer") {
      next("/login");
    }

    if (
      !pages[loggedIn.user.role].includes(to.name) &&
      !pages.PROTECTED.includes(to.name)
    ) {
      next(pages[loggedIn.user.role][0]);
      return;
    }
  }
  next();
});

export default router;
