import { Model } from 'vue-models'

export default class Region extends Model {
  static defaults() {
    return {
      name: 'region'
    }
  }
  static schema() {
    return {
      id: {
        type: String
      },
      slug: {
        type: String
      },
      name: {
        type: String
      }
    }
  }
}
