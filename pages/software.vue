<template>
  <div>
    <div
      v-if="showCreateAcc || signIn || resetPass"
      class="modal-account"
    >
      <div
        v-if="showCreateAcc"
        v-on-clickaway="closeModal"
        class="modal-account__content"
      >
        <img
          class="modal-get-consult__close"
          src="../static/close.svg"
          @click="closeModal"
        >
        <div class="modal-account__head">
          Create Your Free Account
        </div>
        <div class="modal-account__social social-login">
          <div
            class="social-login__item"
            @click="loginFacebook"
          >
            <img src="../static/fsb-login.svg">
            <p>Sign in <br> with Facebook</p>
          </div>
          <div
            class="social-login__item"
            @click="loginGoogle"
          >
            <img src="../static/google-login.svg">
            <p>Sign in <br> with Google</p>
          </div>
        </div>
        <div class="modal-account__or">
          <p>OR</p>
        </div>
        <div class="modal-flexbox">
          <div class="modal-input">
            <input v-model="formDataSign.name" type="text" placeholder="First Name">
          </div>
          <div class="modal-input">
            <input v-model="formDataSign.last_name" type="text" placeholder="Last Name">
          </div>
          <p>Please provide your legal name</p>
        </div>
        <div class="modal-input mb-0">
          <input v-model="formDataSign.email" type="email" placeholder="Email">
        </div>
        <p class="email-sign">
          Password will be send to your inbox
        </p>
        <div
          class="modal-input modal-input__nested"
          @click="topicCountry = !topicCountry"
        >
          <div>
            {{ topicCountryValue }}
          </div>
          <div
            v-if="topicCountry"
            class="modal-input__dropdown"
          >
            <template v-for="(item, itemIndex) in countries">
              <div
                :key="itemIndex"
                class="form-menu__item"
                @click="changeCountry(item)"
              >
                {{ item.name }}
              </div>
            </template>
          </div>
        </div>
        <div class="modal-errors">
          <div v-for="(item, itemIndex) in errors">
            {{ item[0] }}
          </div>
          {{ loggedUser }}
        </div>
        <a
          class="modal-send-btn yellow-btn"
          @click="signInGo"
        >
          Create Your Free Account
        </a>
        <div class="modal-createAccount">
          Already Have an Account? <span @click="signInActive">Login</span>
        </div>
        <div class="modal-sign">
          All fields are required. By creating an account you agree to our <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.
        </div>
      </div>
      <div
        v-if="signIn"
        v-on-clickaway="closeModal"
        class="modal-account__sign-content"
      >
        <img
          class="modal-get-consult__close"
          src="../static/close.svg"
          @click="closeModal"
        >
        <div class="modal-account__head">
          Sign in to Your Account
        </div>
        <div class="modal-account__social social-login">
          <div class="social-login__item">
            <img src="../static/fsb-login.svg">
            <p>Sign in <br> with Facebook</p>
          </div>
          <div class="social-login__item">
            <img src="../static/google-login.svg">
            <p>Sign in <br> with Google</p>
          </div>
        </div>
        <div class="modal-account__or">
          <p>OR</p>
        </div>
        <div
          v-if="unautorization !== ''"
          class="modal-errors modal__invalid-pass"
        >
          {{ unautorization }}
          <div
            class="modal__lost-pass"
            @click="resetPassActive"
          >
            Lost your password?
          </div>
        </div>
        <div class="modal-input">
          <input v-model="formDataLogin.email" type="email" placeholder="Login/ Email">
        </div>
        <div class="modal-input">
          <input v-model="formDataLogin.password" type="password" placeholder="Password">
        </div>
        <div class="modal-errors">
          <div v-for="(item, itemIndex) in errors">
            {{ item[0] }}
          </div>
        </div>
        <div class="modal-createAccount">
          Forgot your password? <span @click="resetPassActive">Reset it here</span>
        </div>
        <a
          class="modal-send-btn yellow-btn"
          @click="logInGo"
        >
          Sign in
        </a>
        <div class="modal-createAccount">
          Need an Account? <span @click="createAccActive">Sign Up for free</span>
        </div>
        <div class="modal-sign">
          All fields are required. By creating an account you agree to our <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.
        </div>
      </div>
      <div
        v-if="resetPass"
        v-on-clickaway="closeModal"
        class="modal-account__reset-pass"
      >
        <img
          class="modal-get-consult__close"
          src="../static/close.svg"
          @click="closeModal"
        >
        <div class="modal-account__head">
          Reset Password
        </div>
        <div class="modal-account__text">
          Forgot your password? Please enter your email address below. You will receive an email containing instructions to reset your password.
        </div>
        <div class="modal-input">
          <input
            v-model="changePassValue"
            type="email"
            placeholder="Email"
          >
        </div>
        <div
          v-if="successfulResetPass"
          class="successful-reset-pass"
        >
          We have emailed your password reset link!
        </div>
        <div
          v-if="unsuccessfulResetPass"
          class="unsuccessful-reset-pass"
        >
          Email is not valid!
        </div>
        <a
          class="modal-send-btn yellow-btn"
          @click="changePassword"
        >
          Send Recovery Email
        </a>
        <div class="modal-createAccount">
          Need an Account? <span @click="createAccActive">Sign Up for free</span>
        </div>
        <div class="modal-sign">
          All fields are required. By creating an account you agree to our <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.
        </div>
      </div>
    </div>
    <about-head
      :class="{ 'header-scrolled' : position[1] > 0 }"
    />
    <div class="software-banner">
      <div class="container">
        <h1 class="software-banner__head">
          Software development
        </h1>
        <div class="software-banner__description">
          IRKLIFE is BMC’s software development team developing and auditing solutions based on blockchain technology.
        </div>
        <div class="software-banner__activity activity">
          <div class="activity__item">
            <div class="activity__photo">
              <img src="../static/activ-1.svg">
            </div>
            <div class="activity__text">
              <p>We develop smart contracts of any complexity</p>
            </div>
          </div>
          <div class="activity__item">
            <div class="activity__photo">
              <img src="../static/acriv-2.svg">
            </div>
            <div class="activity__text">
              <p>We develop systems to monitor and manage your mining equipment</p>
            </div>
          </div>
          <div class="activity__item">
            <div class="activity__photo">
              <img src="../static/activ-3.svg">
            </div>
            <div class="activity__text">
              <p>We develop B2B applications to streamline and improve the efficiency of business processes in your organization</p>
            </div>
          </div>
          <div class="activity__item">
            <div class="activity__photo">
              <img src="../static/activ-4.svg">
            </div>
            <div class="activity__text">
              <p>We apply cutting-edge achievements in programming languages and continuously train our developers to help them master the newest achievements in the field</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="soft-demos">
      <div class="soft-container container">
        <div class="soft-demos__item">
          <div class="soft-demos__photo">
            <img src="../static/acriv-2.svg">
          </div>
          <div class="soft-demos__text">
            <h3>Platform for monitoring of mining operations</h3>
            <p>A simple and effective solution to monitor and manage your mining equipment.</p>
            <a
              class="soft-demos__btn"
              target="_blank"
              @click="showSuccessWindow = true"
            >
              Demo
            </a>
          </div>
        </div>
        <div class="soft-demos__item">
          <div class="soft-demos__photo">
            <img src="../static/activ-3.svg">
          </div>
          <div class="soft-demos__text">
            <h3>B2B Software Tools</h3>
            <p>Development of B2B class applications to help you streamline business processes in your organization.</p>
            <a
              class="soft-demos__btn"
              href="https://gio.ru/"
              target="_blank"
            >
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="software-feedback">
      <div class="container">
        <h2 class="feedback__title">
          For more information please contact our Team at:
        </h2>
        <a
          href="mailto:info@bmc.ai"
          class="software-feedback__btn yellow-btn"
        >
          @Irklife
        </a>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showSuccessWindow"
        class="modal-temporary"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-temporary__content"
        >
          <img
            class="modal-temporary__close"
            src="../static/close.svg"
            @click="showSuccessWindow = false"
          >
          <div class="modal-temporary__head">
            We're sorry
          </div>
          <div class="modal-temporary__text">
            This section is currently not available.
          </div>
        </div>
      </div>
    </transition>
    <main-footer />
  </div>
</template>
<script>
import axios from 'axios'
import { directive as onClickaway } from 'vue-clickaway'
import mainFooter from '~/components/footer.vue'
import aboutHead from '~/components/about.vue'
import windowScrollPosition from '~/plugins/window-scroll-position'
export default {
  directives: {
    /* eslint-disable */
    onClickaway: onClickaway
    /* eslint-enable */
  },
  components: {
    mainFooter,
    aboutHead
  },
  mixins: [windowScrollPosition('position')],
  data () {
    return {
      changePassValue: '',
      successfulResetPass: false,
      unsuccessfulResetPass: false,
      loggedUser: '',
      showSuccessWindow: false,
      showSuccessRegitration: false,
      createAcc: true,
      signIn: false,
      resetPass: false,
      showCreateAcc: false,
      unautorization: '',
      rate: 0,
      errors: [],
      countries: [],
      topicCountry: false,
      topicCountryValue: 'Country',
      formDataLogin: {
        email: '',
        password: ''
      },
      formDataSign: {
        name: '',
        last_name: '',
        email: '',
        country: 0
      }
    }
  },
  created () {
    axios.get('https://core.bmc.ai/countries')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.countries.push(response.data[i])
        }
      })
  },
  methods: {
    closeModal () {
      this.showSuccessWindow = false
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
      this.topicCountry = false
    },
    signInActive () {
      this.errors = []
      this.signIn = true
      this.showCreateAcc = false
    },
    createAccActive () {
      this.errors = []
      this.signIn = false
      this.showCreateAcc = true
      this.resetPass = false
    },
    resetPassActive () {
      this.signIn = false
      this.resetPass = true
    },
    loginFacebook () {
      axios.get('https://core.bmc.ai/login/facebook', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((data) => {
          console.log(data)
        })
    },
    loginGoogle () {
      axios.get('https://core.bmc.ai/login/google', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((data) => {
          console.log(data)
        })
    },
    async logInGo () {
      this.errors = []
      axios.post('/api/login', this.formDataLogin, {
      })
        .then((response) => {
          // eslint-disable-next-line no-undef
          this.$store.commit('SET_TOKEN', response.data.token)
          this.$cookies.set('token', response.data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          axios.get('/api/user', { headers: { Authorization: 'Bearer ' + this.$store.state.token } })
            .then((response) => {
              this.$store.commit('USER_INFO', response.data)
              this.$router.push('lk')
            })
            .catch((error) => {
              if (error.response.data.message === 'Unauthenticated.') {
                this.errors = []
                this.unautorization = 'ERROR: Invalid email or password.'
              }
              // this.errors = error.response.data.errors
            })
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
    signInGo () {
      this.errors = []
      axios.post('/api/register', this.formDataSign, {
      })
        .then((response) => {
          if (response.data.error === 1) {
            this.loggedUser = response.data.message
            setTimeout(() => {
              this.loggedUser = ''
            }, 2000)
          } else {
            this.showCreateAcc = false
            this.showSuccessRegitration = true
            setTimeout(() => {
              this.showSuccessRegitration = false
              this.signIn = true
            }, 2000)
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
    changeCountry (p) {
      this.topicCountryValue = p.name
      this.formDataSign.country = p.id
      this.topicCountry = true
    },
    changePassword () {
      axios.post('/api/password/email', { email: this.changePassValue })
        .then((response) => {
          this.successfulResetPass = true
          setTimeout(() => {
            this.successfulResetPass = false
          }, 3200)
        })
        .catch((error) => {
          this.unsuccessfulResetPass = true
          setTimeout(() => {
            this.unsuccessfulResetPass = false
          }, 1200)
        })
    }
  }
}
</script>
<style lang="scss">
  @import "~@/assets/scss/fonts";
  @import "~@/assets/scss/main";
  .software-banner {
    padding: 115px 0 60px;
    background-image: url("../static/soft-new.jpg");
    background-color: #F2F2F2;
    background-size: cover;
    background-position: center -213px;
    background-repeat: no-repeat;
    .container {
      padding-top: 112px;
    }
    @media (min-width: 2000px) {
      background-position: center;
      background-size: contain;
    }
    @media (max-width: 1850px) {
      background-position: center -50px;
    }
    &__head {
      font-family: montserratbold, sans-serif;
      color: #787878;
      font-size: 66px;
      text-transform: uppercase;
      text-align: center;
    }
    &__description {
      font-family: montserrat, sans-serif;
      font-size: 28px;
      color: #3E3E3E;
      text-align: center;
      padding-top: 25px;
    }
    &__activity {
      margin-top: 882px;
    }
  }
  .activity {
    display: flex;
    padding: 0 85px;
    &__item {
      flex: 25%;
      text-align: center;
      margin-top: 30px;
    }
    &__photo {
      width: 146px;
      height: 146px;
      background: #F1F2F3;
      box-shadow: -9px -6px 10px #FFFFFF, 0 0px 17px -6px rgba(62, 62, 62, 0.6);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      img {
        width: 100%;
        padding: 35px;
        @media (max-width: 750px) {
          padding: 20px;
        }
      }
    }
    &__text {
      font-family: robotolight, sans-serif;
      font-size: 18px;
      line-height: 24px;
      color: #787878;
      flex: 100%;
      padding-top: 15px;
      margin: 0 auto;
      max-width: 260px;
    }
  }
  .soft-container {
    display: flex;
  }
  @import "~@/assets/scss/media";
</style>
