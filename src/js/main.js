// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/main'
import router from './router'

import VueRequests from 'vue-requests'
import VueModels from 'vue-models'
import VueCollections from 'vue-collections'

// global styles
import '../scss/styles.scss'

// custom components
import Loading from '@/components/loading'

import Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster)

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-popup', Vue2Leaflet.Popup)

// eslint-disable-next-line  
delete L.Icon.Default.prototype._getIconUrl  
// eslint-disable-next-line  
L.Icon.Default.mergeOptions({  
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const components = [
  Loading
]

components.map(component => {
  Vue.component(component.name, component)
})

Vue.use(VueRequests, {
  // root: 'http://thebanjoproject.org/demo/wp-json/'
  root: 'http://45.55.144.174/wp-json/'
})
Vue.use(VueModels, {
  schemaWarnings: false
})
Vue.use(VueCollections)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
