export default {
  state() {
    return {
      min: 1800,
      max: 1990,
      scale: 4,
      padding: 20,
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
    'timeline:padding': (state) => {
      return state.padding
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
    },
    SET_MIN(state, min) {
      state.min = min
    },
    SET_MAX(state, max) {
      state.max = max
    }
  },
  actions: {
    set_timelines({ commit }, data) {
      commit('SET_TIMELINES', data)
    },
    set_active_event({ commit }, data) {
      commit('SET_ACTIVE_EVENT', data)
    },
    set_min({ commit }, min) {
      commit('SET_MIN', min)
    },
    set_max({ commit }, max) {
      commit('SET_MAX', max)
    }
  }
}
