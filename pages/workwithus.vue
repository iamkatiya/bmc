<template>
  <div class="overflow-hidden">
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
    <div class="work-banner">
      <div class="container">
        <div class="work-banner__head">
          WORK WITH US
        </div>
        <div class="work-banner__description">
          We are continually in search of the brightest,<br> most talented individuals from around the globe.
        </div>
      </div>
    </div>
    <div class="work-topics">
      <div class="container">
        <no-ssr>
          <carousel
            :loop="true"
            :dots="true"
            :auto-play="3000"
            :responsive="{1300:{items: 4}, 1030:{items: 3}, 0:{items: 2}}"
            class="advantage-carousel"
          >
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-4.svg">
                </div>
                <div class="advantage-item__text">
                  IT
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-3.svg">
                </div>
                <div class="advantage-item__text">
                  Finance
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-2.svg">
                </div>
                <div class="advantage-item__text">
                  Blockchain
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-1.svg">
                </div>
                <div class="advantage-item__text">
                  International Relations
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-5.svg">
                </div>
                <div class="advantage-item__text">
                  PR
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-6.svg">
                </div>
                <div class="advantage-item__text">
                  Legal Department
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-4.svg">
                </div>
                <div class="advantage-item__text">
                  IT
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-3.svg">
                </div>
                <div class="advantage-item__text">
                  Finance
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-2.svg">
                </div>
                <div class="advantage-item__text">
                  Blockchain
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-1.svg">
                </div>
                <div class="advantage-item__text">
                  International Relations
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-5.svg">
                </div>
                <div class="advantage-item__text">
                  PR
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/work-6.svg">
                </div>
                <div class="advantage-item__text">
                  Legal Department
                </div>
              </div>
            </div>
          </carousel>
        </no-ssr>
      </div>
    </div>
    <div class="work-feedback">
      <div class="container">
        <div class="work-feedback__head">
          You didn’t find what are you looking for?
        </div>
        <div class="work-feedback__description">
          If you are creative, curious and passionate<br> Choose career path and
        </div>
        <div
          class="work-feedback__btn yellow-btn"
          @click="showModalWindow = true"
        >
          SEND US YOUR APPLICATION
        </div>
        <div class="work-feedback__description">
          BMC is always searching talents like you
        </div>
      </div>
    </div>
    <transition name="fade">
      <form
        v-if="showModalWindow"
        class="modal-get-consult"
        enctype="multipart/form-data"
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
            Send Your Resume
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
            <div class="modal-flexbox">
              <div class="modal-input">
                <input v-model="formData.name" type="text" placeholder="First Name">
              </div>
              <div class="modal-input">
                <input v-model="formData.lastName" type="text" placeholder="Last Name">
              </div>
              <p>Please provide your legal name</p>
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
            <div class="modal-textarea resume-textarea">
              <textarea
                v-model="formData.comment"
                placeholder="A few words about you"
              />
            </div>
            <div class="modal-input">
              <input v-model="formData.url" type="url" placeholder="Attach your portfolio (URL) for review">
            </div>
            <div class="modal-upload">
              <img src="../static/screpka.svg">
              <p>{{ resumeValue }}</p>
              <input ref="file" name="attachment" type="file" @change="signalChange">
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
            @click="sendForm(topicValue, formData.name, formData.lastName, formData.email, formData.phone, formData.comment, formData.url)"
          >
            Send
          </a>
          <div class="modal-checkbox">
            <div class="add-payment__radiobutton hosting__radiobutton">
              <input id="radio-1" v-model="checkTrue" type="checkbox" name="checkbox">
              <label for="radio-1" />
            </div>
            <div>I have read and agree with <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.</div>
          </div>
        </div>
      </form>
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
            Your resume has been sent.<br>
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
      },
      showModalWindow: false,
      showSuccessWindow: false,
      errorForm: false,
      checkTrue: true,
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true
      },
      topicMenu: false,
      topicValue: 'Blockchain',
      resumeValue: 'Attach your resume',
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
      data: '',
      formData: {
        topic: 'Blockchain',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        comment: '',
        url: '',
        attachment: ''
      },
      testFormData: ''
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
      this.showModalWindow = false
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
      this.topicCountry = false
    },
    changeTopic (p) {
      this.topicValue = p
      this.topicMenu = true
    },
    countryChange (country) {
      // this.formData.country = country.dialCode
    },
    signalChange (evt) {
      this.resumeValue = evt.target.files[0].name
      this.formData.attachment = this.$refs.file.files[0]
    },
    sendForm (a, b, c, d, e, f, g, h) {
      this.testFormData = new FormData()
      this.testFormData.append('attachment', this.formData.attachment)
      this.testFormData.append('topic', this.formData.topic)
      this.testFormData.append('name', this.formData.name)
      this.testFormData.append('email', this.formData.email)
      this.testFormData.append('phone', this.formData.phone)
      this.testFormData.append('comment', this.formData.comment)
      this.testFormData.append('url', this.formData.url)
      if ((a === '') || (b === '') || (c === '') || (d === '') || (e === '') || (f === '') || (g === '') || (h === '') || (!this.checkTrue)) {
        this.errorForm = true
        console.log(this.errorForm)
        setTimeout(() => {
          this.errorForm = false
        }, 1200)
      } else {
        this.errorForm = false
        axios.post('https://core.bmc.ai/send/resume', this.testFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            this.showModalWindow = false
            this.showSuccessWindow = true
          })
      }
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
  .work-banner {
    background-image: linear-gradient(90deg, #202020 -55%, #78787833 100%), url("../static/work-banner.jpg");
    background-repeat: no-repeat;
    padding: 432px 0 335px;
    background-size: cover;
    .container {
      padding-left: 145px;
    }
    &__head {
      font-family: montserratblack, sans-serif;
      font-size: 66px;
      color: #FFFFFF;
      text-transform: uppercase;
    }
    &__description {
      font-family: montserratlight,sans-serif;
      font-weight: 800;
      font-size: 28px;
      line-height: 45px;
      color: #FFFFFF;
      margin-top: 30px;
    }
  }
  .advantage-item {
    flex: 25%;
    text-align: center;
    margin-bottom: 50px;
    &:nth-child(n+9) {
      flex: 20%;
    }
    &__image {
      width: 171px;
      height: 167px;
      background: #F7F7F7;
      box-shadow: -9px -6px 10px #FFFFFF, 0 0px 17px -6px rgba(62, 62, 62, 0.6);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 7px auto 0;
      padding: 42px 45px;
      @media (max-width: 600px) {
        padding: 10px;
      }
    }
    &__text {
      font-family: montserratlight, sans-serif;
      font-size: 24px;
      line-height: 39px;
      letter-spacing: 0.24px;
      color: #171717;
      flex: 100%;
      padding-top: 25px;
      margin: 0 auto;
    }
  }
  .work-topics {
    background: #F7F7F7;
    padding-top: 42px;
    padding-bottom: 95px;
  }
  .advantage-carousel {
    .owl-theme .owl-nav {
      display: none;
    }
    .owl-theme .owl-dots .owl-dot span {
      background-color: #E6B510 !important;
      opacity: 0.2;
    }
    .owl-dot.active span {
      opacity: 1 !important;
    }
    button {
      outline: none;
    }
  }
  .work-feedback {
    background: #F7F7F7;
    padding-bottom: 152px;
    text-align: center;
    &__head {
      font-family: montserratblack, sans-serif;
      font-size: 40px;
      margin-bottom: 30px;
      color: #303030;
    }
    &__description {
      font-family: montserratlight, sans-serif;
      font-weight: 900;
      font-size: 28px;
      line-height: 45px;
      color: #3E3E3E;
    }
    &__btn {
      margin: 60px auto;
    }
  }
  .modal-upload {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 30px;
    p {
      font-family: montserratlight,sans-serif;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
      margin-left: 15px;
      cursor: pointer;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
  }
  .modal-input {
    &__nested {
      background-image: url("../static/arrow.svg");
    }
  }
  @import "~@/assets/scss/media";
</style>
