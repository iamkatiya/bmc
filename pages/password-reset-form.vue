<template>
  <div class="modal-account__reset-pass">
    <div class="modal-account__head">
      Reset Password
    </div>
    <div class="modal-input">
      <input
        v-model="changePassEmail"
        type="email"
        placeholder="Your email"
      >
    </div>
    <div class="modal-input">
      <input
        v-model="changePassValue"
        type="password"
        placeholder="Your new password"
      >
    </div>
    <div class="modal-input">
      <input
        v-model="changePassConfirmValue"
        type="password"
        placeholder="Confirm your new password"
      >
    </div>
    <div class="modal-errors">
      <div v-for="(item, itemIndex) in errors">
        {{ item[0] }}
      </div>
    </div>
    <div class="modal-success">
      {{ modalSuccess }}
    </div>
    <a
      class="modal-send-btn yellow-btn"
      @click="changePassword"
    >
      Change password
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      changePassEmail: '',
      changePassValue: '',
      changePassConfirmValue: '',
      token: '',
      errors: [],
      modalSuccess: ''
    }
  },
  created () {

  },
  methods: {
    changePassword () {
      this.token = $nuxt.$route.query.token
      axios.post('/api/password/reset ', { email: this.changePassEmail, token: this.token, password: this.changePassValue, password_confirmation: this.changePassConfirmValue })
        .then((response) => {
          this.modalSuccess = response.data.message
        })
        .catch((error) => {
          this.modalSuccess = ''
          this.errors = error.response.data.errors
        })
    }
  }
}
</script>

<style lang="scss">
  .modal-account {
    &__head {
      margin-bottom: 15px;
    }
    &__reset-pass {
      margin: 100px auto;
    }
  }
  .modal-success {
    color: #34A853;
  }
  @import "~@/assets/scss/media";
</style>
