<template>
  <div>
    <component v-if="template" :is="template" />
    <div class="content" v-else>
      <coming-soon />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import ThreeBanjoSongsters from './templates/ThreeBanjoSongsters'
import MusicalPassage from './templates/MusicalPassage'

export default {
  name: 'narrative',
  data() {
    return {
      template: null
    }
  },
  mounted() {
    if (this.$route.params.slug === 'three-banjo-songsters') {
      this.template = 'ThreeBanjoSongsters'
    } else if (this.$route.params.slug === 'musical-passage') {
      this.template = 'MusicalPassage'
    }
  },
  components: {
    ThreeBanjoSongsters,
    MusicalPassage
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// .content {
//   max-width: 1068px;
//   margin: 20px;
// }
</style>
