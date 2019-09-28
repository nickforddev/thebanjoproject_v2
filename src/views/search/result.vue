<template>
  <div class="search-result">
    <component
      class="result"
      :is="`${type_name}-result`"
      :type-slug="type_slug"
      :type-name="type_name"
      :data="data" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import AudioResult from './types/audio'
import MapsResult from './types/maps'
import NarrativesResult from './types/narratives'
import PagesResult from './types/pages'
import PlayersResult from './types/players'
import TimelinesResult from './types/timelines'
import VideosResult from './types/videos'

import { convertPermalinks } from '@/utils'

export default {
  name: 'search-result',
  props: {
    data: {
      type: Object
    }
  },
  // created() {
  //   // console.log(this.data.type)
  //   if (this.data.type === 'maps') {
  //     console.log(this.data)
  //   }
  // },
  computed: {
    type_name() {
      return convertPermalinks(this.data.type)
    },
    type_slug() {
      return convertPermalinks(this.data.type, 'slug')
    }
  },
  methods: {
    convertPermalinks
  },
  components: {
    AudioResult,
    MapsResult,
    NarrativesResult,
    PagesResult,
    PlayersResult,
    TimelinesResult,
    VideosResult
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/colors';

.search-result {
  display: block;
  margin-bottom: 14px;
  padding: 10px;
  border: 1px solid $color-divider;

  &:hover {
    cursor: pointer;

    a {
      text-decoration: none;
    }
  }

  .type {
    position: relative;
    display: inline-block;
    top: -13px;
    left: -13px;
    background: grey;
    padding: 4px 6px;
    border-radius: 4px;
    color: $color-text-light;
  }

  // .title {
    // display: inline-block;
  // }
}
</style>
