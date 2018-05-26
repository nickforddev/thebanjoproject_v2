import Vue from 'vue'
import Vuex from 'vuex'
import timeline from './modules/timeline'
import audio from './modules/audio'

Vue.use(Vuex)

const modules = [
  timeline,
  audio
]

export default new Vuex.Store({
  modules
  // mutations: {
  // },
  // actions: {
  // }
})
