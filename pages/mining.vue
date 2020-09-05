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
    <div class="mining-banner">
      <div class="container">
        <div class="mining-banner__main">
          <h1 class="mining-banner__head">
            MINING
          </h1>
          <div class="mining-banner__text">
            Managing a large number of devices for mining takes considerable time and requires specific expertise. <br>A specially equipped room with a cooling system and an uninterrupted power supply is required.<br>
            <span class="mining-banner__textbold">We offer an effective solution for you.</span>
          </div>
        </div>
        <div class="mining-banner__list">
          <p>Total capacity of 65 MW, high voltage (HV), 3rd price category</p>
          <p>Electricity at the average rate of $0.038 per kW/h with VAT (direct PPA with the utility company, no third parties involved)</p>
          <p>Hosting of your equipment in our mobile data centers</p>
          <p>Rental of the parking space for your mobile data centers</p>
          <p>Processing capacity for sale</p>
          <p>24/7 monitoring and technical support</p>
          <p>Execution of an Agreement with full validity</p>
          <p>CCTV, protected area</p>
          <p>Freehold land in close proximity to electricity substation</p>
        </div>
      </div>
    </div>
    <div class="mining-block first-mining">
      <div class="container">
        <div class="mining-block__image">
          <img src="../static/min-1.svg">
        </div>
        <div class="mining-block__head">
          MOBILE DATA CENTER
        </div>
        <div class="mining-block__text">
          Choose our ready-made solution or design your own Mobile Data Center with our 3D-Configurator
        </div>
      </div>
    </div>
    <div class="data-centre">
      <div class="container">
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
      <a
        class="data-centre__btn"
        @click="showModalWindow = true"
      >
        Create your own MDC <span class="mobile-none">with our 3D-Configurator</span>
      </a>
    </div>
    <div class="mining-block second-mining">
      <div class="container">
        <div class="mining-block__image">
          <img src="../static/min-2.svg">
        </div>
        <div class="mining-block__head">
          Hosting
        </div>
        <div class="mining-block__text">
          House your equipment at our worksite for the average annual price of <span class="mining-banner__textbold">$0,038</span> per kW/h
        </div>
        <div class="mining-block__btn">
          <a
            class="more-btn"
            @click="showHostingWindow = true"
          >
            place an order
          </a>
        </div>
      </div>
    </div>
    <div class="mining-block third-mining">
      <div class="container">
        <div class="mining-block__image">
          <img src="../static/min-3.svg">
        </div>
        <div class="mining-block__head">
          Processing Capacity
        </div>
        <div class="mining-block__text">
          Purchase processing capacity on beneficial terms
        </div>
        <div class="third-mining__btns">
          <a
            href="contacts"
            class="more-btn"
          >
            contact us
          </a>
          <a
            class="more-btn more-btn__black"
            href="https://hashratecost.com/"
            target="_blank"
          >
            calculation
          </a>
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
              <input id="radio-5" v-model="checkTrue" type="checkbox" name="checkbox">
              <label for="radio-5" />
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
      <form
        v-if="showHostingWindow"
        class="modal-get-consult"
      >
        <div
          v-on-clickaway="closeModal"
          class="modal-get-consult__hosting-form"
        >
          <div class="forscroll">
            <img
              class="modal-get-consult__close"
              src="../static/close.svg"
              @click="showHostingWindow = false"
            >
            <div class="modal-get-consult__head">
              Cost calculation
            </div>
            <div class="modal-get-consult__hosting">
              Hosting
            </div>
            <div class="modal-get-consult__tech tech">
              <div class="tech__item">
                <div class="tech__text">
                  Type of Equipment:
                </div>
                <div class="tech__input">
                  <input v-model="hostingFormData.type_equipment" type="text" placeholder="Whatsminer M31S+">
                </div>
              </div>
              <div class="tech__item">
                <div class="tech__text">
                  Power Consumption:
                </div>
                <div class="tech__input">
                  <input v-model="hostingFormData.power_consumption" type="text" placeholder="3,44">
                </div>
                <div class="tech__unit">
                  kWh
                </div>
              </div>
              <div class="tech__item">
                <div class="tech__text">
                  Hashrate:
                </div>
                <div class="tech__input">
                  <input v-model="hostingFormData.hashrate" type="text" placeholder="82">
                </div>
                <div class="tech__unit">
                  TH
                </div>
              </div>
              <div class="tech__item">
                <div class="tech__text">
                  Quantity:
                </div>
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
            <div>
              <div class="modal-flexbox">
                <div class="modal-input">
                  <input v-model="hostingFormData.name" type="text" placeholder="First Name">
                </div>
                <div class="modal-input">
                  <input v-model="hostingFormData.lastName" type="text" placeholder="Last Name">
                </div>
                <p>Please provide your legal name</p>
              </div>
              <div class="modal-input">
                <input v-model="hostingFormData.email" type="email" placeholder="Email">
              </div>
              <vue-tel-input
                v-model="hostingFormData.phone"
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
                      @click="changeCountry(item.common)"
                    >
                      {{ item.common }}
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="modal-contactus">
              <div class="modal-contactus__head">
                Or contact us at:
              </div>
              <div class="modal-contactus__flexbox">
                <a href="tel:89242907575">Tel. +79242907575</a>
                <a href="https://telegram.me/@BMCru">Telegram @BMCru</a>
              </div>
            </div>
            <div
              v-if="errorForm"
              class="modal__error"
            >
              Please fill in all fields
            </div>
            <a
              class="modal-hosting-btn yellow-btn"
              :class="{ 'modal-send-btn__mistake': errorForm }"
              @click="sendHostingForm(hostingFormData.type_equipment,hostingFormData.power_consumption,hostingFormData.hashrate,hostingFormData.name,hostingFormData.lastName,hostingFormData.email,hostingFormData.phone)"
            >
              SENT
            </a>
            <div
              v-if="!userLoggedIn"
              class="modal-createAccount"
            >
              Already Have an Account? <span @click="signInActiveFromModalWindow">Login</span>
            </div>
            <div class="modal-checkbox">
              <div class="add-payment__radiobutton hosting__radiobutton">
                <input id="radio-3" v-model="checkTrue" type="checkbox" name="checkbox">
                <label for="radio-3" />
              </div>
              <div>I have read and agree with <a href="#">Terms & Conditions</a> and our <a href="policy" target="_blank">Privacy Policy</a>.</div>
            </div>
            <div class="modal-checkbox">
              <div class="add-payment__radiobutton hosting__radiobutton">
                <input id="radio-4" type="checkbox" name="checkbox">
                <label for="radio-4" />
              </div>
              <div>Yes, please keep me updated on BMC news, offers and events</div>
            </div>
          </div>
        </div>
      </form>
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
              @click="closeModal"
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
                      @click="changeCountry(item.common)"
                    >
                      {{ item.common }}
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
            @click="closeModal"
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
      activeItem: [],
      countries: [],
      activeItemInForm: '',
      activePhotoInForm: '',
      totalProducts: [],
      topicProductMenu: false,
      showModalWindow: false,
      showSuccessWindow: false,
      showHostingWindow: false,
      errorForm: false,
      firstOrderForm: true,
      secondOrderForm: false,
      quantity: 1,
      showOrderForm: false,
      activeTotalSum: 0,
      checkTrue: true,
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
      hostingFormData: {
        type_equipment: '',
        power_consumption: '',
        hashrate: '',
        quantity: '',
        client: '',
        lastName: '',
        phone: '',
        country: '',
        email: ''
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
      }
    }
  },
  created () {
    axios.get('https://core.bmc.ai/products/get', {
    })
      .then((data) => {
        console.log(data)
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].type === 1) {
            this.products.push(data.data[i])
          }
        }
        this.totalProducts = this.products
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
    closeModal () {
      this.showModalWindow = false
      this.showSuccessWindow = false
      this.showHostingWindow = false
      this.showOrderForm = false
      this.topicMenu = false
      this.topicCountry = false
      this.topicProductMenu = false
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
    },
    changeActiveProduct (p) {
      this.activeItemInForm = this.totalProducts[parseInt(p) - 1].name
      this.activePhotoInForm = this.totalProducts[parseInt(p) - 1].image
      this.topicProductMenu = true
    },
    changeTopic (p) {
      this.topicValue = p
      this.topicMenu = true
      this.formData.topic = p
    },
    countryChange (country) {
      // this.formData.country = country.dialCode
    },
    changeCountry (p) {
      this.topicCountryValue = p.name
      this.formDataSign.country = p.id
      this.topicCountry = true
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
    showSecondWindow () {
      this.firstOrderForm = false
      this.secondOrderForm = true
    },
    sendHostingForm (a, b, c, d, e, f, g) {
      this.hostingFormData.quantity = this.quantity
      this.hostingFormData.country = this.topicCountryValue
      if ((a === '') || (b === '') || (c === '') || (d === '') || (e === '') || (f === '') || (g === '') || (!this.checkTrue)) {
        this.errorForm = true
        setTimeout(() => {
          this.errorForm = false
        }, 1200)
      } else {
        axios.post('https://core.bmc.ai/send/hosting', this.hostingFormData)
          .then((response) => {
            this.showHostingWindow = false
            this.showSuccessWindow = true
          })
      }
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
    signInActiveFromModalWindow () {
      this.showHostingWindow = false
      this.showOrderForm = false
      this.signIn = true
    },
    uploadItem (itemIndex) {
      this.showOrderForm = true
      this.activeItem = this.products[itemIndex]
      this.activeTotalSum = this.activeItem.price
      this.quantity = 1
      this.activeItemInForm = this.products[itemIndex].name
      this.activePhotoInForm = this.products[itemIndex].image
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
  .mining-banner {
    background-image: linear-gradient(90deg,#202020 -30%,hsla(0,0%,47.1%,.1)),url("../static/mining-solutions.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 230px;
    .container {
      display: flex;
      padding-top: 112px;
    }
    &__main {
      flex: 50%;
      padding-right: 110px;
      padding-top: 70px;
    }
    &__list {
      background: #F7F7F7;
      box-shadow: 2px 5px 10px #0000001A;
      border-radius: 8px;
      padding: 37px 20px 22px 84px;
      max-width: 546px;
      flex: 50%;
      margin-bottom: -95px;
      p {
        font-family: robotolight, sans-serif;
        font-size: 22px;
        line-height: 34px;
        color: #3E3E3E;
        position: relative;
        padding-bottom: 33px;
        &:last-child {
          padding-bottom: 0;
        }
        &:before {
          position: absolute;
          content: '';
          width: 15px;
          height: 15px;
          background-color: #E6B510;
          left: -47px;
          top: 10px;
          transform: rotate(45deg);
        }
      }
    }
    &__head {
      font-family: montserratblack, sans-serif;
      font-size: 66px;
      color: #FFFFFF;
      text-transform: uppercase;
      margin-bottom: 50px;
    }
    &__text {
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      line-height: 45px;
      font-size: 28px;
      color: #FFFFFF;
    }
    &__textbold {
      font-family: montserratbold, sans-serif;
      padding-top: 40px;
      display: block;
    }
  }
  .data-centre {
    background-color: #F7F7F7;
    padding-bottom: 130px;
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__btn {
      border: 1px solid rgba(230, 181, 16, 0.6);
      border-radius: 30px;
      padding: 18px 25px;
      font-family: montserratlight,sans-serif;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: 0.3px;
      white-space: nowrap;
      text-transform: uppercase;
      display: table;
      text-decoration: none;
      margin-top: 70px;
      margin-left: auto;
      margin-right: auto;
      flex: 100%;
      max-width: 500px;
      transition: 0.3s;
      cursor: pointer;
      color: #3E3E3E;
      &:hover {
        color: white;
        background-color: #E6B510;
      }
      @media (max-width: 750px) {
        font-size: 10px;
        padding: 12px 15px;
      }
    }
    &__item {
      width: 300px;
      background: #F2F3F3;
      box-shadow: -9px -6px 10px #fff, 0 0 17px -6px rgba(62,62,62,.3);
      border-radius: 15px;
      padding: 26px 0 30px;
      margin-right: 26px;
      &:last-child {
        margin-right: 0;
      }
      .more-btn {
        margin: auto;
      }
      @media (max-width: 1500px) {
        width: 280px;
      }
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
  }
  .mining-block {
    .container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    span {
      display: inline;
    }
    &__head {
      font-family: montserratbold, sans-serif;
      font-size: 36px;
      color: #787878;
      text-transform: uppercase;
      flex: 100%;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 25px;
    }
    &__text {
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 28px;
      color: #3E3E3E;
      text-align: center;
      padding-right: 15px;
      padding-left: 15px;
    }
    &__btn {
      width: 100%;
      margin-top: 40px;
      a {
        margin: auto;
      }
    }
  }
  .first-mining {
    padding-top: 130px;
    padding-bottom: 35px;
    background-color: #F7F7F7;
  }
  .second-mining {
    background: #EFF0F0;
    padding: 80px 0;
  }
  .third-mining {
    padding: 130px 0;
    background-color: #F7F7F7;
    &__btns {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 60px;
    }
  }
  .more-btn {
    transition: 0.3s;
    font-family: montserratlight, sans-serif;
    border: 1px solid rgba(23, 23, 23, 0.6);
    font-weight: 700;
    width: 183px;
    &:hover {
      background-color: #3E3E3E;
      color: white;
    }
    &__black {
      background-color: #3E3E3E;
      color: white;
      transition: 0.3s;
      margin-left: 77px;
      &:hover {
        background-color: transparent;
        color: #3E3E3E;
      }
      @media (max-width: 750px) {
        margin-left: 15px;
      }
    }
    @media (max-width: 400px) {
      width: 120px;
    }
  }
  .modal-input {
    &__nested {
      background-image: url("../static/arrow.svg");
    }
  }
  .tech {
    margin-bottom: 30px;
    &__item {
      display: flex;
      &:last-child {
        margin-top: 5px;
      }
    }
    &__text {
      font-family: montserratlight,sans-serif;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.24px;
      color: #303030;
      min-width: 131px;
      margin-right: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    &__unit {
      min-width: 37px;
      margin-left: 6px;
      font-family: montserratlight, sans-serif;
      font-size: 16px;
      letter-spacing: 0.16px;
      color: #3E3E3E;
      display: flex;
      align-items: center;
    }
    &__input {
      font-family: montserratlight, sans-serif;
      font-size: 16px;
      letter-spacing: 0.16px;
      color: #3E3E3E;
      width: 100%;
      border: 0.3px solid rgba(120, 120, 120, 0.2);
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        height: 100%;
        border: transparent;
        outline: none;
        background-color: transparent;
        font-family: montserratlight, sans-serif;
        font-size: 16px;
        letter-spacing: 0.16px;
        color: #3E3E3E;
      }
    }
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
  .modal-contactus {
    margin-top: 8px;
    &__head {
      font-family: montserratbold, sans-serif;
      font-size: 14px;
      letter-spacing: 0.28px;
      color: #171717;
      text-align: center;
    }
    &__flexbox {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      margin-bottom: 20px;
      a {
        font-family: montserratlight, sans-serif;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.28px;
        color: #171717;
        text-decoration: none;
      }
    }
  }
  .modal-hosting-btn {
    width: 177px;
    height: 40px;
    margin: 25px auto;
    font-family: montserratbold, sans-serif;
    font-size: 14px;
    letter-spacing: 0.28px;
    color: #FFFFFF;
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
  .modal-createAccount {
    text-align: center;
    span {
      color: #1877F2;
      cursor: pointer;
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
  @import "~@/assets/scss/media";
  ::-webkit-scrollbar { width: 7px; height: 3px; border-radius: 10px}
  ::-webkit-scrollbar-track { margin-right: 30px; background-color: rgba(153, 153, 153, 0.35); border-radius: 10px;}
  ::-webkit-scrollbar-track-piece { background-color: rgba(120, 120, 120, 0.1); width: 10px; border-radius: 10px;}
  ::-webkit-scrollbar-thumb { height: 50px; background-color: rgba(153, 153, 153, 0.75); border-radius: 10px;}
</style>
