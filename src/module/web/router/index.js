import Vue from 'vue'
import Router from 'vue-router'

import home from './../vue/home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: home },
    { path: '/play_method',
      name: 'Play Method',
      component: require('./../vue/play_method/play_method.vue'),
      children: [{
        path: 'fb',
        name: 'Football',
        component: require('./../vue/play_method/fb/fb.vue'),
        children: [{
          path: 'hhad',
          name: 'HHAD',
          component: require('./../vue/play_method/fb/hhad.vue')
        }]
      }]
    }
  ]
})
