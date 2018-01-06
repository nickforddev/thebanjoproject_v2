<template>
  <div class="timeline-event" :style="{ top }" @click="goToEvent">
    <router-link
      @click.native.stop
      :to="`/timelines/${this.data.slug}`"
      class="timeline-event-dot"
      :style="{ 'background-color': color }" />
    <div class="tooltip">
      {{ data.acf.date }} – {{ data.title.rendered | limit }}
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'event',
  props: ['data', 'color'],
  computed: {
    top() {
      return `${(2 + (this.data.acf.date - this.min) * this.scale) + this.padding}px`
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
    z-index: 10;

    &.router-link-active {
      transform: scale($point-active-scale);
    }
  }

  &:hover {
    .timeline-event-dot {
      cursor: pointer;
      transform: scale($point-active-scale);
    }

    .tooltip {
      display: inline-block;
    }
  }

  .tooltip {
    display: none;
    position: absolute;
    bottom: #{$point-radius / 2};
    left: $point-radius;
    padding: 4px;
    // width: 100px;
    background: $color-background-light;
    color: $color-text-dark;
    font-size: 10px;
    z-index: 100;

    &:after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: $triangle-size $triangle-size 0 0;
      border-color:$color-background-light transparent transparent transparent;
      position: absolute;
      bottom: -#{$triangle-size - 2};
      left: 0;
    }
  }
}
</style>