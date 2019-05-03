import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import RegisterStart from './views/RegisterStart.vue'
import RegisterDetails from './views/RegisterDetails.vue'
import RegisterFinal from './views/RegisterFinal.vue'
import BecomeT1 from './views/BecomeT1.vue'
import BecomeT2 from './views/BecomeT2.vue'
import UploadClothes from './views/UploadClothes.vue'
import ViewCategory from './views/ViewCategory.vue'
import ViewClothes from './views/ViewClothes.vue'
import ViewTailor from './views/ViewTailor.vue'
import Search from './views/Search.vue'
import PayForClothes from './views/PayForClothes.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgotpassword',
      name: 'forgot-password',
      component: ForgotPassword
    },{
      path: '/register',
      name: 'register-start',
      component: RegisterStart
    },
    {
      path: '/register/details',
      name: 'register-details',
      component: RegisterDetails
    },
    {
      path: '/register/:username',
      name: 'register-final',
      component: RegisterFinal
    },
    {
      path: '/register/trader',
      name: 'register-trader',
      component: BecomeT1
    },
    {
      path: '/register/tailor',
      name: 'register-tailor',
      component: BecomeT2
    },
    {
      path: '/upload/clothes',
      name: 'upload-clothes',
      component: UploadClothes
    },
    {
      path: '/category/:category',
      name: 'category',
      component: ViewCategory
    },
    {
      path: '/view/:page',
      name: 'view-page',
      component: ViewClothes
    },
    {
      path: '/tailor/:tailor',
      name: 'tailor',
      component: ViewTailor
    },
    {
      path: '/search/:query',
      name: 'search',
      component: Search
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: PayForClothes
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
