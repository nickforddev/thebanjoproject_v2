import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Intro',
      component(resolve) {
        require(['@/views/intro'], resolve)
      },
    },
    {
      path: '/narratives',
      name: 'Narratives',
      component(resolve) {
        require(['@/views/narratives'], resolve)
      },
    },
    {
      path: '/narratives/:slug',
      name: 'Narrative',
      component(resolve) {
        require(['@/views/narratives/view'], resolve)
      },
    },
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
          },
        },
      ],
    },
    {
      path: '/maps',
      name: 'Maps',
      component(resolve) {
        require(['@/views/maps/index'], resolve)
      },
      children: [
        {
          path: '/maps/region/:regionSlug',
          name: 'Map Region',
          component(resolve) {
            require(['@/views/maps/index'], resolve)
          },
        },
        {
          path: '/maps/location/:slug',
          name: 'Map Marker',
          component(resolve) {
            require(['@/views/maps/content'], resolve)
          },
        },
      ],
    },
    {
      path: '/timelines',
      name: 'Timelines',
      component(resolve) {
        require(['@/views/timelines/'], resolve)
      },
      children: [
        {
          path: ':slug',
          name: 'Timeline',
          component(resolve) {
            require(['@/views/timelines/view'], resolve)
          },
        },
      ],
    },
    {
      path: '/media',
      name: 'Media',
      redirect: '/media/full-interviews',
      component(resolve) {
        require(['@/views/media'], resolve)
      },
      children: [
        // {
        //   path: 'watch/:slug',
        //   name: 'Video',
        //   component(resolve) {
        //     require(['@/views/videos/view'], resolve)
        //   }
        // },
        {
          path: ':type',
          name: 'Media Type',
          component(resolve) {
            require(['@/views/media/list'], resolve)
          },
        },
      ],
    },
    {
      path: '/search',
      name: 'Search',
      component(resolve) {
        require(['@/views/search'], resolve)
      },
    },
    {
      path: '/search/:term',
      name: 'Search Results',
      component(resolve) {
        require(['@/views/search'], resolve)
      },
    },
    {
      path: '/about',
      name: 'About',
      component(resolve) {
        require(['@/views/about'], resolve)
      },
    },
    {
      path: '/help',
      name: 'Help',
      component(resolve) {
        require(['@/views/help'], resolve)
      },
    },
    {
      path: '/resources',
      name: 'Resources',
      component(resolve) {
        require(['@/views/resources'], resolve)
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  store.dispatch('pause_audio')
  next()
})

export default router
