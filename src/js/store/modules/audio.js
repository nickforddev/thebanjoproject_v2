export default {
  state() {
    return {
      active_song: null,
      playing: false
    }
  },
  getters: {
    'audio:active_song': state => {
      return state.active_song
    },
    'audio:playing': state => {
      return state.playing
    }
  },
  mutations: {
    SET_ACTIVE_SONG(state, data) {
      state.active_song = data
    },
    PLAY(state) {
      // console.log('PLAY')
      state.playing = true
    },
    PAUSE(state) {
      // console.log('PAUSE')
      state.playing = false
    }
  },
  actions: {
    set_active_song({ commit }, data) {
      commit('SET_ACTIVE_SONG', data)
    },
    play({ commit }) {
      commit('PLAY')
    },
    pause({ commit }) {
      commit('PAUSE')
    }
  }
}
