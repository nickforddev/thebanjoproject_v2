<template>
  <div class="full-height" v-if="active_event && timeline">
    <div class="event-content full-height" v-if="fetched">
      <div class="media">
        <slideshow :data="event" />
      </div>
      <div class="body">
        <div class="meta">
          <div class="date">
            {{ event.acf.date }}
          </div>
          <div class="tag">
            <div class="tag-key" :style="{ background: timeline.acf.color }" />
            {{ timeline.name }}
          </div>
        </div>
        <h2 v-html="event.title.rendered"></h2>

        <div class="group" v-if="event.acf.related_audio">
          <h3>Audio</h3>
          <ul>
            <li>
              <div class="audio-track">
                <a href="#" @click.prevent="playAudio(event.acf.related_audio)">{{ event.acf.related_audio.title }}</a>
              </div>
            </li>
          </ul>
        </div>

        <!-- <div class="group" v-if="event.acf.audio.length">
          <h3>Audio</h3>
          <ul>
            <li v-for="(audio, index) in event.acf.audio" :key="index">
              <audio-link :uid="audio.ID" />
            </li>
          </ul>
        </div> -->

        <div v-html="event.content.rendered"></div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
// import AudioLink from '@/components/audio'
import { sleep } from '@/utils'

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
    async $route() {
      await this.fetch()
      window.dispatchEvent(new Event('resize'))
    },
    event(val) {
      this.$store.dispatch('set_active_event', val)
    }
  },
  computed: {
    timeline() {
      return this.timelines && this.event && this.timelines
        .find(timeline => timeline.id === this.event.timeline[0])
    },
    ...mapGetters([
      'timelines',
      'active_event'
    ])
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.event = null
      const response = await this.$request(`wp/v2/timelines?slug=${this.$route.params.slug}&_embed`)
      this.event = response[0]
      this.fetched = true
    },
    playAudio(songData) {
      this.$store.dispatch('set_active_playlist', null)
      this.$store.dispatch('set_active_song', songData)
      this.$nextTick(async() => {
        await sleep(500)
        window.$player.$refs.player.play()
      })
    }
  }
  // components: {
  //   AudioLink
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$media-height: 70%;

.media {
  height: $media-height;
  min-height: $media-height;
  max-height: $media-height;
  overflow: hidden;
  background: $color-slideshow-background;

  .slideshow {
    max-height: 100%;

    ::v-deep .slideshow-images {
      img {
        max-height: 70vh;
      }
    }
  }
}
.body {
  padding: 20px;
  height: 30%;
  overflow: auto;

  &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
  }
  &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0,0,0,.5);
      box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
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
.full-height {
  height: 100%;
}
</style>
