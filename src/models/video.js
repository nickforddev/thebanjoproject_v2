import { Model } from 'vue-models'

export default class Video extends Model {
  static defaults() {
    return {
      name: 'video'
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
      },
      title: {
        type: Object
      },
      status: {
        type: String
      }
    }
  }
}
