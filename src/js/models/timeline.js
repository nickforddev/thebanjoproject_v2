import { Model } from 'vue-models'

export default class Timeline extends Model {
  static defaults() {
    return {

    }
  }
  static schema() {
    return {
      acf: {
        type: Object,
        properties: {
          date: {
            type: Number
          }
        }
      }
    }
  }
}
