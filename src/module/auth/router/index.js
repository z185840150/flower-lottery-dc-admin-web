import Vue from 'vue'
import Router from 'vue-router'

import login from './../vue/login'
import forgot from './../vue/forgot'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: login },
    { path: '/login', name: 'Login', component: login },
    { path: '/forgot', name: 'Forgot', component: forgot }
  ]
})
