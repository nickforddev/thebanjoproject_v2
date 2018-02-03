<template>
  <v-map v-if="collection" ref="map" :zoom="-1" :center="[47.413220, -1.219482]">
    <v-tilelayer :url="`https://api.mapbox.com/styles/v1/mapbox/${map_id}/tiles/{z}/{x}/{y}?access_token=${access_token}`" />

    <v-marker-cluster>
      <v-marker
      ref="marker"
      v-for="(model, index) in collection.models"
      v-if="model.acf.location !== null"
      :lat-lng="[model.acf.location.lat, model.acf.location.lng]"
      :key="index"
      @l-popupopen="delegateOpen(index)">
        <v-popup>
          <map-marker :data="model" :ref="`marker-${index}`" />
        </v-popup>

      </v-marker>
    </v-marker-cluster>
  </v-map>
  <!-- <pre v-if="collection">{{ collection.models }}</pre> -->
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import config from '@/config'
import Region from '@/models/region'
import MapMarker from './marker'

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
      map: null,
      bounds: null
    }
  },
  async created() {
    await this.fetch()
    this.setBounds()
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
    delegateOpen(index) {
      this.$refs[`marker-${index}`][0].opened()
    },
    setBounds() {
      this.bounds = window.L.latLngBounds()
      this.collection.models.map(event => {
        const {lat, lng} = event.acf.location
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.$refs.map.mapObject.fitBounds(this.bounds, { padding: [200, 200] })
    }
  },
  components: {
    MapMarker
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

