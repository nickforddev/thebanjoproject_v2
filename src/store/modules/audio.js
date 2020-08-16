export default {
  state() {
    return {
      active_song: null,
      active_playlist: null,
      audio_playing: false
    }
  },
  getters: {
    'audio:active_song': state => {
      return state.active_song
    },
    'audio:active_playlist': state => {
      return state.active_playlist
    },
    'audio:active_song_index': state => {
      if (!state.active_playlist) return null
      return state.active_playlist.acf.songs.findIndex(({ song }) => {
        return state.active_song.ID === song.ID
      })
    },
    'audio:playing': state => {
      return state.audio_playing
    }
  },
  mutations: {
    SET_ACTIVE_SONG(state, data) {
      state.active_song = data
    },
    SET_ACTIVE_PLAYLIST(state, data) {
      state.active_playlist = data
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
    set_active_playlist({ commit }, data) {
      commit('SET_ACTIVE_PLAYLIST', data)
    },
    play_audio({ commit }) {
      commit('PLAY_AUDIO')
    },
    pause_audio({ commit }) {
      commit('PAUSE_AUDIO')
    },
    async play_song({ dispatch }, { song, playlist }) {
      dispatch('set_active_playlist', playlist)
      dispatch('set_active_song', song)
    }
  }
}
