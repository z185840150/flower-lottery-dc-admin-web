import Vue from 'vue'
import VueResource from 'vue-resource'

import app from './app'

import store from './store'
import router from './router'

Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { app }
})
