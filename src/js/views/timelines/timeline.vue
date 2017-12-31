<template>
  <div class="timeline">
    <pre>{{ collection }}</pre>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Timeline from '@/models/timeline'

export default {
  name: 'timeline',
  props: ['data'],
  collection() {
    return new Collection({
      basePath: `wp/v2/timelines?timeline=${this.data.id}`,
      model: Timeline
    })
  },
  created() {
    this.$collection.fetch()
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>