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
    <div class="contacts-form">
      <div class="container">
        <h2 class="contacts-form__head">
          We are always <span class="color-yellow">happy</span> to talk to you!
        </h2>
        <div class="contacts-form__description">
          We may already have an answer for you there!
        </div>
      </div>
      <div class="contacts-form__container form">
        <form
          class="form__main"
        >
          <div
            v-if="errorForm"
            class="form__error"
          >
            Please fill in all fields
          </div>
          <div
            class="form__item form-input"
            @click="topicMenu = !topicMenu"
          >
            <p class="form-input__head">
              Choose topic<span class="color-yellow">*</span>
            </p>
            <div
              class="form__select"
            >
              {{ topicValue }}
            </div>
          </div>
          <div
            v-if="topicMenu"
            v-on-clickaway="closeTopic"
            class="form__description form-menu form-menu__mobile"
          >
            <template v-for="(item, itemIndex) in topicItems">
              <div
                :key="itemIndex"
                class="form-menu__item"
                @click="changeTopic(item.name)"
              >
                {{ item.name }}
              </div>
            </template>
          </div>
          <div class="form__item form-input">
            <p class="form-input__head">
              Full name<span class="color-yellow">*</span>
            </p>
            <input v-model="formData.name" name="name" type="text" placeholder="IVANOV IVAN">
          </div>
          <div class="form__item form-input">
            <p class="form-input__head">
              Email<span class="color-yellow">*</span>
            </p>
            <input v-model="formData.email" name="email" type="text" placeholder="IVANOV@GMAIL.COM">
          </div>
          <div class="form__item form-input">
            <p class="form-input__head">
              Phone<span class="color-yellow">*</span>
            </p>
            <vue-tel-input
              v-model="formData.phone"
              class="contacts-tel-input"
              name="phone"
              placeholder="9836938883"
              autocomplete="off"
              v-bind="bindProps"
              @country-changed="countryChange"
            />
          </div>
          <div class="form__item">
            <div class="form__textarea form-textarea">
              <p class="form-input__head">
                How can we help you?<span class="color-yellow">*</span>
              </p>
              <p class="form-textarea__description">
                Please provide details regarding your question.
              </p>
            </div>
            <textarea v-model="formData.comment" name="comment" placeholder="Please provide details regarding your question." />
          </div>
          <a
            class="form__btn yellow-btn"
            @click="sendForm(topicValue, formData.name, formData.email, formData.phone, formData.comment)"
          >
            Send Message
          </a>
          <div class="modal-sign">
            By using this website, you consent to the processing of data about you by BMC (the Operator) in the manner and for the purposes set out in the Privacy Policy and Personal Data Processing Policy.
          </div>
        </form>
        <transition name="fade">
          <div
            v-if="topicMenu"
            class="form__description form-menu form-menu__desctop"
          >
            <template v-for="(item, itemIndex) in topicItems">
              <div
                :key="itemIndex"
                class="form-menu__item"
                @click="changeTopic(item.name)"
              >
                {{ item.name }}
              </div>
            </template>
          </div>
        </transition>
      </div>
    </div>
    <div class="mails">
      <div class="container">
        <div class="mails__item">
          <h3>For sales inquiries:</h3>
          <a href="mailto:sales@bmc.ai">sales@bmc.ai</a>
        </div>
        <div class="mails__item">
          <h3>For support requests:</h3>
          <a href="mailto:info@bmc.ai">info@bmc.ai</a>
        </div>
        <div class="mails__item">
          <h3>For other inquiries:</h3>
          <a href="mailto:bmc@bmc.ai">bmc@bmc.ai</a>
        </div>
      </div>
    </div>
    <div
      id="address"
      class="addresses"
    >
      <div class="container">
        <div class="addresses__item address address__active">
          <div class="address__city">
            IRKUTSK
          </div>
          <div class="address__description">
            Worksite and Bitfury Sales office (Authorized Distributor)
          </div>
          <div class="address__direction">
            17 Friedrich Engels Str. 312, Irkutsk, Russia 664007
          </div>
          <div class="address__phone">
            <p>Phone</p>
            <a href="#">+7 924 290 75 75</a>
          </div>
          <div class="address__telegram">
            <p>Telegram</p>
            <a href="#">@BMCru</a>
          </div>
        </div>
        <div class="addresses__item address">
          <div class="address__city">
            HONG KONG
          </div>
          <div class="address__description">
            Partner
          </div>
          <div class="address__direction">
            Baikal Mining Company Limited
          </div>
        </div>
        <div class="addresses__item address">
          <div class="address__city">
            SWITZERLAND
          </div>
          <div class="address__description">
            Partner
          </div>
          <div class="address__direction">
            BMC International GmbH
          </div>
        </div>
      </div>
    </div>
    <div class="contacts-map">
      <div class="container">
        <no-ssr>
          <yandex-map
            :coords="coords"
            :zoom="10"
          >
            <ymap-marker
              :coords="coords"
              marker-id="123"
              hint-content="some hint"
            />
          </yandex-map>
        </no-ssr>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showModalWindow"
        class="modal-temporary"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-temporary__content"
        >
          <img
            class="modal-temporary__close"
            src="../static/close.svg"
            @click="showModalWindow = false"
          >
          <div class="modal-temporary__head">
            Congratulations!
          </div>
          <div class="modal-temporary__text">
            Your application has been sent.<br>
            Our manager will contact you shortly.
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
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import mainFooter from '~/components/footer.vue'
import aboutHead from '~/components/about.vue'
import windowScrollPosition from '~/plugins/window-scroll-position'

export default {
  components: {
    mainFooter,
    aboutHead,
    yandexMap,
    ymapMarker
  },
  directives: {
    /* eslint-disable */
    onClickaway: onClickaway
    /* eslint-enable */
  },
  mixins: [windowScrollPosition('position')],
  data () {
    return {
      changePassValue: '',
      successfulResetPass: false,
      unsuccessfulResetPass: false,
      loggedUser: '',
      showSuccessRegitration: false,
      createAcc: true,
      signIn: false,
      resetPass: false,
      showCreateAcc: false,
      showSuccessWindow: false,
      checkTrue: true,
      unautorization: '',
      rate: 0,
      errors: [],
      countries: [],
      topicCountry: false,
      topicCountryValue: 'Country',
      coords: [
        52.28546654,
        104.30376131
      ],
      topicMenu: false,
      showModalWindow: false,
      headerScroll: false,
      topicValue: 'IT',
      errorForm: false,
      topicItems: [
        {
          name: 'IT'
        },
        {
          name: 'Finance'
        },
        {
          name: 'International Relations'
        },
        {
          name: 'PR'
        },
        {
          name: 'Legal Department'
        }
      ],
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true
      },
      formData: {
        topic: 'IT',
        name: '',
        email: '',
        phone: '',
        comment: ''
      },
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
  mounted () {
    if (this.$cookies.get('token')) {
      setTimeout(() => {
        this.formData.name = this.$store.state.user.name
        this.formData.email = this.$store.state.user.email
        this.formData.phone = this.$store.state.user.phone
      }, 100)
    }
  },
  methods: {
    changeTopic (p) {
      this.topicValue = p
      this.topicMenu = false
      this.formData.topic = p
    },
    countryChange (country) {
      this.formData.country = country.dialCode
    },
    closeModal () {
      this.showModalWindow = false
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
      this.topicCountry = false
    },
    sendForm (a, b, c, d, e) {
      // console.log(this.formData.country)
      if ((a === '') || (b === '') || (c === '') || (d === '') || (e === '')) {
        this.errorForm = true
      } else {
        this.errorForm = false
        axios.post('https://core.bmc.ai/send/application', this.formData)
          .then((response) => {
            this.showModalWindow = true
          })
      }
    },
    closeTopic () {
      this.topicMenu = false
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
  .head-scroll {
    opacity: 0;
  }
  .contacts-form {
    background-color: #F7F7F7;
    padding: 95px 0 140px;
    overflow: hidden;
    .container {
      padding-top: 112px;
    }
    &__container {
      margin: 0 135px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    &__head {
      text-align: center;
      font-family: montserratblack, sans-serif;
      font-size: 40px;
      letter-spacing: 0.4px;
      color: #303030;
    }
    &__description {
      text-align: center;
      font-family: montserratlight, sans-serif;
      line-height: 45px;
      font-size: 28px;
      letter-spacing: 0.28px;
      color: #171717;
      padding-top: 10px;
    }
  }
  .form {
    &__main {
      max-width: 665px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      padding-top: 75px;
      @media (min-width: 2000px) {
        margin-left: calc(50% - 332px);
      }
    }
    &__error {
      position: absolute;
      left: calc(100% + 60px);
      top: calc(50% - 45px);
      width: 170px;
      height: 60px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid rgba(207, 45, 55, 0.65);
      background-color: rgba(207, 67, 44, 0.45);
      font-size: 16px;
    }
    &__select {
      width: 100%;
      border: 1px solid rgba(120, 120, 120, 0.6);
      border-radius: 30px;
      background-color: transparent;
      text-align: center;
      padding: 11px 25px;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: 0.3px;
      color: #3E3E3E;
      text-transform: uppercase;
      max-width: 464px;
      cursor: pointer;
      background-image: url("../static/arrow.svg");
      background-repeat: no-repeat;
      background-position: 95% 17px;
      background-size: auto;
    }
    &__description {
      width: 464px;
      background-color: rgba(242, 243, 243, 0.95);
      border-radius: 22px;
      padding: 13px 97px;
      font-family: montserratlight, sans-serif;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: 0.3px;
      color: #3E3E3E;
    }
    &__item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      input, textarea {
        width: 100%;
        border: 1px solid rgba(120, 120, 120, 0.6);
        border-radius: 30px;
        background-color: transparent;
        outline: none;
        padding: 11px 25px;
        font-family: montserratlight, sans-serif;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: 0.3px;
        color: #3E3E3E;
        text-transform: uppercase;
        max-width: 464px;
      }
      textarea {
        min-height: 146px;
        max-height: 200px;
        min-width: 464px;
        border-radius: 20px;
        text-transform: none;
      }
    }
    &__textarea {
      display: flex;
      flex-wrap: wrap;
      p {
        flex: 100%;
      }
    }
    &__btn {
      border: none;
      margin-left: auto;
      padding: 18px 28px;
      font-size: 15px;
      letter-spacing: 0.3px;
      cursor: pointer;
      max-width: 185px;
    }
  }
  .form-input {
    &__head {
      font-family: montserratsemibold,sans-serif;
      font-size: 24px;
      letter-spacing: 0.24px;
      color: #303030;
      margin-right: auto;
      position: relative;
    }
  }
  .form-textarea {
    &__description {
      font-family: montserratlight, sans-serif;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.14px;
      color: #171717;
      padding-right: 40px;
      padding-top: 20px;
    }
  }
  .form-menu {
    padding: 13px 97px;
    &__item {
      padding: 4px 0;
      cursor: pointer;
      &:hover {
        font-weight: 900;
      }
    }
    &__desctop {
      position: absolute;
      margin-left: 200px;
      top: 122px
    }
    &__active {
      font-family: montserratbold, sans-serif;
    }
    &__mobile {
      @media (min-width: 1301px) {
        display: none;
      }
      @media (max-width: 1300px) {
        width: 464px;
        margin-left: auto;
        margin-bottom: 22px;
      }
    }
    &__desctop {
      @media (max-width: 1300px) {
        display: none;
      }
    }
  }
  .mails {
    background-color: #F7F7F7;
    padding: 0 0 145px;
    &__item {
      margin-bottom: 80px;
      h3 {
        text-align: center;
        font-family: montserratblack, sans-serif;
        font-size: 40px;
        letter-spacing: 0.4px;
        color: #303030;
      }
      a {
        text-align: center;
        font-family: montserratlight, sans-serif;
        line-height: 45px;
        font-size: 28px;
        letter-spacing: 0.28px;
        color: #171717;
        padding-top: 10px;
        text-decoration: none;
        display: flex;
        justify-content: center;
      }
    }
  }
  .contacts-map {
    background-color: #F7F7F7;
    margin-top: -215px;
    padding-bottom: 180px;
    .container {
      justify-content: center;
      display: flex;
    }
  }
  .addresses {
    background-color: #F7F7F7;
    padding-bottom: 50px;
    .container {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    &__item {
      flex: 33%;
      margin: 0 17px;
    }
  }
  .address {
    border: 3px solid #E6B510;
    border-radius: 15px;
    padding: 46px 76px 55px 42px;
    max-width: 370px;
    max-height: 280px;
    &__city {
      font-family: montserratlight, sans-serif;
      font-size: 30px;
      letter-spacing: 0.3px;
      color: #303030;
      text-transform: uppercase;
      margin-bottom: 30px;
    }
    &__description {
      font-family: montserratbold, sans-serif;
      font-size: 22px;
      line-height: 27px;
      letter-spacing: 0.22px;
      color: #303030;
      margin-bottom: 25px;
    }
    &__direction {
      font-family: montserratlight, sans-serif;
      letter-spacing: 0.22px;
      color: #303030;
      font-size: 22px;
      line-height: 27px;
      margin-bottom: 30px;
    }
    &__phone {
      padding-left: 50px;
      background-image: url("../static/contacts-phone.svg");
      background-repeat: no-repeat;
      background-position-x: left;
      background-position-y: top;
      background-size: auto;
      font-family: montserratlight, sans-serif;
      letter-spacing: 0.22px;
      color: #303030;
      font-size: 22px;
      line-height: 27px;
      margin-bottom: 30px;
      a {
        color: #303030;
        text-decoration: none;
      }
      p {
        font-family: montserratsemibold, sans-serif;
      }
    }
    &__telegram {
      padding: 5px 0 5px 50px;
      background-image: url("../static/contacts-telegram.svg");
      background-repeat: no-repeat;
      background-position-x: left;
      background-position-y: center;
      background-size: auto;
      font-family: montserratlight, sans-serif;
      letter-spacing: 0.22px;
      color: #303030;
      font-size: 22px;
      line-height: 27px;
      display: flex;
      align-items: center;
      a {
        color: #303030;
        text-decoration: none;
        padding-left: 10px;
      }
      p {
        font-family: montserratsemibold, sans-serif;
      }
    }
    &__active {
      background: #F7F7F7;
      box-shadow: 2px 5px 10px #E6E6E6;
      border-radius: 15px;
      padding: 46px 76px 55px 42px;
      border: none;
      max-width: 420px;
      max-height: 480px;
      z-index: 1;
    }
  }
  .contacts-tel-input {
    width: 100%;
    border: 1px solid rgba(120, 120, 120, 0.6)!important;
    border-radius: 30px!important;
    background-color: transparent;
    padding-left: 20px;
    font-family: montserratlight, sans-serif;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #3E3E3E;
    text-transform: uppercase;
    max-width: 464px;
    max-height: 46px;
    &:focus-within {
      box-shadow: none!important;
    }
    input {
      border: none;
      padding-left: 15px;
    }
  }
  .vti__dropdown:focus {
    border: 1px solid transparent!important;
    outline: transparent;
  }
  .vti__dropdown-list {
    border-radius: 10px;
    margin-top: 13px!important;
    margin-left: -8px!important;
  }
  .vti__selection {
    font-family: montserratbold, sans-serif;
    font-size: 16px!important;
    letter-spacing: 0.16px;
    filter: brightness(0.2);
    border-right: 1px solid #171717;
    padding-right: 10px;
    .vti__country-code {
      margin-right: 12px;
    }
  }
  .vti__dropdown-arrow {
    margin-top: 8px;
  }
  .ymap-container {
    height: 897px;
    width: 100%;
  }
  @import "~@/assets/scss/media";
</style>
