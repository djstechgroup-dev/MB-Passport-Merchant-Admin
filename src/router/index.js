import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/components/layouts/AppLayout.vue'

import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import Help from '@/views/Help.vue'

import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import CreateNewPassword from  '@/views/auth/Create-Password.vue'

import AllDeals from '@/views/deals/Deals.vue'
import NewDeal from '@/views/deals/NewDeal.vue'
import EditDeal from '@/views/deals/EditDeal.vue'

import Business from '@/views/business/Business.vue'
import NewBusiness from '@/views/business/NewBusiness.vue'
import EditBusiness from '@/views/business/EditBusiness.vue'

import NewLocation from '@/views/location/NewLocation.vue'
import EditLocation from '@/views/location/EditLocation.vue'

import AdminLayout from '@/components/layouts/AdminLayout.vue'

import AdminAllDeals from '@/views/admin/AdminAllDeals.vue'
import AdminDealOfTheDay from '@/views/admin/AdminDealOfTheDay.vue'
import Dashboard from '@/views/admin/AdminHome.vue'
import AdminAllBusiness from '@/views/admin/AdminAllBusiness.vue'

import authService from '@/services/auth.service'
import {auth} from '@/firebase'

const USER_ROLE = {
  Admin: 0,
  Merchant: 1
}

const authMiddleware = async (to, from, next) => {

  let userRole
  const {authorize} = to.meta
  const user = auth.currentUser

  try {
      const res = await authService.getAuthUser()
      userRole = res.role
  } catch (error) {
    console.log(error)
  }

  if((to.path === '/login' || to.path === '/register') && user) {
    return next({path: '/'})
  }

  if(to.matched.some(rec => rec.meta.requiresAuth)) {

      if(!user) {
        return next({path: '/login'})
      }

      if(authorize !== userRole && to.path === '/admin') {
        return next({path: '/'})
      }

      if(authorize !== userRole && to.path !== '/admin') {
        return next({path: '/admin'})
      }
  } 
  next()

}


const routes = [
  {
    path: '/',
    name: 'merchant',
    component: AppLayout,
    children: [
      {
        name: 'merchant-home',
        path: '/', 
        component: Home,
        meta: {
          display: true,
          label: 'Home'
        }
      },
      {
        name: 'merchant-deals',
        path: '/deals', 
        component: AllDeals,
        meta: {
          display: true,
          label: 'All Deals'
        }
      },
      {
        name: 'merchant-new-deal',
        path: '/new-deal',
        component: NewDeal,
        meta: {
          display: true,
          label: 'New Deals'
        }
      },
      {
        name: 'merchant-edit-deal',
        path: '/edit-deal/:id', 
        component: EditDeal,
        meta: {
          display: false
        }
      },
      {
        name: 'merchant-business',
        path: '/business', 
        component: Business,
        meta: {
          display: true,
          label: 'Manage Business'
        }
      },
      {
        name: 'merchant-new-business',
        path: '/new-business',
        component: NewBusiness,
        meta: {
          display: true,
          label: 'New Business'
        }
      },
      {
        name: 'merchant-edit-business',
        path: '/edit-business/:id', 
        component: EditBusiness,
        meta: {
          display: false
        }
      },
      {
        name: 'merchant-new-business-location',
        path: '/new-business-location/:id',
        component: NewLocation,
        meta: {
          display: false
        }
      },
      {
        name: 'merchant-edit-business-location',
        path: '/edit-business-location/:id',
        component: EditLocation,
        meta: {
          display: false
        }
      },
      {
        name: 'merchant-settings',
        path: '/settings', 
        component: Settings,
        meta: {
          display: true,
          label: 'Settings'
        }
      },
      {
        name: 'merchant-help',
        path: '/help', 
        component: Help,
        meta: {
          display: true,
          label: 'Help'
        }
      }
    ],
    meta: {
      requiresAuth: true,
      authorize: USER_ROLE.Merchant
    }
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    children: [
      {
        name: 'admin-home',
        path: '', 
        component: Dashboard,
        meta: {
          display: true,
          label: 'Home'
        }
      },
      {
        name: 'admin-deals',
        path: 'deals', 
        component: AdminAllDeals,
        meta: {
          display: true,
          label: 'Home'
        }
      },
      {
        name: 'admin-business',
        path: 'business', 
        component: AdminAllBusiness,
        meta: {
          display: true,
          label: 'Home'
        }
      },
      {
        name: 'admin-settings',
        path: 'settings', 
        component: AdminDealOfTheDay,
        meta: {
          display: true,
          label: 'Home'
        }
      }
    ],
    meta: {
      requiresAuth: true,
      authorize: USER_ROLE.Admin
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

router.beforeEach(authMiddleware)

export default router
