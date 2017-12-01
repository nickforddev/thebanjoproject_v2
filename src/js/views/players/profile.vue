<template>
  <div class="profile">
    <div class="content">
      <h1>{{ $player.title.rendered }}</h1>
      <h2 v-html="$player.acf.pull_quote"></h2>
      <div v-html="content"></div>
    </div>
    <div class="sidebar">
      <div class="group">
        <h3>BORN {{ $player.acf.year_born }} – DIED {{ $player.acf.year_died }}</h3>
        <ul>
          <li v-for="(id, index) in $player.style" :key="index">
            <style-tag :uid="id" />
          </li>
        </ul>
      </div>

      <div class="group">
        <h3>Videos</h3>
        <ul>
          <li>
            here
          </li>
        </ul>
      </div>
    </div>
    <pre>{{ $player }}</pre>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Player from '@/models/player'
import StyleTag from '@/components/style'
export default {
  name: 'profile',
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
    console.log(this.$route.params.slug)
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
      this.$player.fetch()
    }
  },
  computed: {
    content() {
      return this.$player.content.rendered
    }
  },
  methods: {
    fetch() {
      this.$player.fetch()
    }
  },
  components: {
    StyleTag
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// .profile {
//   vertical-align: top;
// }
.content {
  display: inline-block;
  // width: 768px;
  width: 500px;
  vertical-align: top;
}
.sidebar {
  display: inline-block;
  width: 200px;
  vertical-align: top;
}
</style>