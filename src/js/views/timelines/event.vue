<template>
  <div class="timeline-event" :style="{ top, 'background-color': color }" @click="goToEvent">
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
  // created() {
  //   console.log(this.data)
  // },
  computed: {
    top() {
      return `${(this.data.acf.date - this.min) * this.scale}px`
    },
    ...mapGetters({
      min: 'timeline:min',
      max: 'timeline:max',
      scale: 'timeline:scale'
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

.timeline-event {
  position: absolute;
  width: #{$point-radius * 2};
  height: #{$point-radius * 2};
  border-radius: 100%;
  z-index: 10;

  &:hover {
    cursor: pointer;
    transform: scale(1.5);

    .tooltip {
      display: inline-block;
    }
  }

  .tooltip {
    display: none;
    position: absolute;
    bottom: $point-radius;
    left: $point-radius;
    padding: 4px;
    width: 100px;
    background: $color-background-light;
    color: $color-text-dark;
    font-size: 10px;
    z-index: 100;
  }
}
</style>