<template>
  <div v-if="data">
    <close-btn @click="$emit('close')" />
    <slideshow
      v-if="data.acf.media !== 'none'"
      class="map-slideshow"
      :data="data"
    />
    <div class="marker-content">
      <h1 v-html="data.title.rendered" />

      <div v-if="data.topic.length">
        <div v-for="(topic, index) in data.topic" :key="index">
          <topic :id="topic" />
        </div>
      </div>

      <div v-if="data.acf.audio">
        <player class="player" :data="data.acf.audio" />
      </div>

      <div class="body" v-html="data.acf.content" />

      <div class="related">
        <div class="group" v-if="data.acf.related_locations && data.acf.related_locations.length">
          <h2>Related Locations</h2>
          <ul v-for="(location, index) in data.acf.related_locations" :key="index">
            <li>
              <router-link
                v-html="location.post_title"
                :to="`/maps/${$route.params.region}/${location.post_name}`"
              />
            </li>
          </ul>
        </div>
        <div class="group" v-if="data.acf.related_timelines && data.acf.related_timelines.length">
          <h2>Related Events</h2>
          <ul v-for="(event, index) in data.acf.related_timelines" :key="index">
            <li>
              <router-link
                v-html="event.post_title"
                :to="`/timelines/${event.post_name}`"
              />
            </li>
          </ul>
        </div>
        <div class="group" v-if="data.acf.related_players && data.acf.related_players.length">
          <h2>Related Players</h2>
          <ul v-for="(player, index) in data.acf.related_players" :key="index">
            <li>
              <router-link
                v-html="player.post_title"
                :to="`/players/${player.post_name}`"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import topic from './topic'
import closeBtn from '@/components/controls/close'

export default {
  name: 'map-content',
  components: {
    closeBtn,
    topic
  },
  data() {
    return {
      data: null
    }
  },
  async mounted() {
    await this.fetch()
  },
  methods: {
    async fetch() {
      this.data = (await this.$request(`wp/v2/maps?slug=${this.$route.params.slug}`))[0]
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.map-slideshow {
  max-height: 40vh !important;
  background: darken($color-background-dark, 10%);
}
.marker-content {
  position: relative;
  padding: 20px;
}
.related {
  .group {
    border-top: 1px solid darken($color-text-light, 50%);
    margin: 0 -20px;
    padding: 20px;
  }
  ul {
    list-style-type: disc;

    li {
      margin-left: 20px;
    }
  }
}
.player {
  margin: 0 -20px;
}
.close-btn {
  position: fixed;
  top: 20px;
  transform: translateX(-50%);
}

</style>
