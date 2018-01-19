<template>
  <div class="style" v-if="fetched">
    <a href="#" @click.prevent="play" v-html="$audio.title.rendered"></a>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Audio from '@/models/audio'

export default {
  name: 'audio-player',
  props: ['uid'],
  data() {
    return {
      fetched: false
    }
  },
  models: {
    audio() {
      return new Audio({
        id: this.uid
      }, {
        basePath: 'wp/v2/audio'
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$audio.fetch()
      this.fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>