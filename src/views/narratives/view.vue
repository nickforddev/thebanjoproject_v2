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
import Revivalists from './templates/Revivalists'

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
    } else if (this.$route.params.slug === 'revivalists-rediscovery-reclamation-reinvention') {
      this.template = 'Revivalists'
    }
  },
  components: {
    ThreeBanjoSongsters,
    MusicalPassage,
    Revivalists
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
