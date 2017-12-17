<template>
  <div>
    
  <v-map v-if="collection" ref="map" :zoom=-1 :center="[47.413220, -1.219482]">
    <v-tilelayer :url="`https://api.mapbox.com/styles/v1/mapbox/${map_id}/tiles/{z}/{x}/{y}?access_token=${access_token}`" />

    <v-marker-cluster ref="cluster">
      <v-marker
      ref="marker"
      v-for="(model, index) in collection.models"
      v-if="model.acf.location !== null"
      :lat-lng="[model.acf.location.lat, model.acf.location.lng]"
      :key="index">
        <v-popup :content="model.acf.content"></v-popup>
      </v-marker>
    </v-marker-cluster>
  </v-map>
  <!-- <pre v-if="collection">{{ collection.models }}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import mapboxgl from 'mapbox-gl'
// import { path } from 'ramda'
// import Mapbox from 'mapbox-gl-vue'
import { Collection } from 'vue-collections'
import config from '@/config'
import Region from '@/models/region'
// import MapMarker from './marker'

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
      map_id: 'light-v9',
      collection: null,
      map: null
    }
  },
  created() {
    this.fetch()
  },
  // computed: {
    // all_coordinates() {
    //   const markers = this.collection.models.map(marker => {
    //     console.log(marker)
    //     const { lng, lat } = marker.acf.location
    //     return [lng, lat]
    //   })
    //   return markers.length > 1
    //     ? markers
    //     : markers[0]
    // }
  // },
  methods: {
    async fetch() {
      const response = await this.$request(`wp/v2/region?slug=${this.$route.params.region}`)
      this.$region = response[0]
      this.collection = new Collection({
        basePath: `wp/v2/maps?region=${this.$region.id}`
      })
      await this.collection.fetch()
      // console.log(this.$refs.map.mapObject._layers)
      setTimeout(() => {
        console.log(this.$refs.map.mapObject.eachLayer(layer => {
          console.log('feature', layer.feature)
        }))
      }, 300)
      // setTimeout(() => {
      //   console.log(this.$refs.marker)
      //   const markers = this.$refs.marker.map(marker => {
      //     return marker.mapObject
      //   })
      //   console.log(this.$refs.map.mapObject.featureGroup.getBounds(markers))
      // }, 200)
      // console.log(this.$refs.cluster.mapObject._markerCluster.clearLayers())
      // this.$refs.map.mapObject.eachLayer((layer) => {
      //   console.log(layer.name)
      // })
    }
  },
  components: {
    // Mapbox,
    // MapMarker
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.vue2leaflet-map {
  width: 100%;
  height: 100vh;
}
</style>