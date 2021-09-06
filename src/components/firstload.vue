<template>
  <div class="firstload">
    <div class="center">
      <div v-if="warning" class="warning">
        <div class="message">
          <h1>CONTENT ADVISORY:</h1>
          <div class="text">
            The banjo has a long and contested history that includes racist and misogynistic images and language.  For a fuller understanding of the music, its players and audiences, we’ve included potentially offensive content and tried to put it in its cultural context, which should in no way be seen as excusing or condoning it.
          </div>
        </div>
        <div>
          <button @click="emitLoaded">Continue</button>
        </div>
      </div>
      <div v-else>
        <logo class="logo" />
        <div class="tagline">
          A Digital Museum
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'
import Logo from '@/components/logo'

export default {
  name: 'firstload',
  data() {
    return {
      warning: false
    }
  },
  mounted() {
    this.startCountdown()
  },
  methods: {
    async startCountdown() {
      await sleep(2000)
      if (!JSON.parse(localStorage.getItem('warning_viewed'))) {
        await this.showWarning()
      } else {
        this.emitLoaded()
      }
    },
    async showWarning() {
      this.warning = true
    },
    emitLoaded() {
      localStorage.setItem('warning_viewed', true)
      this.$emit('loaded')
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

.firstload {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $color-background-dark;
  color: $color-text-light;
  text-align: center;
}
.center {
  position: absolute;
  width: 600px;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.logo {
  display: inline-block;
  width: 200px;
}
.tagline {
  margin-top: 20px;
}
.warning {
  margin-top: 20px;
  font-size: 0.8em;

  .message {
    h1 {
      font-size: 1.4em;
      margin-bottom: 0.4em;
    }
    .text {
      margin-bottom: 1.2em;
    }
  }

  button {
    background: $color-highlight;
    color: $color-text-dark;
    font-weight: 600;

    &:hover {
      color: darken($color-text-dark, 10);
      background: darken($color-highlight, 10);
    }
  }
}
</style>
