<template>
  <nav>
    <router-link to="/">
      <logo />
      <!-- <div class="tagline">
        Stories of America's Instrument
      </div> -->
    </router-link>
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
  </nav>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Logo from '@/components/logo_horizontal'
export default {
  name: 'navigation-horizontal',
  components: {
    Logo
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';
@import '~%/variables';

$nav-padding: 20px;

nav {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-horizontal-height;
  padding: $nav-padding;
  background: $color-nav-background;
  color: $color-text-light;

  .logo {
    display: inline-block;
    width: 220px;
    // margin-bottom: 20px;
    color: $color-text-light;
  }

  // .tagline {}

  ul {
    display: inline-block;
    flex-grow: 1;
    margin: 0;
    text-align: right;

    li {
      display: inline-block;
      margin: 0;

      a {
        // display: block;
        // padding: 6px 0;
        padding: 6px 14px;
        color: inherit;

        &.router-link-active {
          color: $color-highlight;
        }
      }

      .small {
        a {
          font-size: 0.75em;
          padding: 3px 0;
        }
      }
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