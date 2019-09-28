<template>
  <div class="map-thumbnail grid__col grid__col--1-of-4" @click="goToMap">
    <div class="thumbnail">
      <v-map v-if="location" ref="map" :zoom="6" :zoomControl="false" :center="coords">
        <v-tilelayer :url="`https://api.mapbox.com/styles/v1/mapbox/${map_id}/tiles/{z}/{x}/{y}?access_token=${access_token}`" />
      </v-map>
    </div>
    <h4>{{ data.name }}</h4>
    <div class="description">
      {{ data.description }}
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import config from '@/config'
export default {
  name: 'map-thumbnail',
  props: ['data'],
  data() {
    return {
      access_token: config.mapbox,
      map_id: 'light-v9'
    }
  },
  mounted() {
    if (this.location) {
      this.setMapSettings()
    }
  },
  methods: {
    goToMap() {
      this.$router.push(`/maps/${this.data.slug}`)
    },
    setMapSettings() {
      const map = this.$refs.map.mapObject
      map.touchZoom.disable()
      map.doubleClickZoom.disable()
      map.scrollWheelZoom.disable()
      map.boxZoom.disable()
      map.keyboard.disable()
    }
  },
  computed: {
    location() {
      return this.data.acf.location
    },
    coords() {
      return [this.location.lat, this.location.lng]
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.map-thumbnail {
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }

  h4 {
    margin: 10px 0;
  }

  .thumbnail {
    position: relative;
    height: 0;
    padding-top: 65%;
    background: grey;

    .vue2leaflet-map {
      position: absolute;
      top: 0;
      z-index: 1;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
    }
  }
  .description {
    font-size: 0.8em;
  }
}
</style>

<style lang="scss">
.map-thumbnail {
  .leaflet-control-zoom {
    visibility: hidden;
  }
  .leaflet-bottom.leaflet-right {
    display: none;
  }
}
</style>
