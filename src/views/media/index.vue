<template>
  <div>
    <header>
      <h1>Media</h1>
    </header>
    <ul class="tabs">
      <li>
        <router-link to="/media/full-interviews">
          Full Interviews
        </router-link>
      </li>
      <li>
        <router-link to="/media/performances">
          Performances
        </router-link>
      </li>
      <li>
        <router-link to="/media/mini-narratives">
          Mini Narratives
        </router-link>
      </li>
      <li>
        <router-link to="/media/playlists">
          Songbooks
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
  name: 'media'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.content {
  margin-top: 0;
}
</style>
