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
    <div class="about-content">
      <div class="map container">
        <h1 class="map__head">
          About BMC
        </h1>
        <div class="map__description">
          Your reliable partner in the world of mining equipment and blockchain technology.
        </div>
        <div class="map__content mission">
          <div class="mission__head">
            <p>Our mission:</p>
            <p class="mission__slogan">
              Under construction
            </p>
          </div>
          <div class="mission__description">
            <p>Your reliable partner in the world of mining equipment and blockchain technology.</p>
            <p>BMC company is working in the crypto industry since 2018. During this period, we achieved a certain level of success in all directions related to industrial mining.</p>
            <a
              class="mission__btn watch-btn"
              @click="showModalWindow = true"
            >
              Watch video
              <img src="../static/play.svg">
            </a>
          </div>
        </div>
        <div class="map__sign">
          Russian Federation
        </div>
      </div>
      <div class="history container">
        <div class="history__block">
          <p class="history__head">
            History
          </p>
          <p>Prerequisites for setting up BMC go back to 2012, when one of the first blockchain enthusiasts in Russia assembled a mining farm in his yard shed. Having gained his first experience in DLT industry, he shared this idea with the future founder of the company.</p>
          <p>In 2015, we started attracting enthusiastic software developers who had faith in our project and united to win. Gradually, we were able to put together a team of promising front-end and back-end developers who coherently and effectively dealt with the challenges who matured alongside with the burgeoning project.</p>
          <p>In the ensuing period, we carried out a great deal of experimental work, and following several years of collective endeavours decided to form a company able to offer to the market high-quality services in the field of blockchain technologies.</p>
          <p>Hence, although the company was officially registered in 2018, overall work along these lines had been conducted for a period of six years prior to its official incorporation.</p>
        </div>
        <div class="history__block">
          <p class="history__head">
            Our achievements
          </p>
          <p class="history__bolder">
            Over this period to this date, we:
          </p>
          <p>- Designed and created from scratch a mobile data center (MDC) for computing server equipment with a unique climate control system adapted to all weather conditions, including extremely low and high temperatures;</p>
          <p>- Put together a qualified team of dedicated and highly professional specialists who can successfully deal with extraordinary tasks and built a worksite with the developed infrastructure to house MDC;</p>
          <p>- Developed a system to monitor and manage mining equipment on an industrial scale and a cloud service to streamline the operations and business processes for the B2B sector;</p>
          <p>- Collaborated and concluded a distribution agreement with Bitfury, one of the world’s leading emerging technologies companies in the blockchain industry.</p>
        </div>
        <div class="history__conclusion">
          We are constantly developing and keep bringing our experience to the world of high technologies and blockchain industry, in order to better serve the rapidly-growing needs in this area.
        </div>
      </div>
      <div class="scope">
        <div class="container">
          <div class="scope__info">
            <p class="scope__head history__head">
              OUR SCOPE OF EXPERTISE:
            </p>
            <div class="scope__list">
              <p>We attract investments on mutually beneficial terms</p>
              <p>We manufacture mobile data centers (MDC) based on 40-foot freight containers</p>
              <p>We offer high-quality hosting for Customer’s equipment and MDC at our worksite</p>
              <p>We sell computing capacity</p>
              <p>We create B2B class applications and develop software tools</p>
              <p>We are the authorized distributor of Bitfury Holding in Russia</p>
            </div>
          </div>
          <div class="scope__photo">
            <img src="../static/scopeimg.svg">
          </div>
        </div>
      </div>
      <div class="advantages container">
        <div class="advantages__head history__head">
          Our advantages
        </div>
        <no-ssr>
          <carousel
            :loop="true"
            :dots="true"
            :auto-play="3000"
            :responsive="{1500:{items:4.5}, 1300:{items: 4}, 1030:{items: 3}, 0:{items: 2}}"
            class="advantage-carousel"
          >
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-1.svg">
                </div>
                <div class="advantage-item__text">
                  Officially guaranteed supply of 65 MW at the cheapest electricity price (high voltage, 3rd price category) in Russia
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-2.svg">
                </div>
                <div class="advantage-item__text">
                  Electricity at the average rate of $0.038 per kW/h with VAT (direct PPA with the utility company, no third parties involved)
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-3.svg">
                </div>
                <div class="advantage-item__text">
                  Legal hosting of equipment
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-4.svg">
                </div>
                <div class="advantage-item__text">
                  24/7 monitoring and technical support
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-5.svg">
                </div>
                <div class="advantage-item__text">
                  Our own skilled staff, including installation, service and IT personnel equipped with up-to-date equipment
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-6.svg">
                </div>
                <div class="advantage-item__text">
                  We take a flexible approach to every client and offer tailor-made solutions
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-7.svg">
                </div>
                <div class="advantage-item__text">
                  We offer an opportunity to observe functioning of equipment samples
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-8.svg">
                </div>
                <div class="advantage-item__text">
                  Five Internet-channel connection with auto switch
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-9.svg">
                </div>
                <div class="advantage-item__text">
                  Freehold land
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-10.svg">
                </div>
                <div class="advantage-item__text">
                  Execution of an Agreement with full validity
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-11.svg">
                </div>
                <div class="advantage-item__text">
                  Merchandising of Bitfury equipment at producer prices
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-12.svg">
                </div>
                <div class="advantage-item__text">
                  Our own service center with the highly-skilled professionals certified by Bitfury and Bitmain
                </div>
              </div>
            </div>
            <div class="advantage-carousel__item">
              <div class="advantage-item">
                <div class="advantage-item__image">
                  <img src="../static/adv-13.svg">
                </div>
                <div class="advantage-item__text">
                  CCTV, protected area
                </div>
              </div>
            </div>
          </carousel>
        </no-ssr>
      </div>
      <div class="team container">
        <div class="team__head history__head">
          Team
        </div>
        <div class="team__content">
          <template v-for="(item, itemIndex) in team">
            <div
              :key="itemIndex"
              class="team-item"
            >
              <div class="team-item__image">
                <img :src="item.image">
              </div>
              <div class="team-item__name">
                {{ item.name }}
              </div>
              <div class="team-item__sign">
                {{ item.post }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="irklife-logo">
        <div class="irklife-logo__container">
          <div class="irklife-logo__photo">
            <img src="@/static/irklife.svg">
          </div>
          <div class="irklife-logo__text">
            Software Development Team
          </div>
        </div>
      </div>
      <div class="reviews">
        <div class="reviews__head">
          Reviews
        </div>
        <div class="reviews__description">
          The outside experts in industry and academia supporting the project.
        </div>
        <div class="reviews__content reviews__carousel">
          <no-ssr>
            <owltimeout
              :loop="true"
              :dots="true"
              :auto-play="3000"
              :responsive="{0:{items:1},1030:{items:2},1715:{items:2.5}, 3700:{items:4}}"
            >
              <div
                v-for="(item, itemIndex) in reviews"
                :key="itemIndex"
                class="reviews__item review"
              >
                <div class="review__image">
                  <img :src="item.image">
                </div>
                <div class="review__text">
                  <div class="review__description">
                    {{ item.body }}
                  </div>
                  <div class="review__sign">
                    <div class="review__name">
                      {{ item.name }}
                    </div>
                    <div>
                      {{ item.post }}
                    </div>
                  </div>
                </div>
              </div>
            </owltimeout>
          </no-ssr>
        </div>
      </div>
      <div class="feedback about">
        <div class="container">
          <h2 class="feedback__title">
            Still have questions?
          </h2>
          <div class="feedback__description">
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
      showModalWindow: false,
      showSuccessWindow: false,
      errorForm: false,
      checkTrue: true,
      unautorization: '',
      rate: 0,
      errors: [],
      topicCountry: false,
      topicCountryValue: 'Country',
      countries: [],
      advantages: [
        {
          text: 'Officially guaranteed supply of 65 MW at the cheapest electricity price (high voltage, 3rd price category) in Russia',
          image: require('@/static/adv-1.svg')
        },
        {
          text: 'Electricity at the average rate of $0.038 per kW/h with VAT (direct PPA with the utility company, no third parties involved)',
          image: require('@/static/adv-2.svg')
        },
        {
          text: 'Legal hosting of equipment',
          image: require('@/static/adv-3.svg')
        },
        {
          text: '24/7 monitoring and technical support',
          image: require('@/static/adv-4.svg')
        },
        {
          text: 'Our own skilled staff, including installation, service and IT personnel equipped with up-to-date equipment',
          image: require('@/static/adv-5.svg')
        },
        {
          text: 'We take a flexible approach to every client and offer tailor-made solutions',
          image: require('@/static/adv-6.svg')
        },
        {
          text: 'We offer an opportunity to observe functioning of equipment samples',
          image: require('@/static/adv-7.svg')
        },
        {
          text: 'Five Internet-channel connection with auto switch',
          image: require('@/static/adv-8.svg')
        },
        {
          text: 'Freehold land',
          image: require('@/static/adv-9.svg')
        },
        {
          text: 'Execution of an Agreement with full validity',
          image: require('@/static/adv-10.svg')
        },
        {
          text: 'Merchandising of Bitfury equipment at producer prices',
          image: require('@/static/adv-11.svg')
        },
        {
          text: 'Our own service center with the highly-skilled professionals certified by Bitfury and Bitmain',
          image: require('@/static/adv-12.svg')
        },
        {
          text: 'CCTV, protected area',
          image: require('@/static/adv-13.svg')
        }
      ],
      team: [
        {
          name: 'Vadim Sachkov',
          sign: 'Chief Executive Officer (CEO)',
          image: require('@/static/1_Vadim_Sachkov.jpg')
        },
        {
          name: 'Alena Tumashova',
          sign: 'Chief Financial Analyst (CFA)',
          image: require('@/static/3_Alena_Tumashova.jpg')
        },
        {
          name: 'Victor Osipov',
          sign: 'Senior Software Developer (SSD)',
          image: require('@/static/4_Victor_Osipov.jpg')
        },
        {
          name: 'Anna Stegailo',
          sign: 'Chief Technical Architect (CTA)',
          image: require('@/static/5_Anna_Stegailo.jpg')
        },
        {
          name: 'Yurii Elshin',
          sign: 'Chief Technical Officer (CTO)',
          image: require('@/static/6_Yurii_Elshin.jpg')
        },
        {
          name: 'Sofya Dorovskaya',
          sign: 'SMM Manager',
          image: require('@/static/7_Sofya_Dorovskaya.jpg')
        },
        {
          name: 'Artem Zykov',
          sign: 'Design Engineer',
          image: require('@/static/8_Artem_Zykov.jpg')
        },
        {
          name: 'Aleksandra Chichkova',
          sign: 'Chief Business Officer (CBO)',
          image: require('@/static/9_Aleksandra_Chichkova.jpg')
        },
        {
          name: 'Alisa Klimenko',
          sign: 'Project Manager',
          image: require('@/static/10_Alisa_Klimenko.jpg')
        },
        {
          name: 'Yuliya Sycheva',
          sign: '3D Design Engineer',
          image: require('@/static/11_Julia_Sycheva.jpg')
        },
        {
          name: 'Mikhail Brusov',
          sign: 'Electrical Engineer',
          image: require('@/static/12_Mikhail_Brusov.jpg')
        },
        {
          name: 'Olga Shavel',
          sign: 'Chief Legal Officer (CLO)',
          image: require('@/static/13_Olga_Shavel.jpg')
        },
        {
          name: 'Stepan Vokin',
          sign: 'Advisor',
          image: require('@/static/team.svg')
        }
      ],
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true
      },
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
      reviews: [],
      reviewBody: ''
    }
  },
  created () {
    axios.get('https://core.bmc.ai/staff/get', {
    })
      .then((data) => {
        this.team = data.data
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
    axios.get('https://core.bmc.ai/reviews/get', {
    })
      .then((data) => {
        console.log(data.data)
        this.reviews = data.data
      })
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
          }, 3200)
        })
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/fonts";
@import "~@/assets/scss/main";
.about-content {
  background-color: #F7F7F7;
}
.map {
  background-image: url("../static/map.svg");
  background-size: auto;
  background-position: left 272px;
  background-repeat: no-repeat;
  padding-top: 115px;
  position: relative;
  &__head {
    font-family: montserratbold, sans-serif;
    color: #787878;
    font-size: 66px;
    text-transform: uppercase;
    text-align: center;
    padding-top: 112px;
  }
  &__description {
    font-family: montserrat, sans-serif;
    font-size: 28px;
    color: #3E3E3E;
    text-align: center;
    padding-top: 25px;
  }
  &__content {
    display: flex;
  }
  &__sign {
    position: absolute;
    font-family: robotolight, sans-serif;
    font-size: 12px;
    color: #787878;
    bottom: 100px;
    left: 125px;
    @media (max-width: 1300px) {
      bottom: 200px;
    }
    @media (max-width: 750px) {
      display: none;
    }
  }
}
.mission {
  padding-top: 130px;
  min-height: 600px;
  &__head {
    flex: 65%;
    text-align: center;
    font-family: robotolight, sans-serif;
    color: #3E3E3E;
    font-size: 24px;
    padding-left: 150px;
    p {
      padding-bottom: 10px;
    }
  }
  &__description {
    flex: 35%;
    padding-top: 150px;
    font-family: robotolight, sans-serif;
    color: #3E3E3E;
    font-size: 24px;
    p {
      &:first-child {
        padding-bottom: 30px;
      }
    }
  }
  &__slogan {
    font-family: montserratbold, sans-serif;
    font-size: 30px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #E6B510;
    opacity: 0.9;
  }
  &__btn {
    margin-top: 30px;
    white-space: nowrap;
  }
}
.history {
  padding: 100px 0 150px;
  display: flex;
  flex-wrap: wrap;
  &__block {
    font-family: montserratlight, sans-serif;
    color: #303030;
    font-size: 22px;
    line-height: 34px;
    flex: 50%;
    text-align: justify;
    &:first-child {
      padding-right: 100px;
    }
    p {
      padding: 20px 0;
    }
  }
  &__head {
    font-family: montserratbold, sans-serif;
    font-size: 36px;
    color: #787878;
    text-transform: uppercase;
    padding-bottom: 50px;
  }
  &__bolder {
    font-family: montserratsemibold, sans-serif;
  }
  &__conclusion {
    font-family: montserratsemibold, sans-serif;
    color: #303030;
    font-size: 22px;
    line-height: 34px;
    padding-top: 80px;
  }
}
.scope {
  background-color: #EFF0F0;
  overflow-x: hidden;
  .container {
    display: flex;
  }
  &__info {
    flex: 50%;
    padding: 35px 180px 35px 0;
  }
  &__list {
    p {
      padding-left: 40px;
      position: relative;
      font-family: robotolight, sans-serif;
      font-size: 24px;
      color: #3E3E3E;
      line-height: 34px;
      padding-bottom: 25px;
      &:last-child {
        padding-bottom: 0;
      }
      &:before {
        position: absolute;
        content: '';
        width: 18px;
        height: 18px;
        background-color: #E6B510;
        left: 0;
        top: 6px;
        transform: rotate(45deg);
      }
    }
  }
  &__photo {
    margin-right: -260px;
    flex: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.advantages {
  padding: 130px 75px 60px;
  &__head {
    text-align: center;
    padding-bottom: 0;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 65px;
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
    width: 130px;
    height: 130px;
    background: #F7F7F7;
    box-shadow: -9px -6px 10px #FFFFFF, 0 0px 17px -6px rgba(62, 62, 62, 0.6);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7px auto 0;
  }
  &__text {
    font-family: robotolight, sans-serif;
    font-size: 18px;
    line-height: 24px;
    color: #3e3e3e;
    flex: 100%;
    padding-top: 15px;
    max-width: 225px;
    margin: 0 auto;
  }
}
.team {
  &__head {
    text-align: center;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 44px 100px;
    justify-content: center;
  }
}
.team-item {
  flex: calc(25% - 60px);
  margin: 0 33px 50px;
  max-width: 258px;
  &:first-child {
    margin-left: 0;
  }
  &:nth-child(4) {
    margin-right: 0;
  }
  &:nth-child(5) {
    margin-left: 0;
  }
  &:nth-child(8) {
    margin-right: 0;
  }
  &:nth-child(9) {
    margin-left: 0;
  }
  &:nth-child(12) {
    margin-right: 0;
  }
  &__image {
    margin-bottom: 17px;
    height: 360px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  &__name {
    font-family: montserrat, sans-serif;
    font-size: 19px;
    line-height: 23px;
    color: #3e3e3e;
  }
  &__sign {
    font-family: montserratlight, sans-serif;
    font-size: 14px;
    color: #787878;
    padding-top: 8px;
  }
}
.irklife-logo {
  margin-bottom: 110px;
  &__container {
    display: flex;
    max-width: 360px;
    justify-content: center;
    margin: 0 auto;
  }
  &__text {
    font-family: montserrat,sans-serif;
    font-size: 19px;
    line-height: 23px;
    color: #3e3e3e;
    padding-left: 30px;
  }
}
.reviews {
  padding: 37px 0 23px;
  margin-bottom: 112px;
  background-color: #EFF0F0;
  &__head {
    text-align: center;
    font-family: montserratbold, sans-serif;
    color: #787878;
    font-size: 36px;
    text-transform: uppercase;
  }
  &__description {
    text-align: center;
    font-family: montserratlight, sans-serif;
    color: #787878;
    font-size: 28px;
    font-weight: bold;
    padding-top: 30px;
  }
  &__content {
    margin-top: 30px;
  }
  .owl-theme .owl-nav {
    display: none;
  }
  .owl-theme .owl-dots {
    margin-top: 40px;
  }
  .owl-theme .owl-dots .owl-dot
  {
    outline: none;
    span {
      background-color:  #E6B510!important;
      opacity: 0.2;
    }
  }
  .owl-dot.active span{
    opacity: 1!important;
  }
}
.review {
  margin: 10px 50px;
  box-shadow: -5px -2px 10px #FFFFFF, 0 4px 11px -6px rgba(62, 62, 62, 0.6);
  padding: 50px 65px;
  background-color: #F1F2F3;
  border-radius: 15px;
  display: flex;
  align-items: center;
  background-image: url("../static/quotes.svg");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 96% 19px;
  height: 290px;
  &__image {
    height: 150px;
    min-width: 150px;
    max-width: 150px;
    border: 1px solid #3E3E3E;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  &__description {
    margin: 0 auto;
    height: 145px;
/*    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;*/
  }
  &__text {
    padding-left: 60px;
    font-family: robotolight,sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: #3E3E3E;
    display: flex;
    flex-wrap: wrap;
  }
  &__sign {
    font-family: montserrat, sans-serif;
    font-size: 12px;
    letter-spacing: 0.12px;
    color: #3E3E3E;
    align-self: flex-end;
  }
  &__name {
    font-family: montserratsemibold, sans-serif;
    font-size: 14px;
    text-transform: uppercase;
  }
}
.advantage-carousel {
  margin-top: 66px;
  &__block {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  &__item {
    flex: 50%;
  }
  .owl-theme .owl-nav {
    display: none;
  }
  .owl-carousel .owl-item img {
    padding: 15px;
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
.modal-input {
  &__nested {
    background-image: url("../static/arrow.svg");
  }
}
@import "~@/assets/scss/media";
</style>
