<template>
  <div>
    <header>
      <h1>Videos</h1>
    </header>
    <ul class="tabs">
      <li>
        <router-link to="/videos/full-interviews">
          Full Interviews
        </router-link>
      </li>
      <li>
        <router-link to="/videos/performances">
          Performances
        </router-link>
      </li>
      <li>
        <router-link to="/videos/mini-narratives">
          Mini Narratives
        </router-link>
      </li>
    </ul>
    <div class="content">
      <router-view :type="$route.params.type" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'videos',
  mounted() {
    this.checkRoute()
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  },
  methods: {
    checkRoute() {
      if (!this.$route.params.type) {
        this.$router.push('/videos/full-interviews')
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.content {
  margin-top: 0;
}
</style>
