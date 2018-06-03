<template>
  <div class="style">
    <router-link :to="`/search/${$style.slug}`">
      {{ $style.name }}
    </router-link>
    <!-- <a href="#" @click.prevent>{{ $style.name }}</a> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Style from '@/models/tag'
export default {
  name: 'style-tag',
  props: ['uid'],
  models: {
    style() {
      return new Style({
        id: this.uid
      }, {
        basePath: 'wp/v2/style'
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$style.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>