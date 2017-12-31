export default {
  state() {
    return {
      min: 1800,
      max: 1990,
      scale: 4
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
    }
  }
}
