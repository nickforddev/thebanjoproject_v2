import Vue from 'vue'
import Vuex from 'vuex'
import timeline from './modules/timeline'

Vue.use(Vuex)

const modules = [
  timeline
]

export default new Vuex.Store({
  modules,
  mutations: {

  },
  actions: {

  }
})
