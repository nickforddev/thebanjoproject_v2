<template>
  <div class="map-container">
    <v-map
      v-if="collection && fetched"
      ref="map"
      :zoom="-1"
      :center="[47.413220, -1.219482]"
    >
      <v-tilelayer
        :url="`https://api.mapbox.com/styles/v1/mapbox/${map_id}/tiles/{z}/{x}/{y}?access_token=${access_token}`"
      />

      <v-marker-cluster @clustermouseover="hoverCluster">
        <v-marker
          ref="marker"
          v-for="(model, index) in markers"
          :key="index"
          :lat-lng="[
            model.acf.location.lat,
            model.acf.location.lng
          ]"
          @click="openMarker(index)"
        >
          <v-popup />
        </v-marker>
      </v-marker-cluster>
    </v-map>
    <div class="marker-view">
      <router-view
        v-if="$route.params.slug && fetched"
        :key="$route.params.slug"
        @close="closeMarker"
      />
      <div v-else-if="region">
        <h1>{{ region.name }}</h1>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { Collection } from 'vue-collections'
import { equals, props } from 'ramda'
import config from '@/config'
import Region from '@/models/region'
import MarkerContent from './content'

export default {
  name: 'region',
  models: {
    region() {
      return new Region()
    }
  },
  data() {
    return {
      fetched: false,
      access_token: config.mapbox,
      map_id: 'light-v9',
      collection: null,
      bounds: null,
      region: null
    }
  },
  watch: {
    async '$route.params.slug'(value) {
      if (value) {
        window.dispatchEvent(new Event('resize'))
        await this.$nextTick()
        const { lat, lng } = this.markers
          .find(model => model.slug === value)
          .acf
          .location
        this.focus(lat, lng, false)
      } else {
        window.dispatchEvent(new Event('resize'))
        this.setBounds()
      }
    }
  },
  computed: {
    markers() {
      return this.fetched && this.collection.filter(model => {
        return model.acf.location
      })
    },
    map() {
      return this.$refs.map.mapObject
    }
  },
  async created() {
    await this.fetch()
    const slug = this.$route.params.slug
    if (slug) {
      const { lat, lng } = this.markers
        .find(model => model.slug === slug)
        .acf
        .location
      this.focus(lat, lng, true)
    } else {
      this.setBounds()
    }
  },
  methods: {
    async fetch() {
      let models = []
      const request = await this.$request('wp/v2/maps?per_page=100', {
        responseHeaders: true
      })
      models = models.concat(request.body)
      for (const header of request.headers) {
        if (header[0] === 'x-wp-totalpages') {
          let totalPages = header[1]
          let currentPage = 2
          while (currentPage <= totalPages) {
            models = models.concat(
              await this.$request(`wp/v2/maps?per_page=100&page=${currentPage}`)
            )
            currentPage++
          }
        }
      }
      this.collection = models
      this.fetched = true
    },
    async hoverCluster(cluster) {
      const markers = cluster.layer.getAllChildMarkers()
      const firstMarker = this.markers.find(m => {
        return equals(
          props(['lat', 'lng'], m.acf.location),
          props(['lat', 'lng'], markers[0]._latlng)
        )
      })
      this.region = await this.$request(`wp/v2/region/${firstMarker.region[0]}`)
    },
    async openMarker(index) {
      this.$router.push(`/maps/${this.markers[index].slug}`)
    },
    focus(lat, lng, zoom = false) {
      this.bounds = window.L.latLngBounds()
      this.markers.map(model => {
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.map.fitBounds(this.bounds, {
        maxZoom: zoom ? 12 : this.map.getZoom()
      })
    },
    setBounds() {
      this.bounds = window.L.latLngBounds()
      this.markers.map(model => {
        const {lat, lng} = model.acf.location
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.map.fitBounds(this.bounds, {
        padding: [0, 0]
      })
    },
    closeMarker() {
      this.$router.push(`/maps/`)
      this.setBounds()
    }
  },
  components: {
    MarkerContent
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/colors';

.map-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.marker-view {
  width: 800px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: $color-background-dark;
  color: $color-text-light;
}
</style>
