<template>
  <div>
    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.2/mapbox-gl.css">
    <mapbox 
    :access-token="access_token"
    :map-options="{
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-96, 37.8],
      zoom: 3
    }"
    :geolocate-control="{
      show: true, 
      position: 'top-left'
    }"
    :scale-control="{
      show: true,
      position: 'top-left'
    }"
    :fullscreen-control="{
      show: true,
      position: 'top-left'
    }"
    @map-init="bindMap" />

    <div v-if="collection">
      <map-marker v-for="(model, index) in collection.models" :key="index" :data="model" />
      {{ all_coordinates }}
    </div>
    <!-- <pre v-if="collection">{{ collection.models }}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import mapboxgl from 'mapbox-gl'
// import { path } from 'ramda'
import Mapbox from 'mapbox-gl-vue'
import { Collection } from 'vue-collections'
import config from '@/config'
import Region from '@/models/region'
import MapMarker from './marker'

// import { sleep } from '@/utils'

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
      collection: null,
      map: null
    }
  },
  // created() {
    // this.fetch()
  // },
  computed: {
    all_coordinates() {
      const markers = this.collection.models.map(marker => {
        console.log(marker)
        const { lng, lat } = marker.acf.location
        return [lng, lat]
      })
      return markers.length > 1
        ? markers
        : markers[0]
    }
  },
  methods: {
    async fetch() {
      const response = await this.$request(`wp/v2/region?slug=${this.$route.params.region}`)
      this.$region = response[0]
      this.collection = new Collection({
        basePath: `wp/v2/maps?region=${this.$region.id}`
      })
      await this.collection.fetch()
    },
    async bindMap(map) {
      this.map = map
      await this.fetch()
      console.log(this.all_coordinates)
      this.map.setZoom(-1)
      this.map.fitBounds(this.all_coordinates)
    }
    // async bindMarkers(map) {
    //   await sleep(600)
    //   this.collection.models.map(marker => {
    //     const { lng, lat } = marker.acf.location
    //     new mapboxgl.Marker()
    //     .setLngLat([lng, lat])
    //     .addTo(map)
    //   })
    // }
  },
  components: {
    Mapbox,
    MapMarker
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
#map {
  width: 100%;
  height: 500px;
}
</style>