<template>
  <div>
    <h1>Players</h1>

    <div class="lineup">
      <ul>
        <!-- <li v-for="(model, index) in collection" :key="index" @click="setActive(model)"> -->
        <li v-for="(model, index) in collection" :key="index">
          <div class="tooltip">
            {{ model.title.rendered }}
          </div>
          <router-link :to="`/players/${model.slug}`">
            <img :src="model.acf.lineup_photo.url" :alt="`${model.slug}`">
          </router-link>
        </li>
      </ul>
      <div class="overlay" />
    </div>


    <router-view v-if="fetched" />

    <!-- <div class="profile">
      <pre>{{ active_model }}</pre>
    </div> -->

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

export default {
  name: 'players',
  data() {
    return {
      // active: null,
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'wp/v2/peoples?per_page=100',
      id_attribute: 'slug'
    })
  },
  created() {
    this.fetch()
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
      console.log('FETCHED!')
    },
    setActive(model) {
      this.active = model.id
    }
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
      // display: inline-block;
      margin: 0 -70px -24px 0;
      width: 280px;
      // z-index: 10;

      a {
        position: relative;
        display: block;
        // margin: 0 -70px -24px 0;
        z-index: 10;
      }

      &:hover {
        cursor: pointer;
        z-index: 99;

        img {
          transform: scale(0.9);
        }

        .tooltip {
          opacity: 1;
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
</style>