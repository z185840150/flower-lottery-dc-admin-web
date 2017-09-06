import Vue from 'vue'
import Vuex from 'vuex'

import api from './src/api'
import base from './src/base'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    base
  }
})
