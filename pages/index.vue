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
    <div
      class="header-scrolled-background"
      :class="{ 'header-scrolled-background__active' : position[1] > 0 }"
    />
    <div class="banner">
      <no-ssr>
        <carousel
          class="banner__carousel"
          :autoplay="true"
          :autoplay-speed="1000"
          :speed="1000"
          :items="1"
        >
          <img src="../static/banner-main.png">
          <img src="../static/mining-background.png">
          <img src="../static/banner-main.png">
        </carousel>
      </no-ssr>
      <main-header
        :class="{ 'header-small' : position[1] > 0 }"
      />
      <div class="banner__navigation nav container">
        <div class="nav__content">
          <div class="nav__head">
            We also think different
          </div>
          <div
            class="nav__arrow desctop-none"
            @click="openSlide(1)"
          />
          <div class="nav__buttons mobile-none">
            <a
              @click="openSlide(2)"
            >
              For investors
            </a>
            <a
              @click="openSlide(3)"
            >
              Mining
            </a>
            <a
              @click="openSlide(2)"
            >
              Software
            </a>
          </div>
        </div>
      </div>
      <div class="banner__description bar container">
        <div class="bar__item mobile-none">
          <img src="../static/desc-1.svg">
          <p>Cheap electricity tariff <br>on a legal basis. High electrical capacity.</p>
        </div>
        <div class="bar__item mobile-none">
          <img src="../static/desc-2.svg">
          <p>High-quality hosting of equipment at our own worksite located at Irkutsk, Lake Baikal.</p>
        </div>
        <div class="bar__item">
          <img src="../static/desc-3.svg">
          <p>Revenue per 1TH/s * 24H = <span>$ {{ rate }}</span></p>
        </div>
        <div class="bar__item mobile-none">
          <img src="../static/desc-5.svg">
          <p>In-house fabrication and merchandising of Mobile Data Centers  <br> (MDC).</p>
        </div>
        <div class="bar__item mobile-none">
          <img src="../static/desc-6.svg">
          <p>Merchandising and maintenance of mining <br>equipment.</p>
        </div>
      </div>
    </div>
    <div
      ref="slaid-1"
      class="bar-mobile"
    >
      <div class="bar-mobile__content container">
        <div class="bar-mobile__item">
          <div class="bar-mobile__photo">
            <img src="../static/desc-1.svg">
          </div>
          <div class="bar-mobile__text">
            <p>Cheap electricity tariff on a legal basis. High electrical capacity.</p>
          </div>
        </div>
        <div class="bar-mobile__item">
          <div class="bar-mobile__photo">
            <img src="../static/desc-5.svg">
          </div>
          <div class="bar-mobile__text">
            <p>In-house fabrication and merchandising of Mobile Data Centers (MDC).</p>
          </div>
        </div>
        <div class="bar-mobile__item">
          <div class="bar-mobile__photo">
            <img src="../static/desc-6.svg">
          </div>
          <div class="bar-mobile__text">
            <p>Merchandising and maintenance of mining equipment.</p>
          </div>
        </div>
        <div class="bar-mobile__item">
          <div class="bar-mobile__photo">
            <img src="../static/desc-2.svg">
          </div>
          <div class="bar-mobile__text">
            <p>High-quality hosting of equipment at our own worksite located at Irkutsk, Lake Baikal.</p>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="slaid-2"
      class="about"
    >
      <div class="container">
        <h2 class="about__title">
          Baikal Mining Company
        </h2>
        <div class="about__description">
          Your reliable partner in the world of mining equipment and blockchain technology.
        </div>
      </div>
      <div class="about__container card">
        <div class="card__item">
          <p class="card__title">
            For investors
          </p>
          <p class="card__description">
            <vuescroll :ops="ops">
              Targeted at the development of innovative and disruptive technologies we attract additional funding on a profit-sharing basis. Our promising business model can quickly build a sustainable advantage to maximize profit.
            </vuescroll>
          </p>
          <a
            href="investment"
            class="card__btn more-btn"
          >
            Learn More
          </a>
        </div>
        <div class="card__item">
          <p class="card__title">
            Software development
          </p>
          <p class="card__description">
            <vuescroll>
              Our Team develops monitoring systems for mining equipment and blockchain-based software solutions to streamline business processes, to upgrade quality of services and cost minimization of the customers.
            </vuescroll>
          </p>
          <a
            href="software"
            class="card__btn more-btn"
          >
            Learn More
          </a>
        </div>
        <img
          class="card__photo"
          src="../static/МЦОД1.png"
        >
      </div>
    </div>
    <div
      ref="slaid-3"
      class="mining"
    >
      <div class="container">
        <div class="mining__title">
          Mining solutions
        </div>
        <ul class="mining__description">
          <li class="mining__head">
            We bring to your attention our mining solutions:
          </li>
          <li>
            - production and sale of mobile data centers (MDC)
          </li>
          <li>
            - hosting of your equipment and rental of parking space for your containers
          </li>
          <li>
            - sale of processing capacity
          </li>
        </ul>
        <a
          href="mining"
          class="mining__btn more-btn"
        >
          Learn More
        </a>
      </div>
    </div>
    <div class="options about">
      <h2 class="about__title">
        You Can Make Money Right Now
      </h2>
      <div class="container">
        <div class="options__card">
          <img src="../static/opt-4.png">
          <div class="options__text">
            Mobile Data Centre (MDC)
          </div>
          <a
            href="shop"
            class="more-btn"
          >
            Learn More
          </a>
        </div>
        <div class="options__card">
          <img src="../static/opt-1.png">
          <div class="options__text">
            Bitfury Equipment
          </div>
          <nuxt-link
            class="more-btn"
            :to="{path: '/shop', hash: 'bitfury'}"
          >
            Learn More
          </nuxt-link>
        </div>
        <div class="options__card">
          <img src="../static/opt-3.png">
          <div class="options__text">
            Monitoring Platform for Mining
          </div>
          <nuxt-link
            class="more-btn"
            :to="{path: '/shop', hash: 'mining'}"
          >
            Learn More
          </nuxt-link>
        </div>
        <div class="options__card">
          <img src="../static/opt-2.png">
          <div class="options__text">
            B2B Software Tools
          </div>
          <nuxt-link
            class="more-btn"
            :to="{path: '/shop', hash: 'mining'}"
          >
            Learn More
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="feedback about">
      <div class="container">
        <h2 class="about__title">
          Still have questions?
        </h2>
        <div class="about__description">
          We have answers!
        </div>
        <a
          class="feedback__btn yellow-btn"
          @click="showModalWindow = true"
        >
          To get a consultation
        </a>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showModalWindow"
        class="modal-get-consult"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-get-consult__content"
        >
          <img
            class="modal-get-consult__close"
            src="../static/close.svg"
            @click="showModalWindow = false"
          >
          <div class="modal-get-consult__head">
            How can we help you?
          </div>
          <div class="modal-get-consult__form">
            <div
              class="modal-input modal-input__nested"
              @click="topicMenu = !topicMenu"
            >
              <div>
                {{ topicValue }}
              </div>
              <div
                v-if="topicMenu"
                class="modal-input__dropdown"
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
            </div>
            <div class="modal-input">
              <input v-model="formData.name" type="text" placeholder="Your Name">
            </div>
            <div class="modal-input">
              <input v-model="formData.email" type="email" placeholder="Email">
            </div>
            <vue-tel-input
              v-model="formData.phone"
              class="modal-tel-input"
              placeholder="9836938883"
              autocomplete="off"
              v-bind="bindProps"
              @country-changed="countryChange"
            />
            <div class="modal-textarea">
              <textarea
                v-model="formData.comment"
                placeholder="Please provide details regarding your question."
              />
            </div>
          </div>
          <div
            v-if="errorForm"
            class="modal__error"
          >
            Please fill in all fields
          </div>
          <a
            class="modal-send-btn yellow-btn"
            :class="{ 'modal-send-btn__mistake': errorForm }"
            @click="sendForm(topicValue, formData.name, formData.email, formData.phone, formData.comment)"
          >
            Send Message
          </a>
          <div class="modal-checkbox">
            <div class="add-payment__radiobutton hosting__radiobutton">
              <input id="radio-1" v-model="checkTrue" type="checkbox" name="checkbox">
              <label for="radio-1" />
            </div>
            <div>I have read and agree with <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.</div>
          </div>
          <div class="modal-sign">
            By using this website, you consent to the processing of data about you by BMC (the Operator) in the manner and for the purposes set out in the Privacy Policy and Personal Data Processing Policy.
          </div>
        </div>
      </div>
    </transition>
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
            Congratulations!
          </div>
          <div class="modal-temporary__text">
            Your application has been sent.<br>
            Our manager will contact you shortly.
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="showSuccessRegitration"
        class="modal-temporary"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-temporary__content"
        >
          <div class="modal-temporary__head">
            Success!
          </div>
          <div class="modal-temporary__text">
            Your account has been created.<br>
            Enter your data to enter your personal account.
          </div>
        </div>
      </div>
    </transition>
    <main-footer />
<!--    <no-ssr>-->
<!--      <script>-->
<!--        window.fbAsyncInit = function() {-->
<!--        FB.init({-->
<!--        appId      : '413315919554387',-->
<!--        cookie     : true,-->
<!--        xfbml      : true,-->
<!--        version    : 'v7.0'-->
<!--        });-->

<!--        FB.AppEvents.logPageView();-->

<!--        };-->

<!--        (function(d, s, id){-->
<!--        var js, fjs = d.getElementsByTagName(s)[0];-->
<!--        if (d.getElementById(id)) {return;}-->
<!--        js = d.createElement(s); js.id = id;-->
<!--        js.src = "https://connect.facebook.net/en_US/sdk.js";-->
<!--        fjs.parentNode.insertBefore(js, fjs);-->
<!--        }(document, 'script', 'facebook-jssdk'));-->
<!--      </script>-->
<!--    </no-ssr>-->
  </div>
</template>

<script>
import axios from 'axios'
import { directive as onClickaway } from 'vue-clickaway'
import vuescroll from 'vuescroll'
import mainFooter from '~/components/footer.vue'
import mainHeader from '~/components/header.vue'
import windowScrollPosition from '~/plugins/window-scroll-position'

export default {
  directives: {
    /* eslint-disable */
    onClickaway: onClickaway
    /* eslint-enable */
  },
  components: {
    mainFooter,
    mainHeader,
    vuescroll
  },
  mixins: [windowScrollPosition('position')],
  data () {
    return {
      changePassValue: '',
      showSuccessRegitration: false,
      createAcc: true,
      signIn: false,
      resetPass: false,
      showModalWindow: false,
      showSuccessWindow: false,
      showCreateAcc: false,
      errorForm: false,
      checkTrue: true,
      invalidName: false,
      unautorization: '',
      loggedUser: '',
      successfulResetPass: false,
      unsuccessfulResetPass: false,
      rate: 0,
      errors: [],
      ops: {
        onlyShowBarOnScroll: false,
        opacity: 1
      },
      vuescroll: {
        onlyShowBarOnScroll: false,
        opacity: 1
      },
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true
      },
      topicCountry: false,
      topicCountryValue: 'Country',
      topicCountryItems: [
        {
          name: 'Russian Federation'
        },
        {
          name: 'China'
        },
        {
          name: 'France'
        },
        {
          name: 'Japan'
        },
        {
          name: 'Australia'
        },
        {
          name: 'USA'
        }
      ],
      topicMenu: false,
      topicValue: 'Blockchain',
      topicItems: [
        {
          name: 'Blockchain'
        },
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
      formData: {
        topic: 'Blockchain',
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
      },
      countries: []
    }
  },
  created () {
    axios.get('https://hashratecost.com/json/get_data_day_avg_sha256x2.json')
      .then((response) => {
        this.rate = (response.data.cost_unit_24h_usd_avg).toFixed(3)
      })
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
      }, 2500)
    }
  },
  methods: {
    openSlide (n) {
      const slide = this.$refs[`slaid-${n}`]
      const top = window.scrollY + slide.getBoundingClientRect().y
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    },
    changeTopic (p) {
      this.topicValue = p
      this.topicMenu = true
      this.formData.topic = p
    },
    changeCountry (p) {
      this.topicCountryValue = p.name
      this.formDataSign.country = p.id
      this.topicCountry = true
    },
    countryChange (country) {
      // this.formData.country = country.dialCode
    },
    closeModal () {
      this.showModalWindow = false
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
    },
    loginFacebook () {
      axios.get('api/login/facebook', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Max-Age': '3600',
          'Access-Control-Allow-Headers': 'x-requested-with, accept, content-type'
        }
      })
        .then((data) => {
          console.log(data)
        })
    },
    loginGoogle () {
      axios.get('api/login/google', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((data) => {
          console.log(data)
        })
    },
    sendForm (a, b, c, d, e) {
      // console.log(this.formData.country)
      if ((a === '') || (b === '') || (c === '') || (d === '') || (e === '') || (!this.checkTrue)) {
        this.errorForm = true
        setTimeout(() => {
          this.errorForm = false
        }, 1200)
      } else {
        this.errorForm = false
        axios.post('https://core.bmc.ai/send/application', this.formData)
          .then((response) => {
            this.showModalWindow = false
            this.showSuccessWindow = true
          })
      }
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
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/fonts";
.invalidField {
  border: 1px solid rgba(255, 0, 0, 0.49) !important;
}
.banner {
  background: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3));
  background-size: cover;
  position: relative;
  overflow: hidden;
  //height: 100vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1030px) {
    background: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url("../static/main-background-min.jpg");
    background-size: cover;
    background-position-x: center;
  }
  .container {
    max-width: 1660px;
    margin-left: auto;
    margin-right: auto;
    transition: 0.3s;
  }
  &__navigation {
    display: flex;
    align-items: center;
    padding: 418px 0 300px;
    @media (max-width: 1300px) {
      padding: 265px 0;
    }
  }
}
.nav {
  &__content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__head {
    font-family: montserratbold, sans-serif;
    display: flex;
    justify-content: center;
    flex: 100%;
    font-size: 48px;
    line-height: 70px;
    letter-spacing: 19.2px;
    text-transform: uppercase;
    text-align: center;
  }
  &__arrow {
    width: 25px;
    height: 25px;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transform: rotate(-45deg);
  }
  &__buttons {
    padding-top: 65px;
    display: flex;

    a {
      font-family: montserratlight, sans-serif;
      width: 215px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 10px;
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 30px;
      opacity: 0.9;
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
      text-decoration: none;
      margin: 0 45px;
      letter-spacing: 0.36px;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
.mining {
  background-image: linear-gradient(90deg, #202020 -30%, #78787833 100%), url('../static/mining-solutions.png');
  background-size: cover;
  padding: 213px 0 128px;
  filter: grayscale(1);
}
.bar {
  display: flex;
  align-self: flex-end;
  margin: 60px auto;
  &__item {
    display: flex;
    align-items: center;
    min-width: 200px;
    max-width: 310px;
    margin: 0 30px;
    font-family: montserratlight, sans-serif;
    font-size: 16px;
    p {
      padding-left: 20px;
    }
    span {
      font-family: montserratsemibold, sans-serif;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.about {
  background-color: #F7F7F7;
  width: 100%;
  padding: 90px 0 0;
  overflow-x: hidden;
  &__container {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    transition: 0.3s;
  }
  &__title {
    font-family: montserratblack, sans-serif;
    color: #303030;
    font-size: 40px;
    text-align: center;
    width: 100%;
  }
  &__description {
    color: #303030;
    font-family: montserratlight,sans-serif;
    font-size: 28px;
    padding-top: 15px;
    text-align: center;
  }
}
.card {
  padding-top: 45px;
  &__item {
    padding: 100px 0 120px;
    display: flex;
    flex: 33%;
    flex-wrap: wrap;
    &:nth-child(2) {
      padding-left: 40px;
    }
  }

  &__photo {
    width: 1300px;
    height: 650px;
    margin-right: -800px;
    padding-top: 20px;
  }

  &__title {
    font-family: montserratbold, sans-serif;
    font-size: 36px;
    text-transform: uppercase;
    color: #787878;
  }

  &__description {
    font-family: "Roboto Light", sans-serif;
    color: #3e3e3e;
    font-size: 22px;
    line-height: 34px;
    padding-top: 20px;
    max-height: 250px;
  }

  &__btn {
    align-self: flex-end;
    transition: 0.3s;
    margin-top: 20px;
    &:hover {
      border: 1px solid rgba(230, 181, 16, 0.6);
    }
  }
}
.mining {
  &__title {
    font-family: montserratbold, sans-serif;
    font-size: 40px;
    text-transform: uppercase;
  }
  &__description {
    max-width: 410px;
    margin-top: 40px;
    font-family: robotolight, sans-serif;
    font-size: 22px;
    line-height: 34px;
  }
  &__btn {
    margin-top: 50px;
    font-family: montserratlight, sans-serif;
    font-weight: 600;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  &__head {
    font-family: Roboto, sans-serif;
  }
}
.options {
  .container {
    display: flex;
    flex-wrap: wrap;
    margin: 70px auto;
    transition: 0.3s;
  }

  &__card {
    width: calc(25% - 20px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    border-radius: 15px;
    transition: 0.3s;
    margin: 0 10px;
    padding: 33px 45px;
    cursor: pointer;

    img {
      width: 100%;
      height: 135px;
      margin-bottom: 25px;
    }

    &:hover {
      box-shadow: -9px -6px 10px #FFFFFF, 0 0px 17px -6px rgba(62, 62, 62, 0.6);
      background: #F5F5F5;
    }

    a {
      align-self: flex-end;
      transition: 0.3s;

      &:hover {
        border: 1px solid rgba(230, 181, 16, 0.6);
      }
    }
  }

  &__text {
    font-family: Roboto, sans-serif;
    font-size: 22px;
    line-height: 34px;
    color: #3e3e3e;
    min-height: 64px;
    width: 100%;
    font-weight: bold;
    margin-bottom: 25px;
  }
}
.bar-mobile {
  background-color: #f7f7f7;
  padding: 0 35px;
  justify-content: center;
  &__item {
    flex: 50%;
    text-align: center;
    margin-top: 30px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
  }
  &__photo {
    width: 93px;
    height: 94px;
    background: #F7F7F7;
    box-shadow: -9px -6px 10px #FFFFFF, 0 0px 17px -6px rgba(62, 62, 62, 0.6);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    img {
      width: 100%;
      padding: 20px;
      filter: contrast(50%) sepia(100%) hue-rotate(7deg) brightness(0.8) saturate(300%);
    }
  }
  &__text {
    font-family: montserratlight, sans-serif;
    font-size: 12px;
    line-height: 15px;
    color: #787878;
    font-weight: 600;
    flex: 100%;
    padding-top: 15px;
    margin: 0 auto;
    max-width: 113px;
  }
}
.header-scrolled-background {
  position: fixed;
  width: 100%;
  height: 92px;
  background-color: transparent;
  opacity: 0.8;
  transition: 0.3s;
  &__active {
    background-color: #222728;
    z-index: 10;
  }
  @media (max-width: 1300px) {
    height: 75px;
  }
}
.header-small {
  padding: 23px 25px!important;
  align-items: center!important;
}
.modal-input {
  &__nested {
    background-image: url("../static/arrow.svg");
  }
}
@import "~@/assets/scss/main";
@import "~@/assets/scss/media";
</style>
