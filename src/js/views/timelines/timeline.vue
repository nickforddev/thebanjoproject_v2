<template>
  <div class="timeline">
    <timeline-event v-for="(event, index) in collection" :key="index" :data="event" :color="data.acf.color" :id="`event-${event.id}`" />
    <div class="line" :style="{ 'background-color': data.acf.color }" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { Collection } from 'vue-collections'
import Timeline from '@/models/timeline'
import TimelineEvent from './event'

export default {
  name: 'timeline',
  props: ['data'],
  collection() {
    return new Collection({
      basePath: `wp/v2/timelines?timeline=${this.data.id}`,
      model: Timeline
    })
  },
  computed: {
    ...mapGetters({
      min: 'timeline:min',
      max: 'timeline:max'
    })
  },
  created() {
    this.$collection.fetch()
  },
  components: {
    TimelineEvent
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  .timeline {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 100%;
    // z-index: 2;
  }
  .line {
    position: absolute;;
    // border-left: 1px solid red;
    top: 0;
    bottom: 0;
    width: 2px;
    left: 4px;
    height: 100%;
    z-index: 1;
  }
</style>