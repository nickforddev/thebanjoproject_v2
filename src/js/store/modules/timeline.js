export default {
  state() {
    return {
      min: 1800,
      max: 1990,
      scale: 4,
      timelines: null,
      active_event: null
    }
  },
  getters: {
    'timeline:min': (state) => {
      return state.min
    },
    'timeline:max': (state) => {
      return state.max
    },
    'timeline:scale': (state) => {
      return state.scale
    },
    'timelines': (state) => {
      return state.timelines
    },
    'active_event': (state) => {
      return state.active_event
    }
  },
  mutations: {
    SET_TIMELINES(state, data) {
      state.timelines = data
    },
    SET_ACTIVE_EVENT(state, data) {
      state.active_event = data
    }
  },
  actions: {
    set_timelines({ commit }, data) {
      commit('SET_TIMELINES', data)
    },
    set_active_event({ commit }, data) {
      commit('SET_ACTIVE_EVENT', data)
    }
  }
}
