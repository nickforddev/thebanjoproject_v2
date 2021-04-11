<template>
  <nav :class="[active && 'active']">
    <router-link to="/">
      <logo />
    </router-link>
    <div class="donate-container">
      <div>
        <a class="button success" href="https://secure.donationpay.org/documentaries/film_no_stats.php?f=banjo" target="_blank">
          Donate Now
        </a>
      </div>
      <div>
        Support the Digital Museum
      </div>
    </div>
    <ul @click="toggle">
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
        <router-link to="/media">Media</router-link>
      </li>
      <li>
        <router-link to="/search">Search</router-link>
      </li>
      <template v-if="active">
        <li class="mobile-only">
          <router-link to="/about">About</router-link>
        </li>
        <li class="mobile-only">
          <router-link to="/resources">Resources</router-link>
        </li>
      </template>
    </ul>
    <div class="icon" @click="toggle" :class="[active && 'active']">
      <div class="lines"></div>
    </div>
  </nav>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Logo from '@/components/logo_horizontal'
export default {
  name: 'navigation-horizontal',
  data() {
    return {
      active: false
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    }
  },
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
$bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);

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
  z-index: 9999999;

  .logo {
    display: inline-block;
    width: 260px;
    color: $color-text-light;
  }

  .kickstarter {
    height: 58px;
    margin-left: 16px;
  }

  .icon {
    display: none;
    position: absolute;
    right: 20px;
    width: 30px;
    height: 30px;
    padding-top: 15px;

    &:hover {
      cursor: pointer;
    }

    &.active {
      .lines {
        background: transparent;
        transition: all 0.2s ;

        &:before {
          transform: rotate(45deg);
          top: 0px;
          transition: all 0.2s $bounce;
        }

        &:after {
          transform: rotate(-45deg);
          top: -2px;
          transition: all 0.2s $bounce;
        }
      }
    }

    .lines {
      height: 2px;
      background: white;
      transition: all 0.2s $bounce;

      &:before {
        content: '';
        position: relative;
        display: block;
        height: 2px;
        background: white;
        top: -8px;
        transition: all 0.2s $bounce;
      }

      &:after {
        content: '';
        position: relative;
        display: block;
        height: 2px;
        background: white;
        top: 6px;
        transition: all 0.2s $bounce;
      }
    }
  }

  ul {
    display: inline-block;
    flex-grow: 1;
    margin: 0;
    text-align: right;

    li {
      display: inline-block;
      margin: 0;

      &.mobile-only {
        display: none;
      }

      a {
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

.donate-container {
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid;
  white-space: nowrap;

  .button {
    margin-bottom: 10px;
    padding: .30em .55em;
  }
}

@media screen and (max-width: 850px) {
  nav {
    ul {
      display: none;

      li {
        &.mobile-only {
          display: block;
        }
      }
    }

    .icon {
      display: block;
    }

    &.active {
      ul {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: $nav-horizontal-height;
        left: 0;
        right: 0;
        bottom: 0;
        background: darken($color-nav-background, 10%);
        overflow: auto;

        li {
          display: block;
          flex-grow: 1;
          text-align: center;

          a {
            width: 100%;
            padding: 40px;

            &:hover {
              background: darken($color-nav-background, 20%)
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .donate-container {
    display: none;
  }
}
</style>
