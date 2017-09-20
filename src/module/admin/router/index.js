import Vue from 'vue'
import Router from 'vue-router'

import home from './../vue/home'

import overviewOpen from './../vue/overview/open'
import overviewTrend from './../vue/overview/trend'

import openManager from './../vue/open/manager'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: home },
    { path: '/overview/open', name: 'overview open', component: overviewOpen },
    { path: '/overview/trend', name: 'overview trend', component: overviewTrend },

    { path: '/open/manager', name: 'open manager', component: openManager }
  ]
})
