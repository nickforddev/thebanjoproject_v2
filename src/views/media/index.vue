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
@import '~%/colors';

.content {
  margin-top: 0;
}

::v-deep .search {
  margin-bottom: 20px;

  button {
    background: $color-background-light;
    color: $color-text-dark;
    font-weight: 600;
    border: 1px solid #{$color-text-dark};
    padding-right: 30px;

    svg {
      width: 20px;
      display: inline-block;
      position: absolute;
      right: 6px;
      bottom: 1px;
      fill: currentColor;
    }
  }
}
</style>
