<template>
  <div class="map-container">
    <home-btn @click="closeMarker(true)" />
    <v-map
      v-if="collection && fetched"
      ref="map"
      :zoom="1"
      :min-zoom="1"
      :center="[47.413220, -1.219482]"
    >
      <v-tilelayer
        :url="`https://api.mapbox.com/styles/v1/mapbox/${map_id}/tiles/{z}/{x}/{y}?access_token=${access_token}`"
      />

      <v-marker-cluster
        @clustermouseover="hoverCluster"
        @clustermouseout="currentRegions = []">
        <v-marker
          ref="marker"
          v-for="(model, index) in markers"
          :key="index"
          :lat-lng="[
            model.acf.location.lat,
            model.acf.location.lng
          ]"
          @mouseover="hoverMarker"
          @mouseleave="currentRegions = []"
          @click="openMarker(index)"
        >
          <v-popup />
        </v-marker>
      </v-marker-cluster>
    </v-map>
    <div class="marker-view" v-if="collection && fetched">
      <router-view
        v-if="$route.params.slug && fetched"
        :key="$route.params.slug"
        @close="closeMarker"
      />
      <div v-else class="region-info">
        <div class="region-content">
          <h1>{{ name }}</h1>
          <p class="description" v-html="description" />
          <h2>Regions</h2>
          <p
            v-for="region in regions"
            :key="region.id"
            class="region-name-wrapper">
            <router-link
              :to="`/maps/region/${region.slug}`"
              @click="zoomRegion(region)"
              class="region-name"
              :class="[currentRegions.includes(region) && 'active']">
              {{ region.name }}
            </router-link>
          </p>
          <div v-if="active_region" class="region-details">
            <h2>{{ active_region.name }}</h2>
            <p class="description" v-html="active_region.acf.description || '(Description coming soon)'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { equals, props } from 'ramda'
import config from '@/config'
import { sleep } from '@/utils'
// import Region from '@/models/region'
import HomeBtn from '@/components/controls/home'
// import ImagesSlideshow from '@/components/slideshow/images'
// import MarkerContent from './content'

const ZERO_STATE_TITLE = 'Maps'
const ZERO_STATE_DESCRIPTION = `
  <p class="pad-bottom">
    The Maps are invitations to explore banjo "hot spots" since the 17th
    century, where the banjo emerged and developed out of cultural
    collisions and exchanges that we can document. 
  </p>
`
// <h2>Transatlantic Culture</h2>
// <p>
//   The banjo’s odyssey goes far beyond the mainland United States,
//   highlighting continuous cycles of transculturation over a period
//   of three centuries beginning with the colonial slave trade.
//   In the banjo’s history, we can see how the connections between the
//   cultures of Africa, the Caribbean, North America and Europe shaped
//   one another to create something new while never fully erasing its
//   roots in Africa and the Atlantic slave trade.
// </p>

export default {
  name: 'region',
  props: {
    regionSlug: String
  },
  data() {
    return {
      fetched: false,
      last_section: '/maps',
      access_token: config.mapbox,
      map_id: 'light-v9',
      collection: null,
      regions: null, // filtered to only regions that have markers
      currentRegions: [],
      bounds: null,
      name: ZERO_STATE_TITLE,
      description: ZERO_STATE_DESCRIPTION,
      active_region: null,
      region_count: null,
      hovered: false
    }
  },
  watch: {
    '$route.params'(params) {
      const { slug, regionSlug } = params
      if (slug) {
        // do nothing
      } else if (regionSlug) {
        this.last_section = `/maps/region/${regionSlug}`
        this.fetchRegion(regionSlug)
      } else {
        this.active_region = null
        this.last_section = '/maps'
        this.setBounds()
      }
    },
    async '$route.params.slug'(value) {
      if (value) {
        await this.$nextTick()
        const { lat, lng } = this.markers
          .find(model => model.slug === value)
          .acf
          .location
        this.focus(lat, lng, false)
      }
    },
    async '$route.params.regionSlug'(value) {
      if (value) {
        const region = this.regions.find(r => r.slug === value)
        this.zoomRegion(region)
      }
    }
  },
  computed: {
    markers() {
      return this.fetched && this.collection.filter(model => {
        return model.acf.location && model.acf.location.lat
      })
    },
    map() {
      return this.$refs.map.mapObject
    }
  },
  async created() {
    await this.fetch()
    const { slug, regionSlug } = this.$route.params
    if (slug) {
      const { lat, lng } = this.markers
        .find(model => model.slug === slug)
        .acf
        .location
      this.focus(lat, lng, true)
    } else if (regionSlug) {
      const region = this.regions.find(r => r.slug === regionSlug)
      this.zoomRegion(region)
      this.fetchRegion(regionSlug)
    } else {
      this.setBounds()
    }
  },
  methods: {
    async fetch() {
      const regionRequest = this.$request(`wp/v2/region?per_page=100`)
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
      this.region_count = models.length
      this.fetched = true
      this.regions = (await regionRequest)
        .filter(region => this.markers.some(marker => marker.region.includes(region.id)))
    },
    async fetchRegion(regionSlug) {
      this.active_region = (await this.$request(`wp/v2/region?slug=${regionSlug}`))[0]
    },
    async hoverCluster(cluster) {
      const markers = cluster.layer.getAllChildMarkers()
      this.region_count = markers.length

      this.highlightRegions(markers, '_latlng')

      if (!this.hovered) {
        setTimeout(() => {
          this.setBounds()
          this.hovered = true
        }, 10)
      }
    },
    hoverMarker(marker) {
      this.highlightRegions([marker])
    },
    highlightRegions(markers, latlngKey = 'latlng') {
      const latlngs = markers.map(marker => {
        return {
          lat: `${marker[latlngKey].lat}`,
          lng: `${marker[latlngKey].lng}`
        }
      })
      const mappedMarkers = this.markers.filter(marker => {
        return latlngs.some(latlng => {
          return equals(
            props(['lat', 'lng'], marker.acf.location),
            props(['lat', 'lng'], latlng)
          )
        })
      })
      const matchedRegions = this.regions.filter(region => {
        return mappedMarkers.some(marker => {
          return marker.region.includes(region.id)
        })
      })
      this.currentRegions = matchedRegions
    },
    async openMarker(index) {
      this.$router.push(`/maps/location/${this.markers[index].slug}`)
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
    async setBounds(markers = this.markers) {
      await sleep(800)
      this.bounds = window.L.latLngBounds()
      markers.map(model => {
        const { lat, lng } = model.acf.location
        this.bounds.extend(window.L.latLng(lat, lng))
      })
      this.map.fitBounds(this.bounds, {
        padding: [0, 0]
      })
    },
    zoomRegion(region) {
      const markers = this.markers.filter(marker => {
        return marker.region.includes(region.id)
      })
      this.setBounds(markers)
    },
    closeMarker(goHome) {
      this.$router.push(goHome ? '/maps' : this.last_section)
      this.setBounds()
    }
  },
  components: {
    HomeBtn
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/colors';

.map-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.marker-view {
  position: relative;
  width: 800px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: $color-background-dark;
  color: $color-text-light;
}

.region-info {
  display: flex;
  width: 100%;

  .region-content {
    padding: 20px;
  }

  .region-details {
    margin-top: 20px;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}

.home-btn {
  position: absolute;
  top: 80px;
  left: 10px;
  z-index: 9999;
}

.pad-bottom {
  padding-bottom: 18px;
}

.region-name-wrapper {
  display: inline-block;
  width: 50%;

  .region-name {
    display: inline-block;
    padding: 2px;
    border-radius: 3px;
    user-select: none;

    &:hover, &.active, &.router-link-exact-active {
      color: $color-background-dark;
      background: $color-highlight;
      text-decoration: none;
    }
  }
}
</style>
