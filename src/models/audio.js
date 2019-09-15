import { Model } from 'vue-models'

export default class Audio extends Model {
  static defaults() {
    return {
      name: 'audio'
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
