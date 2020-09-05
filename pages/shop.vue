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
                @click="changeCountry(item.common)"
              >
                {{ item.common }}
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
    <div class="mdc">
      <div class="mdc__head container">
        We create opportunities <span class="color-yellow">for future earnings</span>
      </div>
      <div class="mdc__banner mdc__container mdc-about">
        <div class="mdc__content">
          <h2 class="mdc-about__head">
            Mobile Data Centre (MDC)
          </h2>
          <div class="mdc-about__description">
            <p>
              The mobile data center offers you an easy solution to mount your mining equipment onto it and get it up and running shortly in a cost-effective way.
              <br>
              <br>
              If you are used to managing your assets and do not depend on third-parties, this might be a perfect solution for you.
            </p>
          </div>
          <a
            class="mdc-about__btn"
            @click="showModalWindow = true"
          >
            Create your own MDC <span class="mobile-none">with our 3D-Configurator</span>
          </a>
        </div>
        <div
          class="mdc__dots mdc-dot"
        >
          <div
            class="mdc-dot__row"
          >
            <div
              class="mdc-dot__item mdc-dot__center"
              :class="{ 'dot-active': dotFirstActive }"
              @click="dotFirstActive =! dotFirstActive"
            >
              <transition name="fade">
                <div
                  v-if="dotFirstActive"
                  v-on-clickaway="firstAway"
                  class="mdc-dot__content"
                >
                  White Exterior Painting Reduces cooling costs and gives our distinct style.
                </div>
              </transition>
            </div>
          </div>
          <div class="mdc-dot__row">
            <div
              class="mdc-dot__item mdc-dot__left"
              :class="{ 'dot-active': dotSecondActive }"
              @click="dotSecondActive =! dotSecondActive"
            >
              <transition name="fade">
                <div
                  v-if="dotSecondActive"
                  v-on-clickaway="secondAway"
                  class="mdc-dot__content"
                >
                  12 axial flow fans from the leading German manufacturer.
                </div>
              </transition>
            </div>
          </div>
          <div class="mdc-dot__row">
            <div
              class="mdc-dot__item mdc-dot__right"
              :class="{ 'dot-active': dotThirdActive }"
              @click="dotThirdActive =! dotThirdActive"
            >
              <transition name="fade">
                <div
                  v-if="dotThirdActive"
                  v-on-clickaway="thirdAway"
                  class="mdc-dot__content"
                >
                  All-weather grid <br>
                  In-house manufacture having perfect geometry and vandal-proof functions
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mdc__items mdc__container data-centre"
      >
        <div
          v-for="(item, itemIndex) in products"
          :key="itemIndex"
          class="data-centre__container-item"
        >
          <div class="data-centre__item">
            <div
              class="data-centre__head"
              :class="{'background-beige':item.name === 'MDC-S9', 'background-gray':item.name === 'MDC-S19', 'background-yellow':item.name === 'MDC-S17', 'background-black':item.name === 'MDC-M21'}"
            >
              {{ item.name }}
            </div>
            <div
              class="data-centre__content"
              v-html="item.description"
            />
            <a
              class="data-centre__btn more-btn"
              @click="uploadItem(itemIndex)"
            >
              order now
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      id="bitfury"
      class="server-left"
    >
      <div class="container">
        <div class="server-left__img">
          <img src="../static/server-new.svg">
        </div>
        <div class="server-left__text server-description">
          <div class="server-description__head">
            {{ bitfuryTardisB9.name }}
          </div>
          <div
            class="server-description__text"
            v-html="bitfuryTardisB9.description"
          />
          <div class="server-description__buttons">
            <a
              href="/bmcbitfury.pdf"
              target="_blank"
              class="more-btn"
            >
              Data Sheet
            </a>
            <a
              class="more-btn more-btn__black"
              @click="uploadBitfuryB9"
            >
              order now
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="server-right">
      <div class="container">
        <div class="server-right__text server-description">
          <div class="server-description__head">
            {{ bitfuryTardisBoost.name }}
          </div>
          <div
            class="server-description__text"
            v-html="bitfuryTardisBoost.description"
          />
          <div class="server-description__buttons">
            <a
              href="/bitfuryb9.pdf"
              target="_blank"
              class="more-btn"
            >
              Data Sheet
            </a>
            <a
              class="more-btn more-btn__black"
              @click="uploadBitfuryBoost"
            >
              order now
            </a>
          </div>
        </div>
        <div class="server-right__img">
          <img src="../static/srv-3.png">
        </div>
      </div>
    </div>
    <div
      id="mining"
      class="shop-demos"
    >
      <div class="container">
        <div class="shop-demos__text investment-services__item">
          <div class="investment-services__row">
            <div class="investment-services__photo">
              <img src="../static/shop-1.svg">
            </div>
            <div class="investment-services__text">
              <h3>Platform for monitoring of mining operations</h3>
              <p>A simple and effective solution to monitor and manage your mining equipment.</p>
              <a
                class="investment-services__btn more-btn"
                @click="showTemporaryWindow = true"
              >
                demo
              </a>
            </div>
          </div>
          <div class="investment-services__row">
            <div class="investment-services__photo">
              <img src="../static/shop-2.svg">
            </div>
            <div class="investment-services__text">
              <h3>B2B Software Tools</h3>
              <p>Development of B2B class applications to help you streamline business processes in your organization.</p>
              <a
                href="https://gio.ru/"
                target="_blank"
                class="investment-services__btn more-btn"
              >
                demo
              </a>
            </div>
          </div>
        </div>
        <div class="shop-demos__img">
          <img src="../static/computer-3.png">
        </div>
      </div>
    </div>
    <div class="software-feedback">
      <div class="container">
        <h2 class="feedback__title">
          Still have questions?
        </h2>
        <div class="feedback__description">
          We have answers!
        </div>
        <a
          class="feedback__btn yellow-btn mb-0"
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
            @click="closeModal"
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
              <input id="radio-7" v-model="checkTrue" type="checkbox" name="checkbox">
              <label for="radio-7" />
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
        v-if="showOrderForm"
        class="modal-order"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-order__content"
        >
          <div class="forscroll">
            <img
              class="modal-get-consult__close"
              src="../static/close.svg"
              @click="showOrderForm = false, topicProductMenu = false"
            >
            <div class="modal-order__head">
              Order:
            </div>
            <div
              class="modal-input modal-input__product modal-input__nested"
              @click="topicProductMenu = !topicProductMenu"
            >
              <div>
                {{ activeItemInForm }}
              </div>
              <div
                v-if="topicProductMenu"
                class="modal-input__dropdown"
              >
                <template v-for="(product, productIndex) in totalProducts">
                  <div
                    :key="productIndex"
                    class="form-menu__item"
                    @click="changeActiveProduct(product.id)"
                  >
                    {{ product.name }}
                  </div>
                </template>
              </div>
            </div>
            <div class="modal-order__flexbox order-details">
              <div class="order-details__left-item">
                <div class="order-details__image">
                  <img :src="activePhotoInForm">
                </div>
              </div>
              <div class="order-details__right-item">
                <div class="order-details__availability">
                  Availability: upon request
                </div>
                <div class="order-details__unit-price">
                  Unit price: upon request
                </div>
                <div class="order-details__quantity">
                  <p>Quantity*:</p>
                  <div class="tech__quantity">
                    <div
                      class="tech__plus"
                      @click="changeQuantityPlus"
                    />
                    <div class="tech__number">
                      {{ quantity }}
                    </div>
                    <div
                      class="tech__minus"
                      @click="changeQuantityMinus"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="modal-flexbox">
                <div class="modal-input">
                  <input v-model="orderFormData.client" type="text" placeholder="First Name">
                </div>
                <div class="modal-input">
                  <input v-model="orderFormData.lastName" type="text" placeholder="Last Name">
                </div>
                <p>Please provide your legal name</p>
              </div>
              <div class="modal-input">
                <input v-model="orderFormData.email" type="email" placeholder="Email">
              </div>
              <vue-tel-input
                v-model="orderFormData.phone"
                class="modal-tel-input"
                placeholder="9836938883"
                autocomplete="off"
                v-bind="bindProps"
                @country-changed="countryChange"
              />
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
            </div>
            <div
              v-if="errorForm"
              class="modal__error"
            >
              Please fill in all fields
            </div>
            <div class="modal-order__flexbox">
              <a
                class="modal-order-btn yellow-btn"
                @click="sendOrder(orderFormData.client, orderFormData.lastName,orderFormData.email,orderFormData.phone)"
              >
                SENT
              </a>
            </div>
            <div
              v-if="!userLoggedIn"
              class="modal-createAccount"
            >
              Already Have an Account? <span @click="signInActiveFromModalWindow">Login</span>
            </div>
            <div
              class="modal-checkbox"
            >
              <div class="add-payment__radiobutton hosting__radiobutton">
                <input id="radio-1" v-model="checkTrue" type="checkbox" name="checkbox">
                <label for="radio-1" />
              </div>
              <div>I have read and agree with <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.</div>
            </div>
            <div
              class="modal-checkbox"
            >
              <div class="add-payment__radiobutton hosting__radiobutton">
                <input id="radio-2" type="checkbox" name="checkbox">
                <label for="radio-2" />
              </div>
              <div>Yes, please keep me updated on BMC news, offers and events</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="showTemporaryWindow"
        class="modal-temporary"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-temporary__content"
        >
          <img
            class="modal-temporary__close"
            src="../static/close.svg"
            @click="showTemporaryWindow = false"
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
  components: {
    mainFooter,
    aboutHead
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
      userLoggedIn: false,
      showSuccessRegitration: false,
      createAcc: true,
      signIn: false,
      resetPass: false,
      showCreateAcc: false,
      unautorization: '',
      rate: 0,
      errors: [],
      products: [],
      countries: [],
      bitfuryTardisB9: [],
      bitfuryTardisBoost: [],
      activeItem: [],
      activeItemInForm: '',
      activePhotoInForm: '',
      ops: {
        onlyShowBarOnScroll: false,
        opacity: 1
      },
      vuescroll: {
        onlyShowBarOnScroll: false,
        opacity: 1
      },
      quantity: 1,
      showOrderForm: false,
      showTemporaryWindow: false,
      checkTrue: true,
      firstOrderForm: true,
      secondOrderForm: false,
      dotFirstActive: true,
      dotSecondActive: false,
      dotThirdActive: false,
      showModalWindow: false,
      showSuccessWindow: false,
      errorForm: false,
      showOrderWindow: true,
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true
      },
      activeTotalSum: 0,
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
      topicProductMenu: false,
      topicProductValue: 'Blockchain',
      topicProductItems: [],
      formData: {
        topic: 'Blockchain',
        name: '',
        email: '',
        phone: '',
        comment: ''
      },
      orderFormData: {
        product: '',
        client: '',
        lastName: '',
        phone: '',
        country: '',
        email: '',
        quantity: '',
        unit_price: '',
        total_cost: '',
        product_description: ''
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
      totalProducts: []
    }
  },
  created () {
    axios.get('https://core.bmc.ai/products/get', {
    })
      .then((data) => {
        this.products = data.data.slice(0, 4)
        this.bitfuryTardisB9 = data.data[4]
        this.bitfuryTardisBoost = data.data[5]
        this.totalProducts = data.data
      })
    axios.get('https://core.bmc.ai/countries')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.countries.push(response.data[i])
        }
      })
    if (this.$cookies.get('token')) {
      this.userLoggedIn = true
    }
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
    firstAway () {
      this.dotFirstActive = false
    },
    secondAway () {
      this.dotSecondActive = false
    },
    thirdAway () {
      this.dotThirdActive = false
    },
    closeModal () {
      this.showModalWindow = false
      this.showSuccessWindow = false
      this.showOrderForm = false
      this.showTemporaryWindow = false
      this.topicProductMenu = false
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
      this.topicCountry = false
    },
    signInActiveFromModalWindow () {
      this.showOrderForm = false
      this.signIn = true
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
    changeActiveProduct (p) {
      this.activeItemInForm = this.totalProducts[parseInt(p) - 1].name
      this.activePhotoInForm = this.totalProducts[parseInt(p) - 1].image
      this.topicProductMenu = true
    },
    changeQuantityPlus () {
      this.quantity = this.quantity + 1
      this.activeTotalSum = this.activeItem.price * this.quantity
    },
    changeQuantityMinus () {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1
        this.activeTotalSum = this.activeItem.price * this.quantity
      }
    },
    countryChange (country) {
      // this.formData.country = country.dialCode
    },
    showSecondWindow () {
      this.firstOrderForm = false
      this.secondOrderForm = true
    },
    uploadItem (itemIndex) {
      this.showOrderForm = true
      this.activeItem = this.products[itemIndex]
      this.activeTotalSum = this.activeItem.price
      this.quantity = 1
      this.activeItemInForm = this.products[itemIndex].name
      this.activePhotoInForm = this.products[itemIndex].image
    },
    uploadBitfuryB9 () {
      this.activeItem = this.bitfuryTardisB9
      this.showOrderForm = true
      this.activeTotalSum = this.activeItem.price
      this.quantity = 1
      this.activeItemInForm = this.bitfuryTardisB9.name
      this.activePhotoInForm = this.totalProducts[4].image
    },
    uploadBitfuryBoost () {
      this.activeItem = this.bitfuryTardisBoost
      this.showOrderForm = true
      this.activeTotalSum = this.activeItem.price
      this.quantity = 1
      this.activeItemInForm = this.bitfuryTardisBoost.name
      this.activePhotoInForm = this.totalProducts[5].image
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
    sendOrder (a, b, c, d) {
      this.orderFormData.product = this.activeItemInForm
      this.orderFormData.unit_price = this.activeItem.price
      this.orderFormData.country = this.topicCountryValue
      this.orderFormData.quantity = this.quantity
      this.orderFormData.total_cost = this.activeTotalSum
      if ((a === '') || (b === '') || (c === '') || (d === '') || (!this.checkTrue)) {
        this.errorForm = true
        setTimeout(() => {
          this.errorForm = false
        }, 1200)
      } else {
        axios.post('https://core.bmc.ai/send/order', this.orderFormData)
          .then((response) => {
            this.showSuccessWindow = true
            this.showOrderForm = false
          })
      }
      /* eslint-disable */
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
          this.$cookies.set("token", response.data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          axios.get('/api/user', { headers: { Authorization: 'Bearer ' + this.$store.state.token } })
            .then((response) => {
              this.$store.commit('USER_INFO', response.data)
              this.$router.push('lk')
            })
            .catch(error => {
              if (error.response.data.message === 'Unauthenticated.') {
                this.errors = []
                this.unautorization = 'ERROR: Invalid email or password.'
              }
              // this.errors = error.response.data.errors
            });
        })
        .catch(error => {
          this.errors = error.response.data.errors
        });
    },
    signInGo () {
      this.errors = []
      axios.post('/api/register', this.formDataSign, {
      })
        .then((response) => {
          if (response.data.error === 1) {
            this.loggedUser = response.data.message
            setTimeout(()=>{
              this.loggedUser = ''
            }, 2000)
          } else {
            this.showCreateAcc = false
            this.showSuccessRegitration = true
            setTimeout(()=>{
              this.showSuccessRegitration = false
              this.signIn = true
            }, 2000)
          }
        })
        .catch(error => {
          this.errors = error.response.data.errors
        });
    },
    changePassword () {
      axios.post('/api/password/email', {email: this.changePassValue})
        .then((response) => {
          this.successfulResetPass = true
          setTimeout(() => {
            this.successfulResetPass = false
          }, 3200)
        })
        .catch(error => {
          this.unsuccessfulResetPass = true
          setTimeout(() => {
            this.unsuccessfulResetPass = false
          }, 1200)
        });
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/fonts";
  @import "~@/assets/scss/main";
  .mdc {
    padding: 134px 0 74px;
    background-color: #EFF0F0;
    &__container {
      max-width: 1662px;
      margin-left: auto;
      display: flex;
    }
    .container {
      padding-top: 112px;
    }
    &__content {
      flex: 30%;
    }
    &__dots {
      flex: 70%;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }
    &__head {
      font-family: montserratbold, sans-serif;
      font-size: 32px;
      line-height: 44px;
      text-align: center;
      letter-spacing: 3.84px;
      text-transform: uppercase;
      color: #303030;
    }
    &__banner {
      background-image: url("../static/mmdc.png");
      background-repeat: no-repeat;
      background-position: 100% -90px;
      background-size: auto;
      margin-top: 125px;
      padding-top: 25px;
      padding-bottom: 150px;
    }
    &__items {
      display: flex;
    }
    &-about {
      &__head {
        font-family: montserratbold, sans-serif;
        font-size: 36px;
        line-height: 44px;
        color: #787878;
        padding-top: 15px;
        padding-bottom: 50px;
      }
      &__description {
        max-width: 505px;
        p {
          font-family: robotolight, sans-serif;
          font-size: 22px;
          line-height: 34px;
          color: #3E3E3E;
          padding-bottom: 40px;
          max-height: 334px;
          &:last-child {
            padding-bottom: 0;
          }
        }
      }
      &__btn {
        border: 1px solid rgba(230, 181, 16, 0.6);
        border-radius: 30px;
        padding: 18px 25px;
        font-family: montserratlight,sans-serif;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.3px;
        color: #3E3E3E;
        white-space: nowrap;
        text-transform: uppercase;
        display: table;
        text-decoration: none;
        margin-top: 67px;
        cursor: pointer;
      }
    }
    &-about {
      &__btn {
        transition: 0.3s;
        &:hover {
          color: white;
          background-color: #E6B510;
        }
      }
    }
  }
  .mdc-dot {
    &__row {
      flex: 100%;
      align-items: center;
      display: flex;
    }
    &__item {
      transition: 0.3s;
      cursor: pointer;
      position: relative;
      width: 40px;
      height: 40px;
      background-image: url("../static/dot.svg");
      animation-name: spin;
      animation-duration: 5000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      &:hover {
        background-image: url("../static/dot-active.svg");
        background-repeat: no-repeat;
      }
    }
    &__center {
      margin-left: auto;
      margin-right: 415px;
      margin-top: 55px;
    }
    &__left {
      margin-right: auto;
      margin-left: 220px;
      margin-top: -100px;
    }
    &__right {
      margin-left: auto;
      margin-right: 320px;
      margin-bottom: 60px;
    }
    &__content {
      position: absolute;
      width: 208px;
      height: 105px;
      padding: 22px 20px;
      text-align: center;
      background: #E6B510;
      border-radius: 8px;
      top: calc(-100% - 42px);
      left: -85px;
      font-family: montserratbold, sans-serif;
      font-size: 11px;
      line-height: 14px;
      &:before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50px;
        background: #ECECEC;
        bottom: -6px;
        left: calc(50% - 7px);
      }
    }
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
  .data-centre {
    &__item {
      width: 300px;
      background: #F2F3F3;
      box-shadow: -9px -6px 10px #fff, 0 0 17px -6px rgba(62,62,62,.3);
      border-radius: 15px;
      padding: 26px 0 30px;
    }
    &__container-item {
      margin-right: 26px;
      &:last-child {
        margin-right: 0;
      }
    }
    &__head {
      padding: 11px 0;
      font-size: 22px;
      text-align: center;
    }
    &__btn {
      transition: 0.3s;
      &:hover {
        background-color: #3E3E3E;
        color: white;
      }
    }
    &__content {
      color: #3E3E3E;
      font-family: robotolight, sans-serif;
      font-size: 18px;
      line-height: 20px;
      padding: 36px 18px 20px 53px;
      p {
        position: relative;
        padding-bottom: 20px;
        &:before {
          content: '';
          position: absolute;
          width: 15px;
          height: 15px;
          background: #A2A2A2;
          transform: rotate(45deg);
          left: -32px;
        }
      }
    }
    &__btn {
      margin: 0 auto;
      padding: 14px 27px;
      letter-spacing: 0.3px;
      font-size: 15px;
      max-width: max-content;
    }
  }
  .server-left {
    padding-top: 50px;
    background-color: #F7F7F7;
    .container {
      display: flex;
      border-bottom: 1px solid rgba(23, 23, 23, 0.5);
      padding-bottom: 50px;
    }
    &__text {
      padding: 74px 0 74px 140px;
    }
  }
  .server-right {
    padding-top: 50px;
    padding-bottom: 103px;
    background-color: #F7F7F7;
    .container {
      display: flex;
    }
    &__text {
      padding: 74px 140px 74px 0;
    }
    &__img {
      margin-left: auto;
    }
  }
  .server-description {
    &__head {
      color: #787878;
      font-family: montserratbold, sans-serif;
      font-size: 36px;
      line-height: 44px;
      padding-bottom: 42px;
    }
    &__text {
      color: #3E3E3E;
      font-family: robotolight, sans-serif;
      font-size: 24px;
      line-height: 34px;
      max-width: 500px;
    }
    &__buttons {
      display: flex;
      margin-top: 42px;
      a {
        display: table;
        &:first-child {
          margin-right: 23px;
        }
      }
    }
  }
  .shop-demos {
    background-color: #EFF0F0;
    padding-top: 85px;
    .container {
      display: flex;
    }
    &__img {
      margin-right: -330px;
      margin-bottom: -50px;
      padding-left: 98px;
      @media (min-width: 1921px) {
        margin-right: -630px;
      }
      @media (min-width: 2650px) {
        margin-right: -830px;
      }
      @media (min-width: 3040px) {
        margin-right: -1300px;
      }
    }
    .investment-services__item {
      padding: 0;
    }
    .investment-services__text p {
      font-family: robotolight, sans-serif;
      font-size: 24px;
      line-height: 34px;
    }
  }
  .investment-services {
    &__btn {
      margin-top: 60px;
      transition: 0.3s;
    }
  }
  .software-feedback {
    padding-top: 170px;
  }
  .more-btn {
    transition: 0.3s;
    font-family: montserratlight, sans-serif;
    border: 1px solid rgba(23, 23, 23, 0.6);
    font-weight: 700;
    &:hover {
      background-color: #3E3E3E;
      color: white;
    }
    &__black {
      transition: 0.3s;
      @media (min-width: 1030px) {
        background-color: #3E3E3E;
        color: white;
        &:hover {
          background-color: transparent;
          color: #3E3E3E;
        }
      }
      @media (max-width: 1031px) {
        background-color: transparent;
        color: #3e3e3e!important;
      }
    }
  }
  .dot-active {
    background-image: url("../static/dot-active.svg");
    background-repeat: no-repeat;
    animation: none;
  }
  .modal-input {
    &__nested {
      background-image: url("../static/arrow.svg");
    }
  }
  .modal-order {
    display: flex;
    z-index: 11;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    &__content {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 36px 58px;
      width: 480px;
      position: relative;
    }
    &__head {
      font-family: montserratblack, sans-serif;
      font-size: 28px;
      color: #303030;
      text-align: center;
      margin-bottom: 25px;
    }
    &__item-head {
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 24px;
      color: #787878;
      text-transform: uppercase;
      text-align: center;
      margin-top: 35px;
      margin-bottom: 30px;
    }
    &__flexbox {
      display: flex;
      justify-content: center;
    }
    &__small-text {
      font-family: montserratlight, sans-serif;
      font-size: 10px;
      letter-spacing: 0.24px;
      color: #303030;
      font-weight: 600;
      margin-bottom: 17px;
    }
  }
  .tech {
    &__quantity {
      display: flex;
    }
    &__plus {
      background-image: url("../static/plus.svg");
      background-size: auto;
      background-repeat: no-repeat;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    &__minus {
      background-image: url("../static/minus.svg");
      background-size: auto;
      background-repeat: no-repeat;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    &__number {
      width: 70px;
      height: 18px;
      border: 1px solid rgba(120, 120, 120, 0.2);
      border-radius: 9px;
      margin-left: 15px;
      margin-right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: montserratlight, sans-serif;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
    }
  }
  .order-details {
    &__right-item {
      flex: 50%;
      width: 50%;
    }
    &__left-item {
      flex: 50%;
      width: 50%;
    }
    &__quantity {
      font-family: montserratlight, sans-serif;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
      margin-top: 17px;
      margin-bottom: 23px;
      p {
        padding-bottom: 10px;
        font-weight: 600;
      }
    }
    &__image {
      width: 150px;
      height: 126px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__availability {
      font-family: montserratlight, sans-serif;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
      margin-bottom: 10px;
      font-weight: 600;
    }
    &__model {
      font-family: montserratlight, sans-serif;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0.24px;
      color: #303030;
      border: 1px solid rgba(120, 120, 120, 0.4);
      border-radius: 6px;
      padding: 5px 20px 5px 17px;
      margin-bottom: 5px;
    }
    &__unit-price {
      margin-top: 15px;
      font-family: montserratlight, sans-serif;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
      font-weight: 600;
    }
    &__total-cost {
      margin-top: 17px;
      font-family: montserratbold, sans-serif;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
      font-weight: 600;
    }
  }
  .modal-checkbox {
    font-family: montserratlight,sans-serif;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.24px;
    color: #303030;
    display: flex;
    margin-top: 25px;
    align-items: center;
    a {
      text-decoration: none;
      color: #1877F2;
    }
  }
  .hosting__radiobutton {
    margin-right: 27px;
  }
  .black-btn {
    background-color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 19px 25px;
    color: white;
    box-shadow: 0 2px 10px #A1A1A181;
    text-transform: uppercase;
    border-radius: 30px;
    font-size: 14px;
    text-decoration: none;
    transition: 0.3s;
    cursor: pointer;
    margin-left: 5px;
  }
  .modal-order-btn {
    font-family: montserratbold, sans-serif;
    width: 177px;
    height: 40px;
    margin: 0 3px;
  }
  .modal__error {
    margin-bottom: 20px;
  }
  .modal-createAccount {
    text-align: center;
  }
  ::-webkit-scrollbar { width: 7px; height: 3px; border-radius: 10px}
  ::-webkit-scrollbar-track { margin-right: 30px; background-color: rgba(153, 153, 153, 0.35); border-radius: 10px;}
  ::-webkit-scrollbar-track-piece { background-color: rgba(120, 120, 120, 0.1); width: 10px; border-radius: 10px;}
  ::-webkit-scrollbar-thumb { height: 50px; background-color: rgba(153, 153, 153, 0.75); border-radius: 10px;}
  @import "~@/assets/scss/media";
</style>
