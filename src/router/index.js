import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Education from "../views/Education.vue";
import Experience from "../views/Experience.vue";
import Portfolio from "../views/Portfolio.vue";
import Account from "../views/Account.vue";

import Profile from "../views/UserProfile.vue";
import Assessors from "../views/Assessors.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

const routes = [
  {
    path: "/",
    redirect: "/profile",
    component: DashboardLayout,
    children: [
      {
        path: "/education",
        name: "education",
        components: { default: Education },
      },
      {
        path: "/experience",
        name: "experience",
        components: { default: Experience },
      },
      {
        path: "/portfolio",
        name: "portfolio",
        components: { default: Portfolio },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/account",
        name: "account;",
        components: { default: Account },
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
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home", "/support"];
  const authRequired = !publicPages.includes(to.path);
  var loggedIn = localStorage.getItem("user");

  const assessorRoutes = ["/portfolio", "/experience", "/education", "/as"];
  const adminRoutes = ["/assessors"];

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
      assessorRoutes.includes(to.path) &&
      !loggedIn.user.roles.includes("ASSESSOR")
    ) {
      next("/login");
    }
    if (
      adminRoutes.includes(to.path) &&
      !loggedIn.user.roles.includes("ADMINISTRATOR")
    ) {
      next("/login");
    }
  }
  next();
});

export default router;
