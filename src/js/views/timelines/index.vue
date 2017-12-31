<template>
  <div>
    <h2>Timelines</h2>
    <div class="timelines">
      <timeline v-for="(timeline, index) in collection" :key="index" :data="timeline" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Timeline from './timeline'

export default {
  name: 'timelines',
  collection() {
    return new Collection({
      basePath: 'wp/v2/timeline?per_page=99'
    })
  },
  created() {
    this.$collection.fetch()
  },
  components: {
    Timeline
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>