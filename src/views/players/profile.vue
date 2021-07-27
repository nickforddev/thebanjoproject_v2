<template>
  <div class="profile">
    <div class="layout-left" v-if="fetched">
      <div v-if="!$player.acf.disabled">
        <h1>{{ $player.title.rendered }}</h1>
        <h2 class="quote" v-html="$player.acf.pull_quote"></h2>
        <div v-html="content"></div>
      </div>
      <coming-soon v-else />
    </div>
    <loading v-else />
    <sidebar v-if="fetched && fetched_relationships">
      <div class="group">
        <h3>Born {{ $player.acf.year_born }} – Died {{ $player.acf.year_died }}</h3>
        <!-- <ul>
          <li v-for="(id, index) in $player.style" :key="index">
            <style-tag :uid="id" />
          </li>
        </ul> -->
      </div>

      <!-- <pre>{{ $player.acf.audio }}</pre> -->

      <div class="group" v-if="$player.acf.audio && $player.acf.audio.length">
        <h3>Audio</h3>
        <ul>
          <li v-for="({ audio }, index) in $player.acf.audio" :key="index">
            <div class="audio-track">
              <a href="#" @click.prevent="playAudio({ song: audio })">{{ audio.title }}</a>
            </div>
          </li>
        </ul>
      </div>

      <!-- <div class="group" v-if="$player.acf.related_audio && $player.acf.related_audio.length">
        <h3>Audio2</h3>
        <ul>
          <li v-for="(audio, index) in $player.acf.related_audio" :key="index">
            <audio-link :uid="audio.ID" />
          </li>
        </ul>
      </div> -->

      <div class="group" v-if="videos.length">
        <h3>Videos</h3>
        <ul>
          <li v-for="(video, index) in videos" :key="index">
            <a href="#" @click.prevent="playVideo(video.post_name)">
              {{ video.post_title }}
            </a>
          </li>
        </ul>
      </div>

      <div class="group" v-if="timeline.length">
        <h3>Timeline</h3>
        <ul>
          <li v-for="(event, index) in timeline" :key="index">
            <router-link :to="`/timelines/${event.post_name}`">
              {{ event.post_title }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="group" v-if="$player.acf.influences">
        <h3>Related Players</h3>
        <ul>
          <li v-for="(player, index) in $player.acf.influences" :key="index">
            <router-link
              v-if="player.from_database[0]"
              :to="`/players/${player.from_database[0].post_name}`">
              {{ player.from_database[0].post_title }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="group" v-if="maps.length">
        <h3>Maps</h3>
        <ul>
          <li v-for="(marker, index) in maps" :key="index">
            <router-link
              :to="`/maps/location/${marker.post_name}`">
              {{ marker.post_title }}
            </router-link>
          </li>
        </ul>
      </div>

    </sidebar>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Player from '@/models/player'
import Sidebar from '@/components/sidebar'
// import StyleTag from '@/components/style'
// import AudioLink from '@/components/audio'

export default {
  name: 'profile',
  data() {
    return {
      fetched: false,
      fetched_relationships: false,
      videos: [],
      maps: []
    }
  },
  models: {
    player() {
      const slug = this.$route.params.slug
      const model = this.$parent.collection.find(model => {
        return model.slug === slug
      })
      return new Player({
        id: model.id
      }, {
        basePath: 'wp/v2/peoples'
      })
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    $route(val) {
      this.$player.reset()
      const slug = this.$route.params.slug
      const model = this.$parent.collection.find(model => {
        return model.slug === slug
      })
      this.$player = {
        id: model.id
      }
      this.fetch()
    }
  },
  computed: {
    content() {
      return this.$player.content.rendered
    }
  },
  methods: {
    async fetch() {
      await this.$player.fetch()
      this.fetched = true
      await this.fetch_relationships()
      this.fetched_relationships = true
    },
    async fetch_relationships() {
      this.videos = []
      this.timeline = []
      const response = await this.$request(`related/people/${this.$player.id}`)
      this.videos = response.videos
      this.timeline = response.timeline
      this.maps = response.maps
    },
    playVideo(slug) {
      this.$store.dispatch('set_active_video', slug)
    }
  },
  components: {
    Sidebar
    // StyleTag
    // AudioLink
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.sidebar {
  a {
    font-size: 0.9em;
  }
}
.profile {
  .content {
    p {
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>

<style scoped lang="scss">
// @import '~%/variables';

.profile {
  padding: 30px;
}

</style>
