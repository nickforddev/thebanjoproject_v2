<template>
  <div v-if="fetched">
    <header :style="{background: `url(${data.acf.banner.url})`}">
      <h1 v-html="data.title.rendered" />
    </header>
    <div class="content">
      <iframe src="" ref="iframe" class="iframe"></iframe>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Sketchfab from '@sketchfab/viewer-api'

export default {
  name: 'bollman-house',
  data() {
    return {
      fetched: false,
      data: null,
      audioStarted: false
    }
  },
  async mounted() {
    await this.fetch()
    this.initMedia()
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.data = (await this.$request('wp/v2/narratives?slug=bollman-house'))[0]
      this.fetched = true
    },
    initMedia() {
      // Sketchfab Viewer API: Annotation hit also picks mesh
      const version = '1.10.1'
      const uid = 'b0866ff937c1475da3dbd8b661575f76'
      const iframe = this.$refs.iframe
      const client = new Sketchfab(version, iframe)

      // eslint-disable-next-line no-console
      const error = err => console.error('Sketchfab API error:', err)

      const success = api => {
        api.start()
        api.addEventListener('viewerready', () => {
          if (!this.audioStarted) {
            this.playAudio({ song: this.data.acf.audio })
            this.audioStarted = true
          }
        })

        api.addEventListener('click', () => {
          if (!this.audioStarted) {
            this.playAudio({ song: this.data.acf.audio })
            this.audioStarted = true
          }
        })
      }

      client.init(uid, {
        annotation: 0, // Usage: Setting to [1 – 100] will automatically load that annotation when the viewer starts.
        annotations_visible: 1, // Usage: Setting to 0 will hide annotations by default.
        autospin: 0, // Usage: Setting to any other number will cause the model to automatically spin around the z-axis after loading.
        autostart: 1, // Usage: Setting to 1 will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.
        cardboard: 0, // Usage: Start the viewer in stereoscopic VR Mode built for Google Cardboard and similar devices.
        camera: 1, // Usage: Setting to 0 will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.
        preload: 1, // Usage: Setting to 1 will force all resources (textures) to download before the scene is displayed.
        ui_stop: 0, // Usage: Setting to 0 will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.
        transparent: 0, // Usage: Setting to 1 will make the model's background transparent
        ui_animations: 0, // Usage: Setting to 0 will hide the animation menu and timeline.
        ui_annotations: 0, // Usage: Setting to 0 will hide the Annotation menu.
        ui_controls: 1, // Usage: Setting to 0 will hide all the viewer controls at the bottom of the viewer (Help, Settings, Inspector, VR, Fullscreen, Annotations, and Animations).
        ui_fullscreen: 1, // Usage: Setting to 0 will hide the Fullscreen button.
        ui_general_controls: 1, // Usage: Setting to 0 will hide main control buttons in the bottom right of the viewer (Help, Settings, Inspector, VR, Fullscreen).
        ui_help: 0, // Usage: Setting to 0 will hide the Help button.
        ui_hint: 1, // Usage: Setting to 0 will always hide the viewer hint animation ("click & hold to rotate"). Setting to 1 will show the hint the first time per browser session (using a cookie). Setting to 2 will always show the hint.
        ui_infos: 0, // Usage: Setting to 0 will hide the model info bar at the top of the viewer.
        ui_inspector: 0, // Usage: Setting to 0 will hide the inspector button.
        ui_settings: 0, // Usage: Setting to 0 will hide the Settings button.
        ui_vr: 0, // Usage: Setting to 0 will hide the View in VR button.
        ui_ar: 0, // Usage: Setting to 0 will hide the View in AR button.
        ui_watermark_link: 0, // Usage: Setting to 0 remove the link from the Sketchfab logo watermark.
        ui_color: '00a8c0', // Usage: Setting to a hexidecimal color code (without the #) or a HTML color name will change the color of the viewer loading bar.
        ui_watermark: 0, // Usage: Setting to 0 remove the Sketchfab logo watermark.

        success: success,
        error: error,
        version: version
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

header {
  text-shadow: 0px 2px 3px rgba(0,0,0, 0.4);
}

.iframe {
  height: 50vh;
  min-height: 50vh;
}
</style>
