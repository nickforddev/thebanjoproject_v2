<template>
  <div>
    <div class="content" v-if="fetched">
      <div class="media"></div>
      <div class="body">
        <div class="meta">
          <div class="date">
            {{ event.acf.date }}
          </div>
          <div class="tag">
            <div class="tag-key" :style="{ background: timeline.acf.color }"/>
            {{ timeline.name }}
          </div>
        </div>
        <h2 v-html="event.title.rendered"></h2>
        <div v-html="event.content.rendered"></div>
      </div>
    </div>
    <!-- <pre>{{ event }}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'timeline-view',
  data() {
    return {
      event: null,
      fetched: false
    }
  },
  async created() {
    this.fetch()
  },
  watch: {
    $route() {
      this.fetch()
    },
    event(val) {
      this.$store.dispatch('set_active_event', val)
    }
  },
  computed: {
    timeline() {
      return this.timelines.find(timeline => timeline.id === this.event.timeline[0])
    },
    ...mapGetters([
      'timelines'
    ])
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.event = null
      const response = await this.$request(`wp/v2/timelines?slug=${this.$route.params.slug}`)
      this.event = response[0]
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.media {
  height: 50vh;
  min-height: 40vh;
  background: grey;
}
.body {
  padding: 20px;
}
.meta {
  margin-bottom: 10px;

  & > div {
    display: inline-block;
  }

  .date {
    margin-right: 10px;
    font-family: 'Myriad Pro', monospace;
    font-weight: bold;
  }
}
.tag-key {
  display: inline-block;
  height: 10px;
  width: 10px;
}
</style>