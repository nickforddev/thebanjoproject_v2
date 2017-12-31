import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/players',
      name: 'Players',
      component(resolve) {
        require(['@/views/players'], resolve)
      },
      children: [
        {
          path: ':slug',
          name: 'Player',
          component(resolve) {
            require(['@/views/players/profile'], resolve)
          }
        }
      ]
    },
    {
      path: '/maps',
      name: 'Maps',
      component(resolve) {
        require(['@/views/maps/'], resolve)
      }
    },
    {
      path: '/maps/:region',
      name: 'Map',
      component(resolve) {
        require(['@/views/maps/region'], resolve)
      }
    },
    {
      path: '/timelines',
      name: 'Timelines',
      component(resolve) {
        require(['@/views/timelines/'], resolve)
      }
    }
  ]
})
