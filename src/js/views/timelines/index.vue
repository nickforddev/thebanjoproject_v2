<template>
  <div class="flex">
    <div class="content">
      <router-view />
    </div>
    <div class="markers">
      <div class="marker" v-for="(marker, index) in date_markers" :key="index" :style="{ top: getTop(marker) }">
        {{ marker }}
      </div>
    </div>
    <div class="timelines">
      <timeline v-for="(timeline, index) in collection" :key="index" :data="timeline" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { Collection } from 'vue-collections'
import Timeline from './timeline'

export default {
  name: 'timelines',
  collection() {
    return new Collection({
      basePath: 'wp/v2/timeline?per_page=99'
    })
  },
  computed: {
    date_markers() {
      const array = []
      let date = this.min
      while (date <= this.max) {
        array.push(date)
        date += 5
      }
      return array
    },
    ...mapGetters({
      min: 'timeline:min',
      max: 'timeline:max',
      scale: 'timeline:scale'
    })
  },
  created() {
    this.$collection.fetch()
  },
  methods: {
    getTop(year) {
      // console.log(year * this.scale)
      return `${(year - this.min) * this.scale}px`
    }
  },
  components: {
    Timeline
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.flex {
  display: flex;
  width: 100%;
}

.content {
  flex: 1;
}

.timelines {
  // position: fixed;
  // right: 0;
  height: 100%;
  min-height: 100vh;
  padding: 0 200px 0 20px;
  background: $color-background-dark;
  color: $color-text-light;
}

.markers {
  position: relative;
  width: 50px;
  height: 100%;
  min-height: 100vh;
  padding: 0 10px;
  background: $color-background-dark;
  color: $color-text-light;

  .marker {
    position: absolute;
    font-size: 0.7em;
  }
}
</style>