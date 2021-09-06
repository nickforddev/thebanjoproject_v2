<template>
  <router-link :to="`${typeSlug}/location/${data.slug}`">
    <result-title :typeName="typeName" :title="data.title.rendered" />
    <div class="excerpt" v-html="data.acf.content"></div>
  </router-link>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mergeDeepLeft } from 'ramda'
import base from './base'

export default mergeDeepLeft(base, {
  name: 'maps-result',
  computed: {
    regionSlug() {
      return this.data._embedded['wp:term'].find(item => {
        return item.find(subitem => {
          return subitem.taxonomy === 'region'
        })
      })[0].slug
    }
  }
})
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
