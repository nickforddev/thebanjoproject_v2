<template>
  <div>
    <div class="lineup">
      <ul v-if="fetched" ref="scrollable">
        <li v-for="(model, index) in collection" :key="index">
          <router-link :to="`/players/${model.slug}`">
            <div class="tooltip">
              {{ model.title.rendered }}
            </div>
            <img :src="model.acf.lineup_photo.url" :alt="`${model.slug}`">
          </router-link>
        </li>
      </ul>
      <loading v-else />
      <div class="controls" v-if="fetched">
        <next
          @mouseout="scrollRight(false)"
          @mouseover="scrollRight(true)" />
        <prev
          @mouseout="scrollLeft(false)"
          @mouseover="scrollLeft(true)" />
      </div>
      <div class="overlay" />
    </div>
 
    <router-view v-if="fetched" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Next from '@/components/controls/next'
import Prev from '@/components/controls/prev'

export default {
  name: 'players',
  data() {
    return {
      fetched: false,
      pace: 4
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/peoples?per_page=100&order=asc',
      id_attribute: 'slug'
    })
  },
  async created() {
    await this.fetch()
    if (this.$route.path === '/players') {
      this.$router.replace('/players/uncle-dave-macon')
    }
  },
  computed: {
    active_model() {
      return this.collection.find(model => {
        return model.id === this.active
      })
    }
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    },
    setActive(model) {
      this.active = model.id
    },
    // setPace(amount) {
    //   this.pace = amount
    // },
    async setScrolling(bool, direction) {
      if (bool) {
        await this.$nextTick()
        this.$options.interval = setInterval(() => {
          this.scroll(this.pace * direction)
        }, 20)
      } else {
        clearInterval(this.$options.interval)
      }
    },
    scroll(amount) {
      const $scrollable = this.$refs.scrollable
      const scrollLeft = $scrollable.scrollLeft
      $scrollable.scrollLeft = scrollLeft + amount
    },
    scrollRight(bool) {
      this.setScrolling(bool, 1)
    },
    scrollLeft(bool) {
      this.setScrolling(bool, -1)
    }
  },
  components: {
    Next,
    Prev
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.tooltip {
  position: absolute;
  top: -20px;
  left: 50%;
  background: $color-background-dark;
  color: $color-text-light;
  padding: 8px 8px 7px 10px;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.2s;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #{$color-background-dark};
  }
}

.lineup {
  position: relative;
  height: 344px;
  background-image: url('/static/bg_paper.gif');
  overflow: hidden;

  ul {
    position: absolute;
    top: 0;
    bottom: -18px;
    width: 100%;
    height: 400px;
    padding-top: 45px;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;

    li {
      display: inline-block;
      position: relative;
      margin: 0 -70px -24px 0;
      width: 280px;

      a {
        position: relative;
        display: block;
        z-index: 10;

        &.router-link-active {
          img {
            transform: scale(0.9);
          }
        }

        &:hover, &.router-link-active {
          cursor: pointer;
          z-index: 99;

          .tooltip {
            opacity: 1;
          }
        }
      }

      img {
        position: relative;
        height: 400px;
        transform: scale(0.8);
        transition: all 0.2s;
        pointer-events: none;
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%);
    pointer-events: none;
    opacity: 1;
    z-index: 11;
  }
}

.controls {
  position: absolute;
  height: 100%;
  width: 100%;

  & > div {
    z-index: 9999;
  }
}
</style>