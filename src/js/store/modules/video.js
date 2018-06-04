export default {
  state() {
    return {
      active_video: null,
      playing: false
    }
  },
  getters: {
    'video:active_video': state => {
      return state.active_video
    },
    'video:playing': state => {
      return state.playing
    }
  },
  mutations: {
    SET_ACTIVE_VIDEO(state, data) {
      state.active_video = data
    },
    PLAY(state) {
      state.playing = true
    },
    PAUSE(state) {
      state.playing = false
    }
  },
  actions: {
    set_active_video({ commit }, data) {
      commit('SET_ACTIVE_VIDEO', data)
    },
    play({ commit }) {
      commit('PLAY')
    },
    pause({ commit }) {
      commit('PAUSE')
    }
  }
}
