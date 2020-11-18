import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('./views/UserPage.vue')
    }, 
    {
      path: '/signup/',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    }, 
    {
      // Used to catch error pages
      path: '*',
      name: 'error',
      component: () => import('./views/ErrorPage.vue')
    }, 

  ]
})