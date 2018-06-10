export default {
  state() {
    return {
      active_video: null,
      playing_video: false
    }
  },
  getters: {
    'video:active_video': state => {
      return state.active_video
    },
    'video:playing': state => {
      return state.playing_video
    }
  },
  mutations: {
    SET_ACTIVE_VIDEO(state, data) {
      state.active_video = data
    },
    PLAY_VIDEO(state) {
      state.playing_video = true
    },
    PAUSE_VIDEO(state) {
      state.playing_video = false
    }
  },
  actions: {
    set_active_video({ commit }, data) {
      commit('SET_ACTIVE_VIDEO', data)
    },
    play_video({ commit }) {
      commit('PLAY_VIDEO')
    },
    pause_video({ commit }) {
      commit('PAUSE_VIDEO')
    }
  }
}
