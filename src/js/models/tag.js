import { Model } from 'vue-models'

export default class Tag extends Model {
  static defaults() {
    return {
      name: 'tag'
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
