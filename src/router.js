import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Map.vue')
    }, 
    {
      // Used to catch error pages
      path: '*',
      name: 'error',
      component: () => import('./views/ErrorPage.vue')
    }, 
    {
      path: '/business',
      name: 'businessAccount',
      component: () => import('./views/BusinessAccount.vue'),
    },
    {
      path: '/customer',
      name: 'customerAccount',
      component: () => import('./views/CustomerAccount.vue'),
    },
    {
      path: '/business-homepage',
      name: 'businessHomepage',
      component: () => import('./views/BusinessHomepage.vue'),
    },
    {
      path: '/customer-profile',
      name: 'customerProfile',
      component: () => import('./views/CustomerProfile.vue'),
    }
  ]
})