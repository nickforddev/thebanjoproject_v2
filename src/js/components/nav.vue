<template>
  <nav>
    <logo />
    <ul>
      <li>
        <router-link to="/narratives">Narratives</router-link>
      </li>
      <li>
        <router-link to="/players">Players</router-link>
      </li>
      <li>
        <router-link to="/timelines">Timelines</router-link>
      </li>
      <li>
        <router-link to="/maps">Maps</router-link>
      </li>
      <li>
        <router-link to="/videos">Videos</router-link>
      </li>
      <li>
        <router-link to="/search">Search</router-link>
      </li>
    </ul>
    <div class="divider" />
    <ul class="small">
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/bibliography">Bibliography</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
    </ul>
  </nav>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Logo from '@/components/logo'
export default {
  name: 'navigation',
  components: {
    Logo
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$nav-padding: 20px;

nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  // width: $nav-width;
  padding: $nav-padding;
  background: $color-nav-background;
  color: $color-text-light;

  .logo {
    margin-bottom: 20px;
  }

  ul {
    margin: 0;

    li {
      margin: 0;
    }
  }

  a {
    display: block;
    padding: 6px 0;
    color: inherit;

    &.router-link-active {
      color: $color-hightlight;
    }
  }

  .small {
    a {
      font-size: 0.75em;
      padding: 3px 0;
    }
  }

  .divider {
    width: calc(100% + #{$nav-padding}*2);
    height: 2px;
    margin: 10px -#{$nav-padding};
    background-color: darken($color-nav-background, 10%);
  }
}
</style>