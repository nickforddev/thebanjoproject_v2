import { Model } from 'vue-models'

export default class Timeline extends Model {
  static defaults() {
    return {

    }
  }
  static schema() {
    return {
      id: {
        type: Number
      },
      title: {
        type: Object
      },
      acf: {
        type: Object,
        properties: {
          date: {
            type: Number
          }
        }
      },
      slug: {
        type: String
      },
      _links: {
        type: Object
      }
    }
  }
}
