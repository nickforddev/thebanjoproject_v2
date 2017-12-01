import { Model } from 'vue-models'

export default class Style extends Model {
  static defaults() {
    return {
      name: 'style'
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
