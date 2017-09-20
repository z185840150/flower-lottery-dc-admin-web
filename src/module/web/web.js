import Vue from 'vue'
import VueResource from 'vue-resource'

import app from './app'

import store from './store'
import router from './router'

import VueScroller from 'vue-scroller'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueResource)
// Vue.use(iView)
Vue.use(VueScroller)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { app }
})
