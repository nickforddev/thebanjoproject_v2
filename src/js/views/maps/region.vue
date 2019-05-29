<template>
  <div class="map-container">
    <v-map
      v-if="collection"
      ref="map"
      :zoom="-1"
      :center="[47.413220, -1.219482]"
    >
      <v-tilelayer
        :url="`https://api.mapbox.com/styles/v1/mapbox/${map_id}/tiles/{z}/{x}/{y}?access_token=${access_token}`"
      />

      <v-marker-cluster>
        <v-marker
          ref="marker"
          v-for="(model, index) in models"
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
    <div class="marker-view" v-if="$route.params.slug">
      <router-view :key="$route.params.slug"/>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
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
      access_token: config.mapbox,
      map_id: 'light-v9',
      collection: null,
      bounds: null
    }
  },
  watch: {
    async '$route.params.slug'(value) {
      window.dispatchEvent(new Event('resize'))
      await this.$nextTick()
      const { lat, lng } = this.models
        .find(model => model.slug === value)
        .acf
        .location
      this.focus(lat, lng, true)
    }
  },
  computed: {
    models() {
      return this.collection.models.filter(model => {
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
      const { lat, lng } = this.models
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
      this.$region = (await this.$request(`wp/v2/region?slug=${this.$route.params.region}`))[0]
      this.collection = new Collection({
        basePath: `wp/v2/maps?region=${this.$region.id}`
      })
      await this.collection.fetch()
    },
    async openMarker(index) {
      this.$router.push(`/maps/${this.$route.params.region}/${this.models[index].slug}`)
    },
    focus(lat, lng, zoom = false) {
      this.bounds = window.L.latLngBounds()
      this.models.map(model => {
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.map.fitBounds(this.bounds, {
        maxZoom: zoom ? 12 : this.map.getZoom()
      })
    },
    setBounds() {
      this.bounds = window.L.latLngBounds()
      this.models.map(model => {
        const {lat, lng} = model.acf.location
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.map.fitBounds(this.bounds, {
        padding: [200, 200]
      })
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
