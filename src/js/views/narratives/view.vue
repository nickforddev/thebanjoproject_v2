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
    }
  },
  components: {
    ThreeBanjoSongsters
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
