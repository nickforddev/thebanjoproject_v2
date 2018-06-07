<template>
  <div class="firstload">
    <div class="center">
      <div v-if="warning" class="warning">
        CONTENT ADVISORY: The banjo has a long and contested history that includes racist and misogynistic images and language.  For a fuller understanding of the music, its players and audiences, we’ve included potentially offensive content and tried to put it in its cultural context, which should in no way be seen as excusing or condoning it.
      </div>
      <div v-else>
        <logo />
        <div class="tagline">
          A Digital Musem
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
      }
      localStorage.setItem('warning_viewed', true)
      this.emitLoaded()
    },
    async showWarning() {
      this.warning = true
      await sleep(5000)
    },
    emitLoaded() {
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
  width: 200px;
}
.tagline {
  margin-top: 20px;
}
.warning {
  margin-top: 20px;
  font-size: 0.8em;
}
</style>
