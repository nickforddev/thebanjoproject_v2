<template>
  <div class="timeline-event" :style="{ top }" @click="goToEvent">
    <router-link
      @click.native.stop
      :to="`/timelines/${this.data.slug}`"
      class="timeline-event-dot"
      :style="{ 'background-color': color, color }" />
    <div class="timeline-tooltip" v-html="tooltip_text" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import filters from '@/modules/filters'

export default {
  name: 'event',
  props: ['data', 'color'],
  computed: {
    top() {
      return `${(2 + (this.data.acf.date - this.min) * this.scale) + this.padding}px`
    },
    tooltip_text() {
      return filters.limit(`${this.data.acf.date} – ${this.data.title.rendered}`, 40)
    },
    ...mapGetters({
      min: 'timeline:min',
      max: 'timeline:max',
      scale: 'timeline:scale',
      padding: 'timeline:padding'
    })
  },
  methods: {
    goToEvent() {
      this.$router.push(`/timelines/${this.data.slug}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$point-radius: 5px;
$point-active-scale: 1.4;
$triangle-size: 8px;

.timeline-event {
  position: absolute;

  .timeline-event-dot {
    position: absolute;
    width: #{$point-radius * 2};
    height: #{$point-radius * 2};
    border-radius: 100%;
    border: 2px solid currentColor;
    z-index: 10;

    &.router-link-active {
      transform: scale($point-active-scale);
    }

    &:visited {
      background: $color-background-dark !important;
    }
  }

  &:hover {
    .timeline-event-dot {
      cursor: pointer;
      transform: scale($point-active-scale);
    }

    .timeline-tooltip {
      display: inline-block;
    }
  }

  .timeline-tooltip {
    display: none;
    position: absolute;
    bottom: #{$point-radius / 2 + 6};
    left: #{$point-radius - 40};
    padding: 4px;
    background: $color-background-light;
    color: $color-text-dark;
    font-size: 12px;
    pointer-events: none;
    z-index: 100;

    &:after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: $triangle-size $triangle-size 0 $triangle-size;
      border-color:$color-background-light transparent transparent transparent;
      position: absolute;
      bottom: -#{$triangle-size - 2};
      left: #{42 - $point-radius * 2};
    }
  }
}
</style>
