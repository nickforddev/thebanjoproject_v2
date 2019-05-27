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
          @click="delegateOpen(index)"
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
      map: null,
      bounds: null
    }
  },
  async created() {
    await this.fetch()
    this.setBounds()
  },
  computed: {
    models() {
      return this.collection.models.filter(model => {
        return model.acf.location
      })
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
    delegateOpen(index) {
      this.$router.push(`/maps/${this.$route.params.region}/${this.models[index].slug}`)
    },
    setBounds() {
      this.bounds = window.L.latLngBounds()
      this.models.map(event => {
        const {lat, lng} = event.acf.location
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.$refs.map.mapObject.fitBounds(this.bounds, {
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
