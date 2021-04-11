<template>
  <div v-if="fetched">
    <header>
      <h1>About</h1>
    </header>
    <div class="content" v-if="fetched">
      <div class="layout-left">
        <h2 class="quote">
          "{{ data.acf.pull_quote }}"
          <span class="credit">– {{ data.acf.attribution }}</span>
        </h2>
        <div class="body">
          <div class="images">
            <img :src="data.acf.inline_image.sizes.thumbnail" />
          </div>
          <div v-html="data.acf.body" />
        </div>
      </div>
      <sidebar>
        <dvd />
      </sidebar>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Sidebar from '@/components/sidebar'
import Dvd from '@/components/sidebar/dvd'

export default {
  name: 'about',
  data() {
    return {
      fetched: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.data = (await this.$request('wp/v2/pages?slug=about'))[0]
      this.fetched = true
    }
  },
  components: {
    Sidebar,
    Dvd
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

.images {
  position: relative;
  float: left;
  margin: 0 30px 25px 0;
}
</style>
