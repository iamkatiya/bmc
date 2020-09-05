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
    <div class="investment">
      <div class="container">
        <div class="investment__head">
          For investors
        </div>
        <div class="investment__description">
          The distributed ledger technology introduces the possibility to decentralize data storage <br>solutions ensuring optimum transparency and security. Blockchain offers the potential to<br> streamline processes across any number of businesses.
        </div>
      </div>
    </div>
    <div class="investment-services">
      <div class="container">
        <div class="investment-services__item">
          <div class="investment-services__row">
            <div class="investment-services__photo">
              <img src="../static/inv-1.svg">
            </div>
            <div class="investment-services__text">
              <h3>Deep experience in an infant industry</h3>
              <p>We offer an opportunity to become a part of the blockchain community and ready to share our experience within the blockchain ecosystem. </p>
              <p>We attract investments through the profit-sharing models as the new standard of funding.</p>
            </div>
          </div>
          <div class="investment-services__row">
            <div class="investment-services__photo">
              <img src="../static/inv-2.svg">
            </div>
            <div class="investment-services__text">
              <h3>Short payback</h3>
              <p>The attractiveness of this project will be secured by its expected short payback period (ROI) and the high profitability of this business.</p>
            </div>
          </div>
        </div>
        <div class="investment-services__item investment-services__image">
          <img src="../static/computer.png">
        </div>
      </div>
    </div>
    <div class="software-feedback">
      <div class="container">
        <h2 class="feedback__title">
          Ready to start investing?
        </h2>
        <div class="feedback__description">
          For more information, please contact us at:
        </div>
        <a
          href="mailto:info@bmc.ai"
          class="software-feedback__btn yellow-btn"
        >
          bmc@bmc.ai
        </a>
      </div>
    </div>
    <div class="calculator">
      <div class="container">
        <h3 class="calculator__head">
          Investment Historical Lookup
        </h3>
        <div class="calculator__description">
          Investment calculator is a tool that lets you check the earnings that you might have earned since 2018. <br>Please fill in the required fields to calculate the return on investments.
        </div>
        <p>Investment Calculator</p>
        <div class="calc">
          <div class="calc__settings params">
            <div class="params__item">
              <p>Starting Amount</p>
              <div class="calc__amount-mask">
                <div
                  v-if="chosenCurrency === '' || chosenCurrency === 'Choose $'"
                  class="amount-value"
                >
                  $
                </div>
                <div
                  v-else
                  class="amount-value"
                >
                  ₽
                </div>
                <input
                  v-model="investmentSum"
                  class="calc-select"
                >
              </div>
              <div class="select-wrapper">
                <select
                  v-model="chosenCurrency"
                  class="calc-select starting-amount"
                >
                  <option>
                    Choose руб.
                  </option>
                  <option>
                    Choose $
                  </option>
                </select>
                <img src="../static/test.png">
              </div>
            </div>
            <div class="params__item">
              <p>Start Date</p>
              <div class="select-wrapper">
                <select
                  v-model="checkedDate"
                  class="calc-select start-date"
                  @change="changeDate"
                >
                  <option
                    v-for="(item, itemIndex) in dates"
                    :key="itemIndex"
                    :value="itemIndex"
                  >
                    {{ item.date }}
                  </option>
                </select>
                <img src="../static/test.png">
              </div>
            </div>
            <div class="params__item">
              <p>Investment period</p>
              <div class="select-wrapper">
                <select
                  v-model="checkedPeriod"
                  class="calc-select inv-period"
                >
                  <option
                    v-for="(item, itemIndex) in periods"
                    :key="itemIndex"
                    :value="item.period"
                  >
                    {{ item.text }}
                  </option>
                </select>
                <img src="../static/test.png">
              </div>
            </div>
            <div class="params__item">
              <p>Hash Rate</p>
              <div class="select-wrapper">
                <div class="calc-select hash-rate">
                  TH 14
                </div>
              </div>
            </div>
          </div>
          <div class="calc__settings btn">
            <button @click="investmentCalc">
              Calculate
            </button>
            <div class="btn__radios">
              <input
                id="coursedollar"
                v-model="radioChecked"
                type="radio"
                class="course-radio"
                name="course-radio"
                value="dollars"
                @click="dollarsCalculate"
              >
              <label for="coursedollar" />
              <span>$</span>
              <input
                id="courserub"
                v-model="radioChecked"
                type="radio"
                class="course-radio"
                name="course-radio"
                value="rubles"
                @click="rublesCalculate"
              >
              <label for="courserub" />
              <span>₽</span>
              <input
                id="percents"
                v-model="radioChecked"
                type="radio"
                class="course-radio"
                name="course-radio"
                value="percents"
                @click="percentsCalculate"
              >
              <label for="percents" />
              <span>%</span>
              <div>Total profit for the selected period: [USD/RUB/%]</div>
            </div>
          </div>
          <div>
            <line-chart id="chart" ref="chart" :options="chartoptions" :chart-data="datacollection" />
          </div>
          <div class="calc__account">
            THIS investment Will be worth:
            <span>{{ newChosenCurrency }}{{ investmentTotalString }}</span>
            <div class="calc__sign">
              Period, month
            </div>
          </div>
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
    <main-footer />
  </div>
</template>

<script>
import axios from 'axios'
import { mixins } from 'vue-chartjs'
import { directive as onClickaway } from 'vue-clickaway'
import LineChart from '../plugins/chart.js'
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
    aboutHead,
    LineChart
  },
  mixins: [
    windowScrollPosition('position'),
    mixins.reactiveProp
  ],
  data () {
    return {
      changePassValue: '',
      successfulResetPass: false,
      unsuccessfulResetPass: false,
      loggedUser: '',
      amountValue: '$',
      investmentTotalString: '₽357 962',
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
      dates: [
        {
          date: '01.04.2018',
          dateText: 'Apl’18',
          price: 110000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00006951,
          btcRate: 7027,
          dollarRate: 57.26,
          monthEarnings: 41940,
          daysOfMonth: 30
        },
        {
          date: '01.05.2018',
          dateText: 'May’18',
          price: 95000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00006085,
          btcRate: 8696,
          dollarRate: 61.99,
          monthEarnings: 61222,
          daysOfMonth: 31
        },
        {
          date: '01.06.2018',
          dateText: 'Jun’18',
          price: 65000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00005621,
          btcRate: 6781,
          dollarRate: 62.01,
          monthEarnings: 56977,
          daysOfMonth: 30
        },
        {
          date: '01.07.2018',
          dateText: 'Jul’18',
          price: 45000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00004791,
          btcRate: 6706,
          dollarRate: 62.75,
          monthEarnings: 68286,
          daysOfMonth: 31
        },
        {
          date: '01.08.2018',
          dateText: 'Aug’18',
          price: 38000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00004181,
          btcRate: 7131,
          dollarRate: 62.3,
          monthEarnings: 69491,
          daysOfMonth: 31
        },
        {
          date: '01.09.2018',
          dateText: 'Sept’18',
          price: 37000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003642,
          btcRate: 6526,
          dollarRate: 68.04,
          monthEarnings: 59655,
          daysOfMonth: 30
        },
        {
          date: '01.10.2018',
          dateText: 'Oct’18',
          price: 35000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003403,
          btcRate: 6305,
          dollarRate: 65.59,
          monthEarnings: 48438,
          daysOfMonth: 31
        },
        {
          date: '01.11.2018',
          dateText: 'Nov’18',
          price: 30000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003385,
          btcRate: 6085,
          dollarRate: 65.7,
          monthEarnings: 54487,
          daysOfMonth: 30
        },
        {
          date: '01.12.2018',
          dateText: 'Dec’18',
          price: 22000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003695,
          btcRate: 4049,
          dollarRate: 66.53,
          monthEarnings: 37739,
          daysOfMonth: 31
        },
        {
          date: '01.01.2019',
          dateText: 'Jan’19',
          price: 21500,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00004152,
          btcRate: 3515,
          dollarRate: 69.47,
          monthEarnings: 41771,
          daysOfMonth: 31
        },
        {
          date: '01.02.2019',
          dateText: 'Feb’19',
          price: 20000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00004181,
          btcRate: 3650,
          dollarRate: 65.35,
          monthEarnings: 38934,
          daysOfMonth: 28
        },
        {
          date: '01.03.2019',
          dateText: 'Mar’19',
          price: 20000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00004036,
          btcRate: 3897,
          dollarRate: 65.88,
          monthEarnings: 47326,
          daysOfMonth: 31
        },
        {
          date: '01.04.2019',
          dateText: 'Apl’19',
          price: 19000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00004095,
          btcRate: 4134,
          dollarRate: 64.73,
          monthEarnings: 54799,
          daysOfMonth: 30
        },
        {
          date: '01.05.2019',
          dateText: 'May’19',
          price: 32000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003351,
          btcRate: 5378,
          dollarRate: 64.9,
          monthEarnings: 38626,
          daysOfMonth: 31
        },
        {
          date: '01.06.2019',
          dateText: 'Jun’19',
          price: 28000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003357,
          btcRate: 8858,
          dollarRate: 65.5,
          monthEarnings: 96132,
          daysOfMonth: 30
        },
        {
          date: '01.07.2019',
          dateText: 'Jul’19',
          price: 37000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00003287,
          btcRate: 10577,
          dollarRate: 63.0,
          monthEarnings: 93269,
          daysOfMonth: 31
        },
        {
          date: '01.08.2019',
          dateText: 'Aug’19',
          price: 40000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00002762,
          btcRate: 10007,
          dollarRate: 64.35,
          monthEarnings: 63939,
          daysOfMonth: 31
        },
        {
          date: '01.09.2019',
          dateText: 'Sept’19',
          price: 33000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00002298,
          btcRate: 9760,
          dollarRate: 66.77,
          monthEarnings: 57117,
          daysOfMonth: 30
        },
        {
          date: '01.10.2019',
          dateText: 'Oct’19',
          price: 20000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001962,
          btcRate: 8325,
          dollarRate: 65.25,
          monthEarnings: 48906,
          daysOfMonth: 31
        },
        {
          date: '01.11.2019',
          dateText: 'Nov’19',
          price: 15000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001869,
          btcRate: 9253,
          dollarRate: 63.5,
          monthEarnings: 69742,
          daysOfMonth: 30
        },
        {
          date: '01.12.2019',
          dateText: 'Dec’19',
          price: 13000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001901,
          btcRate: 7385,
          dollarRate: 64.29,
          monthEarnings: 50504,
          daysOfMonth: 31
        },
        {
          date: '01.01.2020',
          dateText: 'Jan’20',
          price: 12000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001798,
          btcRate: 8170,
          dollarRate: 61.23,
          monthEarnings: 54150,
          daysOfMonth: 31
        },
        {
          date: '01.02.2020',
          dateText: 'Feb’20',
          price: 11000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001607,
          btcRate: 9382,
          dollarRate: 63.94,
          monthEarnings: 69494,
          daysOfMonth: 29
        },
        {
          date: '01.03.2020',
          dateText: 'Mar’20',
          price: 9000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001611,
          btcRate: 8522,
          dollarRate: 66.0,
          monthEarnings: 66664,
          daysOfMonth: 31
        },
        {
          date: '01.04.2020',
          dateText: 'Apl’20',
          price: 7000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001796,
          btcRate: 6664,
          dollarRate: 78.7,
          monthEarnings: 102577,
          daysOfMonth: 30
        },
        {
          date: '01.05.2020',
          dateText: 'May’20',
          price: 6000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00001608,
          btcRate: 8985,
          dollarRate: 75.0,
          monthEarnings: 174899,
          daysOfMonth: 31
        },
        {
          date: '01.06.2020',
          dateText: 'Jun’20',
          price: 5000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00000871,
          btcRate: 10100,
          dollarRate: 70.0,
          monthEarnings: 6635,
          daysOfMonth: 30
        },
        {
          date: '01.07.2020',
          dateText: 'Jul’20',
          price: 4000,
          th: 14,
          quantityTH: null,
          payoutTH: 0.00000828,
          btcRate: 9260,
          dollarRate: 71.0,
          monthEarnings: -30176,
          daysOfMonth: 31
        }
      ],
      newChosenCurrency: '',
      checkedDate: '0',
      radioChecked: 'rubles',
      chosenCurrency: 'Choose $',
      checkedPeriod: 6,
      investmentSum: 500000,
      investmentTotal: 0,
      showModalWindow: false,
      showSuccessWindow: false,
      errorForm: false,
      checkTrue: true,
      datacollection: null,
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontColor: 'red',
            fontFamily: 'Roboto'
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }],
          yAxes: [{
            ticks: {
              /* eslint-disable */
              callback: function (value) {
                return '₽' + value
              }
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        },
        onHover: function (e, array) {
          var data = this.config.data.datasets[0]._meta[1].data;
          data.forEach((item)=>{
            item._model.pointStyle = 'circle';
          });
          if(array.length>0) {
            var sun = new Image();
            sun.src = 'point.svg';
            var position = array[0]._index;
            this.config.data.datasets[0]._meta[1].data[position]._model.pointStyle = sun;
            // console.log(this.config.data.datasets[0]._meta[1]);
          }
        },
        afterUpdate: function (e, array) {
            var sun = new Image();
            sun.src = 'point.svg';
            this.config.data.datasets[0]._meta[1].data[3]._model.pointStyle = sun;
            console.log(this.config.data.datasets[0]);
        }
      },
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true
      },
      topicMenu: false,
      topicValue: 'Blockchain',
      periods: [
        {
          text: '0,5 YR',
          period: 6
        },
        {
          text: '1 YR',
          period: 12
        },
        {
          text: '1,5 YR',
          period: 18
        },
        {
          text: '2 YR',
          period: 24
        },
        {
          text: '2,5 YR',
          period: 30
        }
      ],
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
    var ctx = document.getElementById(this.$refs.chart.chartId).getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 530);
    gradient.addColorStop(0, '#F5B300');
    gradient.addColorStop(1, '#FFFFFF1A');
    var sun = new Image();
    sun.src = 'point.svg';
    let arr = []
    let start = this.checkedDate
    arr = this.dates.slice(start, this.checkedDate + this.checkedPeriod)
    this.datacollection = {
      labels: Object.values(arr).map((item, date) => {
        return item.dateText
      }),
      datasets: [
        {
          label: '',
          fillColor : gradient,
          borderColor: 'rgba(255,99,132,0)',
          backgroundColor: gradient,
          pointStyle: ['circle','circle','circle', sun],
          pointBackgroundColor: '#fff',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderWidth: 5,
          pointRadius: 0,
          pointHitRadius: 19,
          borderWidth: 0,
          data: Object.values(arr).map((item) => {
            return item.monthEarnings
          })
        }
      ],
    }
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
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
      this.topicCountry = false
    },
    changeTopic (p) {
      this.topicValue = p
      this.topicMenu = true
      this.formData.topic = p
    },
    countryChange (country) {
      // this.formData.country = country.dialCode
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
    investmentCalc () {
      /* eslint-disable */
      let arr = []
      let totalArr = []
      let incomeDay = []
      let incomeMonth = []
      let total = 0
      let start = this.checkedDate
      arr = this.dates.slice(start, this.checkedDate + this.checkedPeriod)
        for (let i = 0; i < arr.length; i++) {
          arr[i].quantityTH = this.investmentSum / arr[i].price * arr[i].th
          if (this.chosenCurrency === 'Choose $') {
            if (this.radioChecked === 'rubles') {
              this.newChosenCurrency = '₽'
              incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
              incomeMonth[i] = Math.round((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)
              total = total + incomeMonth[i]
            } else if (this.radioChecked === 'dollars'){
              this.newChosenCurrency = '$'
              incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate
              incomeMonth[i] = Math.round((incomeDay[i] - (6/this.dates[i].dollarRate) * arr[i].quantityTH) * arr[i].daysOfMonth)
              total = total + incomeMonth[i]
            } else {
              this.newChosenCurrency = '%'
              incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
              incomeMonth[i] = Math.round(((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)*100/this.investmentSum)
              total = total + incomeMonth[i]
            }
          } else {
            if (this.radioChecked === 'dollars') {
              this.newChosenCurrency = '$'
              incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate
              incomeMonth[i] = Math.round((incomeDay[i] - (6/this.dates[i].dollarRate) * arr[i].quantityTH) * arr[i].daysOfMonth)
              total = total + incomeMonth[i]
            } else if (this.radioChecked === 'rubles') {
              this.newChosenCurrency = '₽'
              incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
              incomeMonth[i] = Math.round((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)
              total = total + incomeMonth[i]
            } else {
              this.newChosenCurrency = '%'
              incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
              incomeMonth[i] = Math.round(((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)*100/this.investmentSum)
              total = total + incomeMonth[i]
            }
          }
        }
      this.investmentTotal = total
      var str = (this.investmentTotal).toString()
      this.investmentTotalString = str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
      for (let i = 0; i < arr.length; i++) {
        arr[i].quantityTH = this.investmentSum/arr[i].price*arr[i].th
        if (this.radioChecked === 'rubles') {
          totalArr[i] = Math.round(((arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate) - 6 * arr[i].quantityTH)*arr[i].daysOfMonth)
        } else if (this.radioChecked === 'dollars'){
          totalArr[i] = Math.round(((arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate) - (6/arr[i].dollarRate) * arr[i].quantityTH)*arr[i].daysOfMonth)
        } else {
            totalArr[i] = Math.round((((arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate) - 6 * arr[i].quantityTH)*arr[i].daysOfMonth)*100/this.investmentSum)
          }
      }
      if (this.radioChecked === 'rubles') {
        this.chartoptions = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              fontColor: 'red',
              fontFamily: 'Roboto'
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }],
            yAxes: [{
              ticks: {
                /* eslint-disable */
                callback: function (value) {
                  return '₽' + value
                }
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }]
          },
          onHover: function (e, array) {
            let metaIndex = Object.keys(this.config.data.datasets[0]._meta).shift()
            var data = this.config.data.datasets[0]._meta[metaIndex].data;
            data.forEach((item)=>{
              item._model.pointStyle = 'circle';
            });
            if(array.length>0) {
              var sun = new Image();
              sun.src = 'point.svg';
              var position = array[0]._index;
              this.config.data.datasets[0]._meta[metaIndex].data[position]._model.pointStyle = sun;
            }
          },
          afterUpdate: function (e, array) {
            var sun = new Image();
            sun.src = 'point.svg';
            this.config.data.datasets[0]._meta[metaIndex].data[3]._model.pointStyle = sun;
          }
        }
      } else if (this.radioChecked === 'dollars') {
        this.chartoptions = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              fontColor: 'red',
              fontFamily: 'Roboto'
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }],
            yAxes: [{
              ticks: {
                /* eslint-disable */
                callback: function (value) {
                  return '$' + value
                }
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }]
          },
          onHover: function (e, array) {
            let metaIndex = Object.keys(this.config.data.datasets[0]._meta).shift()
            var data = this.config.data.datasets[0]._meta[metaIndex].data;
            data.forEach((item)=>{
              item._model.pointStyle = 'circle';
            });
            if(array.length>0) {
              var sun = new Image();
              sun.src = 'point.svg';
              var position = array[0]._index;
              this.config.data.datasets[0]._meta[metaIndex].data[position]._model.pointStyle = sun;
            }
          },
          afterUpdate: function (e, array) {
            var sun = new Image();
            sun.src = 'point.svg';
            this.config.data.datasets[0]._meta[metaIndex].data[3]._model.pointStyle = sun;
          }
        }
      } else {
        this.chartoptions = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              fontColor: 'red',
              fontFamily: 'Roboto'
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }],
            yAxes: [{
              ticks: {
                /* eslint-disable */
                callback: function (value) {
                  return '%' + value
                }
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              }
            }]
          },
          onHover: function (e, array) {
            let metaIndex = Object.keys(this.config.data.datasets[0]._meta).shift()
            var data = this.config.data.datasets[0]._meta[metaIndex].data;
            data.forEach((item)=>{
              item._model.pointStyle = 'circle';
            });
            if(array.length>0) {
              var sun = new Image();
              sun.src = 'point.svg';
              var position = array[0]._index;
              this.config.data.datasets[0]._meta[metaIndex].data[position]._model.pointStyle = sun;
            }
          },
          afterUpdate: function (e, array) {
            var sun = new Image();
            sun.src = 'point.svg';
            this.config.data.datasets[0]._meta[metaIndex].data[3]._model.pointStyle = sun;
          }
        }
      }
      var ctx = document.getElementById(this.$refs.chart.chartId).getContext("2d")
      var gradient = ctx.createLinearGradient(0, 0, 0, 530);
      gradient.addColorStop(0, '#F5B300');
      gradient.addColorStop(1, '#FFFFFF1A');
      var sun = new Image();
      sun.src = 'point.svg';
      this.datacollection = {
        labels: Object.values(arr).map((item, date) => {
          return item.dateText
        }),
        datasets: [
          {
            label: '',
            fillColor : gradient,
            borderColor: 'rgba(255,99,132,0)',
            backgroundColor: gradient,
            pointStyle: ['circle','circle','circle', sun],
            pointBackgroundColor: '#fff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderWidth: 5,
            pointRadius: 0,
            pointHitRadius: 19,
            borderWidth: 0,
            data: Object.values(totalArr).map((item) => {
              return item
            })
          }
        ]
      }
      // this.renderChart(this.datacollection, this.chartoptions)
    },
    dollarsCalculate () {
      /* eslint-disable */
      let arr = []
      let totalArr = []
      let incomeDay = []
      let incomeMonth = []
      let total = 0
      let start = this.checkedDate
      arr = this.dates.slice(start, this.checkedDate + this.checkedPeriod)
      for (let i = 0; i < arr.length; i++) {
        arr[i].quantityTH = this.investmentSum / arr[i].price * arr[i].th
        if (this.chosenCurrency === 'Choose $') {
          this.newChosenCurrency = '$'
          incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate
          incomeMonth[i] = Math.round((incomeDay[i] - (6/this.dates[i].dollarRate) * arr[i].quantityTH) * arr[i].daysOfMonth)
          total = total + incomeMonth[i]
        } else {
          this.newChosenCurrency = '$'
          incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate
          incomeMonth[i] = Math.round((incomeDay[i] - (6/this.dates[i].dollarRate) * arr[i].quantityTH) * arr[i].daysOfMonth)
          total = total + incomeMonth[i]
        }
      }
      this.investmentTotal = total
      var str = (this.investmentTotal).toString()
      this.investmentTotalString = str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
      for (let j = 0; j < arr.length; j++) {
        arr[j].quantityTH = this.investmentSum / arr[j].price * arr[j].th
        totalArr[j] = Math.round(((arr[j].payoutTH * arr[j].quantityTH * arr[j].btcRate) - (6/arr[j].dollarRate) * arr[j].quantityTH)*arr[j].daysOfMonth)
      }
      this.chartoptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontColor: 'red',
            fontFamily: 'Roboto'
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          yAxes: [{
            ticks: {
              /* eslint-disable */
              callback: function (value) {
                return '$' + value
              }
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        },
        onHover: function (e, array) {
          let metaIndex = Object.keys(this.config.data.datasets[0]._meta).shift()
          var data = this.config.data.datasets[0]._meta[metaIndex].data;
          data.forEach((item)=>{
            item._model.pointStyle = 'circle';
          });
          if(array.length>0) {
            var sun = new Image();
            sun.src = 'point.svg';
            var position = array[0]._index;
            this.config.data.datasets[0]._meta[metaIndex].data[position]._model.pointStyle = sun;
          }
        },
        afterUpdate: function (e, array) {
          var sun = new Image();
          sun.src = 'point.svg';
          this.config.data.datasets[0]._meta[metaIndex].data[3]._model.pointStyle = sun;
        }
      }
      var ctx = document.getElementById(this.$refs.chart.chartId).getContext("2d")
      var gradient = ctx.createLinearGradient(0, 0, 0, 530);
      gradient.addColorStop(0, '#F5B300');
      gradient.addColorStop(1, '#FFFFFF1A');
      var sun = new Image();
      sun.src = 'point.svg';
      this.datacollection = {
        labels: Object.values(arr).map((item, date) => {
          // console.log(Date.parse(item.date))
          return item.dateText
        }),
        datasets: [
          {
            label: '',
            borderColor: 'rgba(255,99,132,0)',
            backgroundColor: gradient,
            pointBackgroundColor: '#fff',
            pointStyle: ['circle','circle','circle', sun],
            pointRadius: 0,
            pointHoverRadius: 14,
            pointHitRadius: 19,
            pointHitBorderWidth: 11,
            // defaultFontFamily: 'Roboto',
            // defaultFontSize: 40,
            borderWidth: 0,
            data: Object.values(totalArr).map((item) => {
              return item
            })
          }
        ]
      }
    },
    rublesCalculate () {
      /* eslint-disable */
      let arr = []
      let totalArr = []
      let incomeDay = []
      let incomeMonth = []
      let total = 0
      let start = this.checkedDate
      arr = this.dates.slice(start, this.checkedDate + this.checkedPeriod)
      for (let i = 0; i < arr.length; i++) {
        arr[i].quantityTH = this.investmentSum / arr[i].price * arr[i].th
        if (this.chosenCurrency === 'Choose $') {
          this.newChosenCurrency = '₽'
          incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
          incomeMonth[i] = Math.round((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)
          total = total + incomeMonth[i]
        } else {
          this.newChosenCurrency = '₽'
          incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
          incomeMonth[i] = Math.round((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)
          total = total + incomeMonth[i]
        }
      }
      this.investmentTotal = total
      var str = (this.investmentTotal).toString()
      this.investmentTotalString = str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
      for (let j = 0; j < arr.length; j++) {
        arr[j].quantityTH = this.investmentSum / arr[j].price * arr[j].th
        totalArr[j] = Math.round(((arr[j].payoutTH * arr[j].quantityTH * arr[j].btcRate * arr[j].dollarRate) - 6 * arr[j].quantityTH)*arr[j].daysOfMonth)
      }
      this.chartoptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontColor: 'red',
            fontFamily: 'Roboto'
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          yAxes: [{
            ticks: {
              /* eslint-disable */
              callback: function (value) {
                return '₽' + value
              }
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        },
        onHover: function (e, array) {
          let metaIndex = Object.keys(this.config.data.datasets[0]._meta).shift()
          var data = this.config.data.datasets[0]._meta[metaIndex].data;
          data.forEach((item)=>{
            item._model.pointStyle = 'circle';
          });
          if(array.length>0) {
            var sun = new Image();
            sun.src = 'point.svg';
            var position = array[0]._index;
            this.config.data.datasets[0]._meta[metaIndex].data[position]._model.pointStyle = sun;
          }
        },
        afterUpdate: function (e, array) {
          var sun = new Image();
          sun.src = 'point.svg';
          this.config.data.datasets[0]._meta[metaIndex].data[3]._model.pointStyle = sun;
        }
      }
      var ctx = document.getElementById(this.$refs.chart.chartId).getContext("2d")
      var gradient = ctx.createLinearGradient(0, 0, 0, 530);
      gradient.addColorStop(0, '#F5B300');
      gradient.addColorStop(1, '#FFFFFF1A');
      var sun = new Image();
      sun.src = 'point.svg';
      this.datacollection = {
        labels: Object.values(arr).map((item, date) => {
          // console.log(Date.parse(item.date))
          return item.dateText
        }),
        datasets: [
          {
            label: '',
            borderColor: 'rgba(255,99,132,0)',
            backgroundColor: gradient,
            pointStyle: ['circle','circle','circle', sun],
            pointBackgroundColor: '#fff',
            pointRadius: 0,
            pointHoverRadius: 14,
            pointHitRadius: 19,
            pointHitBorderWidth: 11,
            // defaultFontFamily: 'Roboto',
            // defaultFontSize: 40,
            borderWidth: 0,
            data: Object.values(totalArr).map((item) => {
              return item
            })
          }
        ]
      }
    },
    percentsCalculate () {
      /* eslint-disable */
      let arr = []
      let totalArr = []
      let incomeDay = []
      let incomeMonth = []
      let total = 0
      let start = this.checkedDate
      arr = this.dates.slice(start, this.checkedDate + this.checkedPeriod)
      for (let i = 0; i < arr.length; i++) {
        arr[i].quantityTH = this.investmentSum / arr[i].price * arr[i].th
        if (this.chosenCurrency === 'Choose $') {
          this.newChosenCurrency = '%'
          incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate
          incomeMonth[i] = Math.round(((incomeDay[i] - (6/this.dates[i].dollarRate) * arr[i].quantityTH) * arr[i].daysOfMonth)*100/(this.investmentSum/arr[i].dollarRate))
          total = total + incomeMonth[i]
        } else {
          this.newChosenCurrency = '%'
          incomeDay[i] = arr[i].payoutTH * arr[i].quantityTH * arr[i].btcRate * arr[i].dollarRate
          incomeMonth[i] = Math.round(((incomeDay[i] - 6 * arr[i].quantityTH) * arr[i].daysOfMonth)*100/this.investmentSum)
          total = total + incomeMonth[i]
        }
      }
      this.investmentTotal = total
      var str = (this.investmentTotal).toString()
      this.investmentTotalString = str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
      for (let j = 0; j < arr.length; j++) {
        arr[j].quantityTH = this.investmentSum / arr[j].price * arr[j].th
        totalArr[j] = Math.round((((arr[j].payoutTH * arr[j].quantityTH * arr[j].btcRate * arr[j].dollarRate) - 6 * arr[j].quantityTH)*arr[j].daysOfMonth)*100/this.investmentSum)
      }
      this.chartoptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontColor: 'red',
            fontFamily: 'Roboto'
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          yAxes: [{
            ticks: {
              /* eslint-disable */
              callback: function (value) {
                return '%' + value
              }
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        },
        onHover: function (e, array) {
          let metaIndex = Object.keys(this.config.data.datasets[0]._meta).shift()
          var data = this.config.data.datasets[0]._meta[metaIndex].data;
          data.forEach((item)=>{
            item._model.pointStyle = 'circle';
          });
          if(array.length>0) {
            var sun = new Image();
            sun.src = 'point.svg';
            var position = array[0]._index;
            this.config.data.datasets[0]._meta[metaIndex].data[position]._model.pointStyle = sun;
          }
        },
        afterUpdate: function (e, array) {
          var sun = new Image();
          sun.src = 'point.svg';
          this.config.data.datasets[0]._meta[metaIndex].data[3]._model.pointStyle = sun;
        }
      }
      var ctx = document.getElementById(this.$refs.chart.chartId).getContext("2d")
      var gradient = ctx.createLinearGradient(0, 0, 0, 530);
      gradient.addColorStop(0, '#F5B300');
      gradient.addColorStop(1, '#FFFFFF1A');
      var sun = new Image();
      sun.src = 'point.svg';
      this.datacollection = {
        labels: Object.values(arr).map((item, date) => {
          // console.log(Date.parse(item.date))
          return item.dateText
        }),
        datasets: [
          {
            label: '',
            borderColor: 'rgba(255,99,132,0)',
            backgroundColor: gradient,
            pointBackgroundColor: '#fff',
            pointStyle: ['circle','circle','circle', sun],
            pointRadius: 0,
            pointHoverRadius: 14,
            pointHitRadius: 19,
            pointHitBorderWidth: 11,
            // defaultFontFamily: 'Roboto',
            // defaultFontSize: 40,
            borderWidth: 0,
            data: Object.values(totalArr).map((item) => {
              return item
            })
          }
        ]
      }
    },
    changeDate () {
      /* eslint-disable */
      let dt = new Date(this.dates[this.checkedDate].date)
      if (new Date('01.04.2018') <= dt && dt < new Date('01.07.2018')) {
        this.periods = [
          {
            text: '0,5 YR',
            period: 6
          },
          {
            text: '1 YR',
            period: 12
          },
          {
            text: '1,5 YR',
            period: 18
          },
          {
            text: '2 YR',
            period: 24
          },
          {
            text: '2,5 YR',
            period: 30
          }
        ]
      } else if (new Date('01.07.2018') <= dt && dt < new Date('01.01.2019')) {
        this.periods = [
          {
            text: '0,5 YR',
            period: 6
          },
          {
            text: '1 YR',
            period: 12
          },
          {
            text: '1,5 YR',
            period: 18
          },
          {
            text: '2 YR',
            period: 24
          }
        ]
      } else if (new Date('01.01.2019') <= dt && dt < new Date('01.07.2019')) {
        this.periods = [
          {
            text: '0,5 YR',
            period: 6
          },
          {
            text: '1 YR',
            period: 12
          },
          {
            text: '1,5 YR',
            period: 18
          }
        ]
      } else if (new Date('01.07.2019') <= dt && dt < new Date('01.01.2020')) {
        this.periods = [
          {
            text: '0,5 YR',
            period: 6
          },
          {
            text: '1 YR',
            period: 12
          }
        ]
      } else if (new Date('01.01.2020') <= dt && dt <= new Date('01.07.2020')) {
        this.periods = [
          {
            text: '0,5 YR',
            period: 6
          }
        ]
      } else {
        this.periods = [
          {
            text: '0,5 YR',
            period: 6
          },
          {
            text: '1 YR',
            period: 12
          },
          {
            text: '1,5 YR',
            period: 18
          },
          {
            text: '2 YR',
            period: 24
          },
          {
            text: '2,5 YR',
            period: 30
          }
        ]
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
    changeCountry (p) {
      this.topicCountryValue = p.name
      this.formDataSign.country = p.id
      this.topicCountry = true
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
  .starting-amount {
    @media (min-width: 1300px) {
      width: 170px;
    }
  }
  .start-date {
    @media (min-width: 1300px) {
      width: 180px;
    }
  }
  .inv-period {
    @media (min-width: 1300px) {
      width: 160px;
    }
  }
  .hash-rate {
    text-align: left;
    @media (min-width: 1300px) {
      width: 120px;
    }
  }
  .investment {
    background-color: #F7F7F7;
    padding: 115px 0 82px;
    .container {
      padding-top: 112px;
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
      line-height: 45px;
      color: #3E3E3E;
      text-align: center;
      padding-top: 25px;
      opacity: 0.9;
    }
  }
  .calculator {
    background-color: #f7f7f7;
    text-align: center;
    padding-top: 53px;
    padding-bottom: 20px;
    &__head {
      font-family: montserratbold, sans-serif;
      color: #787878;
      text-transform: uppercase;
      font-size: 36px;
      line-height: 44px;
    }
    &__description {
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 22px;
      line-height: 45px;
      color: #3E3E3E;
      padding: 45px 0;
    }
    p {
      font-family: montserratsemibold,sans-serif;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: 0.24px;
      color: #171717;
      text-transform: uppercase;
    }
    img {
      margin-top: 30px;
      width: auto;
      cursor: pointer;
      border-radius: 15px;
      box-shadow: -10px -7px 12px #FFFFFF, 7px 11px 20px -12px rgba(62, 62, 62, 0.1);
      @media (max-width: 1030px) {
        width: 100%;
      }
    }
  }
  .modal-input {
    &__nested {
      background-image: url("../static/arrow.svg");
    }
  }
  .calc {
    box-shadow: -9px -6px 10px #FFFFFF, 0 0px 17px -6px rgba(62, 62, 62, 0.6);
    max-width: 1200px;
    margin: 35px auto 0;
    border-radius: 15px;
    padding: 19px 0 25px;
    &__amount-mask {
      position: relative;
      .calc-select {
        padding-left: 35px;
      }
    }
    &__account {
      margin-top: 20px;
      position: relative;
      font-family: montserratsemibold, sans-serif;
      font-size: 20px;
      letter-spacing: 0.2px;
      color: #171717;
      text-transform: uppercase;
      span {
        letter-spacing: 0.26px;
        color: #E6B510;
      }
    }
    &__sign {
      position: absolute;
      top: -10px;
      left: 35px;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #787878;
      text-transform: none;
    }
    &__settings {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        width: 400px;
        height: 40px;
        padding: 11px 40px;
        border: 1px solid #171717;
        border-radius: 30px;
        font-family: montserratbold, sans-serif;
        font-size: 14px;
        letter-spacing: 0.28px;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        outline: none;
        margin-top: 40px;
        margin-bottom: 40px;
        transition: 0.4s;
        cursor: pointer;
        background-color: #171717;
      }
    }
  }
  .params {
    display: flex;
    justify-content: center;
    padding: 0 25px 0 39px;
    &__item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      input {
        margin-right: 40px;
        @media (min-width: 1300px) {
          max-width: 180px;
        }
      }
      p {
        flex: 100%;
        font-family: montserratlight, sans-serif;
        font-weight: 700;
        font-size: 24px;
        letter-spacing: 0;
        color: #303030;
        text-transform: none;
        text-align: left;
      }
    }
  }
  .calc-select {
    background-color: transparent;
    border: 1px solid rgba(23, 23, 23, 0.6);
    border-radius: 30px;
    padding: 8px 23px;
    outline: none;
    font-family: montserratlight, sans-serif;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.32px;
    color: #3E3E3E;
    margin-top: 20px;
    cursor: pointer;
    -webkit-appearance: borderless-attachment;
  }
  .select-wrapper {
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      margin-top: 0;
      width: 30px;
      bottom: 11px;
      right: 4px;
      z-index: 0;
      user-select: none;
      pointer-events: none;
      cursor: pointer;
      box-shadow: none;
      border-radius: 50px;
    }
  }
  .chartjs-render-monitor {
    @media (min-width: 1300px) {
      width: 1150px!important;
      height: 550px!important;
    }
    @media (max-width: 600px) {
      height: 320px!important;
    }
    margin: 0 auto;
  }
  .btn {
    border-bottom: 5px solid #EAEBEB;
    margin-bottom: 30px;
    padding: 0 25px 0 39px;
  }
  .btn__radios {
    display: flex;
    align-items: center;
    font-family: montserratlight, sans-serif;
    font-size: 10px;
    letter-spacing: 0.2px;
    color: #303030;
    margin-top: 13px;
    input[type=radio] {
      display: none;
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
      margin-right: 11px;
      width: 16px;
      height: 16px;
      background-color: transparent;
      border-radius: 10px;
      opacity: 1;
      box-shadow: -4px -3px 4px #FFFFFF, 2px 3px 9px -5px rgba(62, 62, 62, 0.9);
    }
    label:before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 2px;
      bottom: 2px;
      right: 2px;
      left: 2px;
      border: 1px solid #E6B510;
      background-color: transparent;
      border-radius: 50px;
      transition: 0.3s;
    }
    input[type=radio]:checked + label:before {
      background-color: #E6B510;
    }
    span {
      display: block;
      margin-right: 32px;
    }
  }
  .amount-value {
    position: absolute;
    font-family: montserratlight, sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #3E3E3E;
    top: 29px;
    left: 20px;
  }
  @import "~@/assets/scss/media";
</style>
