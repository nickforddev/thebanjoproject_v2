<template>
  <div v-html="data.acf.content">
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import mapboxgl from 'mapbox-gl'

// const markerHeight = 50
// const markerRadius = 10
// const linearOffset = 25

// const popupOffsets = {
//   'top': [0, 0],
//   'top-left': [0, 0],
//   'top-right': [0, 0],
//   'bottom': [0, -markerHeight],
//   'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
//   'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
//   'left': [markerRadius, (markerHeight - markerRadius) * -1],
//   'right': [-markerRadius, (markerHeight - markerRadius) * -1]
// }

export default {
  name: 'marker',
  props: {
    data: Object
  },
  data() {
    return {
      marker: null
    }
  },
  mounted() {
    // const { lng, lat } = this.data.acf.location
    // const lnglat = [lng, lat]

    // const popup = new mapboxgl.Popup()
    //   .setDOMContent(this.$el)

    // this.marker = new mapboxgl.Marker()
    //   .setLngLat([lng, lat])
    //   .setPopup(popup)
    //   .addTo(this.map)
  },
  computed: {
    // map() {
    //   return this.$parent.map
    // }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>