export default {
  state() {
    return {
      active_song: null,
      audio_playing: false
    }
  },
  getters: {
    'audio:active_song': state => {
      return state.active_song
    },
    'audio:playing': state => {
      return state.audio_playing
    }
  },
  mutations: {
    SET_ACTIVE_SONG(state, data) {
      state.active_song = data
    },
    PLAY_AUDIO(state) {
      state.audio_playing = true
    },
    PAUSE_AUDIO(state) {
      state.audio_playing = false
    }
  },
  actions: {
    set_active_song({ commit }, data) {
      commit('SET_ACTIVE_SONG', data)
    },
    play_audio({ commit }) {
      commit('PLAY_AUDIO')
    },
    pause_audio({ commit }) {
      commit('PAUSE_AUDIO')
    }
  }
}
