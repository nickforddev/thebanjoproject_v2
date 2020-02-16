import Vue from 'vue'
import App from './components/main'
import router from './router'
import store from './store'

import filters from './modules/filters'

// core plugins
import VueRequests from 'vue-requests'
import VueModels from 'vue-models'
import VueCollections from 'vue-collections'
import VeeValidate from 'vee-validate'

// maps plugins
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

// vimeo
import VueVimeoPlayer from 'vue-vimeo-player'

// global styles
import './scss/styles.scss'

import config from '@/config'

// custom components
import Loading from '@/components/loading'
import Field from '@/components/field'
import Player from '@/components/player'
import Validation from '@/components/validation'
import Slideshow from '@/components/slideshow'
import ComingSoon from '@/components/comingsoon'

// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl

// eslint-disable-next-line
L.Icon.Default.mergeOptions({  
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const components = [
  Loading,
  Field,
  Player,
  Validation,
  Slideshow,
  ComingSoon
]

for (let key in filters) {
  Vue.filter(key, filters[key])
}
Vue.use(VueRequests, {
  root: `${config.api}wp-json/`
})
Vue.use(VueModels, {
  schemaWarnings: false
})
Vue.use(VueCollections)
Vue.use(VeeValidate)
Vue.use(VueVimeoPlayer)

components.map(component => {
  Vue.component(component.name, component)
})

// LMap, LTileLayer, LMarker

Vue.component('v-map', LMap)
Vue.component('v-tilelayer', LTileLayer)
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster)
Vue.component('v-marker', LMarker)
Vue.component('v-popup', LPopup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const TABFOCUS_CLASSNAME = 'tabfocus'

window.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    document.body.classList.add(TABFOCUS_CLASSNAME)
  }
})

window.addEventListener('mousedown', () => {
  document.body.classList.remove(TABFOCUS_CLASSNAME)
})
