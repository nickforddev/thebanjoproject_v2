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

Vue.use(VueRequests, {
  // root: 'http://thebanjoproject.org/demo/wp-json/'
  root: 'http://45.55.144.174/wp-json/'
})
Vue.use(VueModels)
Vue.use(VueCollections)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
