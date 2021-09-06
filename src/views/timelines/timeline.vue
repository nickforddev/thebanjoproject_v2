<template>
  <div
    class="timeline"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    >
    <timeline-event
      v-for="(event, index) in collection"
      :key="index"
      :data="event"
      :color="data.acf.color"
      :id="`event-${event.id}`" />
    <div
      class="line"
      :class="[isHighlighted && 'highlighted']"
      :style="{
        'background-color': data.acf.color
      }" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Timeline from '@/models/timeline'
import TimelineEvent from './event'

export default {
  name: 'timeline',
  props: ['data', 'highlightedTimeline'],
  collection() {
    return new Collection({
      basePath: `wp/v2/timelines?timeline=${this.data.id}&per_page=99`,
      model: Timeline
    })
  },
  created() {
    this.$collection.fetch()
  },
  computed: {
    isHighlighted() {
      return this.highlightedTimeline &&
        this.data &&
        this.highlightedTimeline.name === this.data.name
    }
  },
  components: {
    TimelineEvent
  },
  methods: {
    onHover() {
      this.$emit('hoverTimeline', this.data)
    },
    onLeave() {
      this.$emit('leaveTimeline')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  @import '~%/colors';

  .timeline {
    display: inline-block;
    position: relative;
    width: 10px;
    margin: 0 4px;
    height: 100%;
  }
  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    left: 4px;
    height: 100%;
    z-index: 1;

    &.highlighted {
      background-image:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 0.5rem,
          #{$color-background-dark} 0.5rem,
          #{$color-background-dark} 1rem
        );
      background-size: 200% 200%;
      animation: barberpole 40s linear infinite reverse;
    }
    @keyframes barberpole {
      100% {
        background-position: 100% 100%;
      }
    }
  }
</style>
