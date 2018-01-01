<template>
  <div class="flex">
    <div class="content">
      <router-view />
    </div>
    <div class="sidebar">
      <div class="active-indicator" :style="{ height, background: active_event_color }">
        <div class="pointer" v-if="active_event" :style="{ top: `${active_event_offset}px`}" />
      </div>
      <div class="markers" :style="{ height }">
        <div class="marker" v-for="(marker, index) in date_markers" :key="index" :style="{ top: getTop(marker) }">
          {{ marker }}
        </div>
      </div>
      <div class="timelines" :style="{ height }">
        <timeline v-for="(timeline, index) in collection" :key="index" :data="timeline" ref="timeline" />
      </div>
      <div class="keys">
        <div v-for="(timeline, index) in collection" :key="index" class="key">
          {{ timeline.name }}
          <div class="key-color" :style="{ background: timeline.acf.color }" />
        </div>
      </div>
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
  data() {
    return {
      active_event_offset: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/timeline?per_page=99'
    })
  },
  beforeDestroy() {
    this.$store.dispatch('set_active_event', null)
  },
  computed: {
    date_markers() {
      const array = []
      let date = this.min
      while (date <= this.max) {
        array.push(date)
        date += 10
      }
      return array
    },
    height() {
      return `${(this.max + 5 - this.min) * this.scale}px`
    },
    active_timeline() {
      return this.active_event
        ? this.timelines.find(timeline => {
          return timeline.id === this.active_event.timeline[0]
        })
        : null
    },
    active_event_color() {
      if (this.active_timeline) {
        return this.active_timeline.acf.color
      }
    },
    ...mapGetters({
      min: 'timeline:min',
      max: 'timeline:max',
      scale: 'timeline:scale',
      timelines: 'timelines',
      active_event: 'active_event'
    })
  },
  watch: {
    active_event(val) {
      if (val) {
        const $event = document.getElementById(`event-${val.id}`)
        if ($event) {
          this.active_event_offset = $event.offsetTop - 5
        }
      }
    }
  },
  async created() {
    const timelines = await this.$collection.fetch()
    this.$store.dispatch('set_timelines', timelines)
  },
  methods: {
    getTop(year) {
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
  height: 100%;
  overflow: hidden;
}

.content {
  flex: 1;
}

.sidebar {
  display: flex;
  height: 100%;
  background: $color-background-dark;
  color: $color-text-light;
  overflow-y: auto;
}

.timelines {
  flex: 1;
  height: 100%;
  padding: 0 100px 0 20px;
  overflow: hidden;
}

.markers {
  flex: 1;
  position: relative;
  width: 50px;
  height: 100%;
  // min-height: 100vh;
  padding: 0 14px;
  font-family: 'Myriad Pro', monospace;

  .marker {
    position: absolute;
    font-size: 0.7em;
  }
}
.keys {
  position: absolute;
  top: 0;
  right: 0;
  // width: 300px;
  padding: 20px;
  text-align: right;

  .key {
    margin-bottom: 6px;
    font-size: 0.7em;
  }

  .key-color {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-left: 4px;
  }
}

.active-indicator {
  position: relative;
  width: 8px;
  height: 100%;
  background: grey;

  .pointer {
    position: absolute;
    width: 20px;
    height: 20px;
    background: inherit;
    transform: rotate(45deg);
    left: -8px;
    overflow: visible;
  }
}
</style>