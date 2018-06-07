<template>
  <div class="flex">
    <div class="timeline-content">
      <router-view />
      <loading v-if="!active_event" />
    </div>
    <div class="timeline-sidebar">
      <div class="active-indicator" :style="{ height, background: active_event_color }">
        <div class="pointer" v-if="active_event" :style="{ top: `${active_event_offset}px`}" />
      </div>
      <div class="markers" :style="{ height }">
        <div class="marker" v-for="(marker, index) in date_markers" :key="index" :style="{ top: getTop(marker) }">
          {{ marker }}
        </div>
      </div>
      <div class="timelines" :style="{ height }">
        <timeline v-for="(timeline, index) in collection_filtered" :key="index" :data="timeline" ref="timeline" />
        <milestones v-if="milestones" :data="milestones" />
      </div>
      <div class="keys">
        <div v-for="(timeline, index) in collection" :key="index" class="key">
          <div class="key-color" :style="{ background: timeline.acf.color }" />
          {{ timeline.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { Collection } from 'vue-collections'
import { sleep } from '@/utils'
import Timeline from './timeline'
import Milestones from './milestones'

export default {
  name: 'timelines',
  data() {
    return {
      active_event_offset: null,
      all_events: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/timeline?per_page=99'
    })
  },
  computed: {
    collection_filtered() {
      return this.collection.filter(timeline => timeline.slug !== 'milestones')
    },
    milestones() {
      return this.collection.find(timeline => timeline.slug === 'milestones')
    },
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
      return `${((this.max + 5 - this.min) * this.scale) + this.padding}px`
    },
    active_timeline() {
      return this.active_event && this.timelines
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
      padding: 'timeline:padding',
      timelines: 'timelines',
      active_event: 'active_event'
    })
  },
  watch: {
    $route() {
      if (!this.$route.params.slug) {
        this.selectRandomEvent()
      }
    },
    async active_event(val) {
      await this.$nextTick()
      if (val) {
        this.setActiveIndicator(val)
      }
    }
  },
  async created() {
    await this.fetchAll()
    const timelines = await this.$collection.fetch()
    this.$store.dispatch('set_timelines', timelines)
    if (!this.active_event) {
      this.selectRandomEvent()
    } else {
      if (this.$route.path.split('/').filter(item => !!item).length === 1) {
        this.$router.push(`/timelines/${this.active_event.slug}`)
      }
      await sleep(1000)
      this.setActiveIndicator(this.active_event)
    }
  },
  methods: {
    getTop(year) {
      return `${((year - this.min) * this.scale) + this.padding}px`
    },
    async fetchAll() {
      const collection = new Collection({
        basePath: 'wp/v2/timelines?per_page=99'
      })
      this.all_events = await collection.fetch()
      const dates = this.all_events.map(model => parseInt(model.acf.date))
      const padding = 20
      const min = (Math.floor(Math.min(...dates) / 10) * 10) - padding
      const max = (Math.ceil(Math.max(...dates) / 10) * 10) + padding
      this.$store.dispatch('set_min', min)
      this.$store.dispatch('set_max', max)
    },
    async setActiveIndicator(val) {
      await this.$nextTick()
      const $event = document.getElementById(`event-${val.id}`)
      if ($event) {
        this.active_event_offset = $event.offsetTop - 5
        this.checkScrollPosition()
      }
    },
    async selectRandomEvent() {
      await sleep(1500)
      const $events = document.querySelectorAll('.timeline-event a')
      if ($events) {
        $events[Math.floor(Math.random() * $events.length)].click()
      }
    },
    checkScrollPosition() {
      // await this.$nextTick()
      const $sidebar = this.$el.querySelector('.timeline-sidebar')
      if (this.active_event_offset > $sidebar.scrollTop + $sidebar.offsetHeight) {
        $sidebar.scrollTop = this.active_event_offset
      }
    }
  },
  components: {
    Timeline,
    Milestones
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

.timeline-content {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.timeline-sidebar {
  display: flex;
  height: 100%;
  background: $color-background-dark;
  color: $color-text-light;
  overflow-y: auto;
}

.timelines {
  flex: 1;
  height: 100%;
  min-height: 100vh;
  padding: 0 180px 0 4px;
  white-space: nowrap;
  overflow: hidden;
}

.markers {
  flex: 1;
  position: relative;
  width: 50px;
  height: 100%;
  min-height: 100vh;
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
  padding: 20px;
  padding-bottom: 10px;
  // width: 170px;
  width: 150px;
  background: #282834;
  pointer-events: none;
  // text-align: right;

  .key {
    margin-bottom: 6px;
    font-size: 0.7em;
  }

  .key-color {
    display: inline-block;
    width: 10px;
    height: 10px;
    // margin-left: 4px;
    margin-right: 4px;
  }
}

.active-indicator {
  position: relative;
  width: 8px;
  height: 100%;
  min-height: 100vh;
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