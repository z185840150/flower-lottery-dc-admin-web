import Vue from 'vue'
import VueResource from 'vue-resource'

import app from './app'

import store from './store'
import router from './router'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import VueScroller from 'vue-scroller'

Vue.use(VueResource)
Vue.use(iView)
Vue.use(VueScroller)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { app }
})
