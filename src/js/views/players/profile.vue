<template>
  <div class="profile">
    <div class="content" v-if="fetched">
      <h1>{{ $player.title.rendered }}</h1>
      <h2 class="quote" v-html="$player.acf.pull_quote"></h2>
      <div v-html="content"></div>
    </div>
    <loading v-else />
    <div class="sidebar" v-if="fetched && fetched_relationships">
      <div class="group">
        <h3>Born {{ $player.acf.year_born }} – Died {{ $player.acf.year_died }}</h3>
        <ul>
          <li v-for="(id, index) in $player.style" :key="index">
            <style-tag :uid="id" />
          </li>
        </ul>
      </div>
      <!-- <pre>{{ $player.acf.related_audio }}</pre> -->
      <div class="group" v-if="$player.acf.related_audio && $player.acf.related_audio.length">
        <h3>Audio</h3>
        <ul>
          <li v-for="(audio, index) in $player.acf.related_audio" :key="index">
            <audio-link :uid="audio.ID" />
          </li>
        </ul>
      </div>

      <div class="group" v-if="videos.length">
        <h3>Videos</h3>
        <ul>
          <li v-for="(video, index) in videos" :key="index">
            <a href="#" @click.prevent>{{ video.post_title }}</a>
            <!-- <pre>{{ video }}</pre> -->
          </li>
        </ul>
      </div>

      <div class="group" v-if="timeline.length">
        <h3>Timeline</h3>
        <ul>
          <li v-for="(event, index) in timeline" :key="index">
            <a href="#" @click.prevent>{{ event.post_title }}</a>
            <!-- <pre>{{ video }}</pre> -->
          </li>
        </ul>
      </div>

      <div class="group">
        <h3>Related Players</h3>
        <ul>
          <li v-for="(player, index) in $player.acf.influences" :key="index">
            <!-- <pre>{{ player.from_database }}</pre> -->
            <router-link :to="`/players/${player.from_database[0].post_name}`">
              {{ player.from_database[0].post_title }}
            </router-link>
          </li>
        </ul>
      </div>

    </div>
    <!-- <pre>{{ $player }}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { Model } from 'vue-models'
import Player from '@/models/player'
import StyleTag from '@/components/style'
import AudioLink from '@/components/audio'

export default {
  name: 'profile',
  data() {
    return {
      fetched: false,
      fetched_relationships: false,
      videos: []
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
      // this.$collection.fetch()
      this.videos = []
      this.timeline = []
      const response = await this.$request(`related/people/${this.$player.id}`)
      // console.log({response})
      this.videos = response.videos
      this.timeline = response.timeline
    }
  },
  components: {
    StyleTag,
    AudioLink
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.credit  {
  width: 100%;
  display: inline-block;
  font-family: 'Interstate';
  font-size: 0.7em;
  text-align: right;
  color: #9aa7b4;
}
.sidebar {
  a {
    font-size: 0.9em;
  }
}
</style>

<style scoped lang="scss">
$sidebar-width: 200px;
$gutter-width: 30px;

.profile {
  padding: 30px;
}
.quote {
  font-family: 'Calendus Plus';
  font-style: italic;
  line-height: 1.3em;
}

.content {
  display: inline-block;
  width: 768px;
  max-width: calc(100% - #{$sidebar-width + ($gutter-width * 2)});
  vertical-align: top;
  padding-right: $gutter-width;
  margin-right: $gutter-width;
  border-right: 1px solid #ccc;
}
.sidebar {
  display: inline-block;
  width: $sidebar-width;
  vertical-align: top;

  h3 {
    font-family: 'League Gothic', sans-serif;
    font-size: 1.4em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .group {
    margin-bottom: 30px;
  }
}
</style>