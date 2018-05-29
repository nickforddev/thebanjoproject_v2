import Vue from 'vue'
import Vuex from 'vuex'
import timeline from './modules/timeline'
import audio from './modules/audio'

Vue.use(Vuex)

const modules = [
  timeline,
  audio
]

const store = new Vuex.Store({
  modules
  // mutations: {
  // },
  // actions: {
  // }
})

export default store
