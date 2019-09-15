import Vue from 'vue'
import Vuex from 'vuex'
import timeline from './modules/timeline'
import audio from './modules/audio'
import video from './modules/video'

Vue.use(Vuex)

const modules = [
  timeline,
  audio,
  video
]

const store = new Vuex.Store({
  modules
  // mutations: {
  // },
  // actions: {
  // }
})

export default store
