import { Model } from 'vue-models'

export default class Player extends Model {
  static defaults() {
    return {
      name: 'people'
    }
  }
  static schema() {
    return {
      id: {
        type: String
      },
      title: {
        type: Object
      },
      content: {
        type: Object
      },
      acf: {
        type: Object
      },
      tags: {
        type: Array
      },
      style: {
        type: Array
      },
      slug: {
        type: String
      }
    }
  }
}
