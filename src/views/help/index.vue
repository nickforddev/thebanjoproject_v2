<template>
  <div>
    <header>
      <h1>Help</h1>
    </header>
    <div class="content" v-if="loaded">
      <p>
        Having trouble getting around the site? Please take a brief tour in the video below:
      </p>
      <video
        class="video"
        ref="video"
        :src="tutorialVideo.url"
        controls
      />
      <div class="contact-form">
        <p>
          Or send us a message:
        </p>
        <form :action="formAction" @submit.prevent="submitForm">
          <label for="name">Your name</label>
          <input id="name" type="text" name="your-name">

          <div class="message error" v-if="error['your-name']">
            {{ error['your-name'] }}
          </div>

          <label for="email">Your email</label>
          <input id="email" type="text" name="your-email">

          <div class="message error" v-if="error['your-email']">
            {{ error['your-email'] }}
          </div>

          <label for="subject">Your subject</label>
          <input id="subject" type="text" name="your-subject">

          <div class="message error" v-if="error['your-subject']">
            {{ error['your-subject'] }}
          </div>

          <label for="message">Your message</label>
          <textarea id="message" type="text" name="your-message" />

          <div class="message error" v-if="error['your-message']">
            {{ error['your-message'] }}
          </div>

          <button type="submit">Submit</button>

          <div class="message" v-if="form_message" :class="form_status">
            {{ form_message }}
          </div>
        </form>
      </div>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import config from '@/config'
import Loading from '@/components/loading'

export default {
  name: 'help',
  data: () => ({
    loaded: false,
    form_status: null,
    form_message: null,
    error: {}
  }),
  computed: {
    formAction() {
      return `${config.api}/wp-json/contact-form-7/v1/contact-forms/1975/feedback`
    },
    ...mapGetters({
      tutorialVideo: 'video:tutorial_video'
    })
  },
  async mounted() {
    if (!this.tutorialVideo) {
      const { acf } = await this.$request('acf/v3/options/options')
      this.$store.dispatch('set_tutorial_video', acf.tutorial_video)
    }
    this.loaded = true
  },
  methods: {
    async submitForm(event) {
      const formElement = event.target
      const body = new FormData(formElement)
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      body.set('_wpcf7_recaptcha_response', token)

      fetch(this.formAction, {
        method: 'POST',
        body
      }).then((response) => response.json())
        .then((response) => {
          this.error = {}
          if (response.status === 'validation_failed') {
            for (const field of response.invalid_fields) {
              Vue.set(this.error, field.field, field.message)
            }
          }
          this.form_status = response.status
          this.form_message = response.message
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
          // Handle the case when there's a problem with the request
        })
    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';
.video {
  width: 100%;
}

.contact-form {
  width: 100%;
  max-width: 450px;

  label:not(:first-child) {
    margin-top: 12px;
  }
}

.message {
  padding: 8px;
  color: $color-text-light;
  background-color: $color-status-danger;
  border-radius: 3px;
  margin-top: 6px;
  margin-bottom: 8px;

  &.error {
    color: $color-text-light;
    background-color: $color-status-danger;
  }

  &.mail_sent {
    color: $color-text-dark;
    background-color: $color-status-success;
  }

  &.validation_failed {
    color: $color-text-light;
    background-color: $color-status-danger;
  }
}
</style>
