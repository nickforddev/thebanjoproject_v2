<template>
  <div v-if="type === 'playlists'">
    <playlists />
  </div>
  <div v-else-if="fetched" @scroll="onScroll">
    <div class="search">
      <pre></pre>
      <button v-if="!show_filters && filters && filters.length" @click="showFilters">
        Filters
        <svg viewBox="0 0 100 125">
          <path
            d="M66.501,15.537c-14.052-14.051-36.913-14.049-50.963,0c-14.05,14.051-14.05,36.913,0,50.963
            c7.026,7.026,16.252,10.537,25.481,10.537c6.992,0,13.984-2.022,20.018-6.055L85.054,95L95,
            85.054L70.983,61.037  C80.34,47.04,78.849,27.887,66.501,15.537z M25.483,
            56.555c-8.566-8.566-8.566-22.505,0-31.072c4.283-4.283,9.91-6.425,15.536-6.425  c5.627,0,11.253,
            2.142,15.536,6.425c8.566,8.567,8.566,22.506,0,31.072C47.989,65.12,34.05,65.122,25.483,56.555z" />
        </svg>
      </button>
      <div v-else-if="show_filters">
        <ul v-if="filters">
          <li v-for="(name, index) in filters" :key="index">
            <a href="#" @click.prevent="filter">{{ name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid">
      <template v-if="filtered_data">
        <thumbnail
          v-for="(video, index) in filtered_data"
          :data="video"
          :key="index" />
      </template>
      <template v-else>
        <thumbnail
          v-for="(video, index) in data"
          :data="video"
          :key="index" />
      </template>
    </div>
    <loading class="infinite-scroll-loading" v-if="loading" />
  </div>
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Playlists from './playlists'
import Thumbnail from './thumbnail'
import Loading from '@/components/loading'

export default {
  name: 'videos-list',
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      data: null,
      filtered_data: null,
      fetched: false,
      show_filters: false,
      current_filter: null,
      page: 1,
      perPage: 16,
      loading: false,
      loadedAll: false,
      eventListeners: []
    }
  },
  watch: {
    type() {
      this.fetch()
      this.show_filters = false
      this.current_filter = null
    },
    current_filter(filter) {
      this.page = 1
      if (filter) {
        this.filtered_data = this.data.filter(item => {
          return item._embedded['wp:term'][4].some(tag => tag.name === filter)
        })
      } else {
        this.filtered_data = null
      }
    }
  },
  computed: {
    filters() {
      const filters = new Set()
      return this.data && [ ...this.data.reduce((acc, item) => {
        const mediaTags = item._embedded['wp:term'][4]
        mediaTags.forEach(tag => {
          acc.add(tag.name)
        })
        return acc
      }, filters)]
    },
    url() {
      return `wp/v2/videos?per_page=${this.perPage}&page=${this.page}&_embed&filter[type]=${this.type}`
    }
  },
  mounted() {
    this.addEventListeners()
    this.fetch()
  },
  beforeDestroy() {
    this.removeEventListeners()
  },
  methods: {
    async fetch() {
      if (this.type !== 'playlists') {
        this.fetched = false
        this.data = await this.$request(this.url)
        this.fetched = true
      }
    },
    async loadMore() {
      this.loading = true
      this.page += 1
      try {
        const data = await this.$request(this.url)
        this.data = [...this.data, ...data]
      } catch (error) {
        this.loadedAll = true
      }
      this.loading = false
    },
    showFilters() {
      this.show_filters = true
    },
    filter(e) {
      this.current_filter = e.target.innerText
    },
    addEventListeners() {
      // haxx
      const $main = document.querySelector('main')
      const onScroll = this.onScroll.bind(this)
      $main.addEventListener('scroll', onScroll)
      this.eventListeners.push(onScroll)
    },
    removeEventListeners() {
      const $main = document.querySelector('main')
      this.eventListeners.forEach(eventListener => {
        $main.removeEventListener('scroll', eventListener)
      })
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (this.loadedAll) return
      if (scrollTop + clientHeight >= scrollHeight) {
        this.loadMore()
      }
    }
  },
  components: {
    Playlists,
    Thumbnail,
    Loading
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.infinite-scroll-loading {
  position: relative;
  // width: 28px;
}
</style>
