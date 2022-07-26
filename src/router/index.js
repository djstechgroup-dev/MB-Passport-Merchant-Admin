import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'
import HomeCards from '../views/HomeCards.vue'
import AllDeals from '../views/AllDeals.vue'
import NewDeal from '../views/NewDeal.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import CreateNewPassword from  '../views/Create-Password.vue'
import AdminAllDeals from '../views/admin/AdminAllDeals.vue'
import AdminHome from '../views/admin/AdminHome.vue'
import AdminHomeCards from '../views/admin/AdminHomeCards.vue'
import AdminAllBusiness from '../views/admin/AdminAllBusiness.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {path: '', component: HomeCards},
      {path: 'settings', component: Settings},
      {path: 'alldeals', component: AllDeals},
      {path: 'newdeal', component: NewDeal}
    ]
    // meta: {
    //   requiresAuth: true
    // }
  },  
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    children: [
      {path: '', component: AdminHomeCards},
      {path: 'adminalldeals', component: AdminAllDeals},
      {path: 'adminallbusiness', component: AdminAllBusiness},
      {path: 'adminsettings', component: Settings},
    ]
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword
  },
  {
    path: '/create-new-password',
    name: 'Create New Password',
    component: CreateNewPassword
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/register' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/register')
    return;
  }

  next();
})

export default router
