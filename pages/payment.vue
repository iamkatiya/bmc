<template>
  <div class="overflow-hidden">
    <lk-head />
    <div class="payment">
      <div class="container">
        <div class="payment__nav counters">
          <div
            v-for="(item, itemIndex) in counters"
            :key="itemIndex"
            class="counters__item"
          >
            <div class="counters__count">
              {{ item.count }}
            </div>
            <div class="counters__sign">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="payment__content">
          <div class="personal-data__form account-form">
            <div class="account-form__head">
              Personal data
            </div>
            <div class="account-form__item">
              <p class="account-form__sign">
                First Name
              </p>
              <input
                v-model="accName"
                type="text"
                placeholder="Alexandra"
                :class="{ 'invalidField' : invalidName }"
              >
            </div>
            <div class="account-form__item account-form__nested">
              <p class="account-form__sign">
                Country
              </p>
              <div
                class="account-form__value"
                @click="countryMenu = true"
              >
                {{ countryValue }}
              </div>
              <div
                v-if="countryMenu"
                v-on-clickaway="closeMenuCountry"
                class="account-form__list"
              >
                <template v-for="(item, itemIndex) in countryItems">
                  <p
                    :key="itemIndex"
                    @click="changeCountry(item.name)"
                  >
                    {{ item.name }}
                  </p>
                </template>
              </div>
            </div>
            <div class="account-form__item">
              <p class="account-form__sign">
                Last Name
              </p>
              <input
                v-model="accLastname"
                type="text"
                placeholder="Kolochegova"
                :class="{ 'invalidField' : invalidLastname }"
              >
            </div>
            <div class="account-form__item">
              <p class="account-form__sign">
                Email
              </p>
              <input
                v-model="accEmail"
                type="email"
                placeholder="Kolochegova@icloud.com"
                :class="{ 'invalidField' : invalidEmial }"
              >
            </div>
            <div class="account-form__item account-form__shortItem">
              <p class="account-form__sign">
                Date of birth
              </p>
              <input v-mask="'##/##/####'" type="text" placeholder="01/01/2001">
            </div>
            <div class="account-form__item">
              <p class="account-form__sign">
                Phone
              </p>
              <vue-tel-input
                v-model="accNumber"
                placeholder="9836938883"
                autocomplete="off"
                v-bind="bindProps"
              />
            </div>
            <button
              @click="validInputs"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    <main-footer />
  </div>
</template>
<script>
import { mask } from 'vue-the-mask'
import { directive as onClickaway } from 'vue-clickaway'
import mainFooter from '~/components/footer.vue'
import lkHead from '~/components/lk.vue'

export default {
  components: {
    mainFooter,
    lkHead
  },
  directives: {
    /* eslint-disable */
      onClickaway: onClickaway,
      mask
      /* eslint-enable */
  },
  data () {
    return {
      newPass: '',
      photoSrc: '/_nuxt/static/lk-img.svg',
      repeatNewPass: '',
      personalData: false,
      openAddress: false,
      paymentInfo: true,
      addressInfo: false,
      purchaseHistory: false,
      cardAdd: false,
      defaultCardAdd: 'firstCard',
      countryMenu: false,
      activeLkValue: 'Personal data',
      passwordMismatch: false,
      accNumber: '',
      accEmail: '',
      accName: '',
      accLastname: '',
      invalidEmial: false,
      invalidName: false,
      invalidLastname: false,
      countryValue: 'Russian Federation',
      countryItems: [
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
        },
        {
          name: 'Germany'
        }
      ],
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true,
        validCharactersOnly: true
      },
      counters: [
        {
          name: 'Personal data',
          count: '1',
          id: 0
        },
        {
          name: 'Delivery',
          count: '2',
          id: 1
        },
        {
          name: 'Payment',
          count: '3',
          id: 2
        },
        {
          name: 'Review',
          count: '4',
          id: 3
        }
      ]
    }
  },
  mounted () {
    if (this.$cookies.get('token')) {
      setTimeout(() => {
        this.accName = this.$store.state.user.name
        this.accEmail = this.$store.state.user.email
      }, 1000)
    }
  },
  methods: {
    closeMenuCountry () {
      this.countryMenu = false
    },
    changeCountry (p) {
      this.countryValue = p
      this.countryMenu = false
    },
    changeActiveItem (itemIndex) {
      for (let i = 0; i < this.lkNav.length; i++) {
        if (this.lkNav[i].id === itemIndex) {
          this.activeLkValue = this.lkNav[i].name
        }
      }
    },
    changePass () {
      if (this.newPass !== this.repeatNewPass) {
        this.passwordMismatch = true
      } else {
        this.passwordMismatch = false
      }
    },
    validInputs () {
      /* eslint-disable */
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.accEmail) === false) {
          this.invalidEmial = true;
        } else {
          this.invalidEmial = false;
        }
        if (this.accName === '') {
          this.invalidName = true
        } else {
          this.invalidName = false
        }
        if (this.accLastname === '') {
          this.invalidLastname = true
        } else {
          this.invalidLastname = false
        }
      },
      signalChange (evt) {
        if (evt.target.files[0] === undefined) {
          console.log('ERROR')
        } else {
          this.photoSrc = '/_nuxt/static/' + evt.target.files[0].name
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/fonts";
  @import "~@/assets/scss/main";
  .payment {
    background-color: #F7F7F7;
    padding: 30px 0 50px;
    &__content {
      max-width: 878px;
      margin: 43px auto;
    }
  }
  .counters {
    display: flex;
    max-width: 778px;
    justify-content: space-between;
    margin: 0 auto;
    position: relative;
    align-items: center;
    &::before {
      content: '';
      position: absolute;
      display: flex;
      width: 100%;
      height: 13px;
      background: transparent linear-gradient(180deg, rgba(104, 104, 104, 0.1) 0%, #f9f9f9 100%);
      top: 13px;
      z-index: 0;
      border-radius: 10px;
    }
    &__item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      z-index: 10;
      flex: 25%;
      width: 25%;
    }
    &__sign {
      flex: 100%;
      font-family: montserratbold, sans-serif;
      font-size: 17px;
      letter-spacing: 0.34px;
      color: #787878;
      margin-top: 15px;
    }
    &__count {
      box-shadow: -4px -8px 10px #fff, 0 0 16px -9px rgba(62, 62, 62, 0.8);
      width: 35px;
      height: 35px;
      border: 5px solid #F7F7F7;
      border-radius: 50px;
      box-sizing: border-box;
      background-color: #F7F7F7;
      font-family: montserratbold, sans-serif;
      font-size: 20px;
      letter-spacing: 0.4px;
      color: #787878;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .account-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &__head {
      text-align: left;
      font-family: montserrat, sans-serif;
      font-weight: 600;
      font-size: 22px;
      letter-spacing: 0.44px;
      color: #000000;
      text-transform: uppercase;
      flex: 100%;
      margin-bottom: 43px;
    }
    &__sign {
      font-family: montserratlight, sans-serif;
      font-size: 16px;
      letter-spacing: 0.16px;
      color: #3E3E3E;
      padding-bottom: 5px;
      opacity: 0.6;
    }
    &__item {
      flex: 50%;
    }
    &__nested {
      position: relative;
    }
    &__value {
      background-image: url("../static/arrow.svg");
      background-repeat: no-repeat;
      background-position: 95% 13px;
      background-size: auto;
      cursor: pointer;
      border: 0.4px solid rgba(112, 112, 112, 0.42);
      border-radius: 30px;
      padding: 9px 15px;
      font-size: 15px;
      letter-spacing: 0.3px;
      color: #3E3E3E;
      text-transform: none;
      background-color: transparent;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      margin-bottom: 23px;
      outline: none;
      width: 100%;
      max-width: 363px;
    }
    &__list {
      position: absolute;
      width: 363px;
      height: 140px;
      overflow-y: auto;
      left: 0;
      top: calc(100% - 23px);
      background-color: rgba(242, 243, 243, 1);
      border-radius: 22px;
      padding: 20px;
      font-family: montserratlight, sans-serif;
      font-size: 15px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: 0.3px;
      color: #3E3E3E;
      z-index: 1;
      p {
        opacity: 0.7;
        transition: 0.3s;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }
    &__btn {
      max-width: 200px;
      margin-top: 48px;
    }
    input {
      border: 0.4px solid rgba(112, 112, 112, 0.42);
      border-radius: 30px;
      padding: 9px 15px;
      font-size: 15px;
      letter-spacing: 0.3px;
      color: #3E3E3E;
      text-transform: none;
      background-color: transparent;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      margin-bottom: 23px;
      outline: none;
      width: 100%;
      max-width: 363px;
    }
    &__shortItem {
      input {
        max-width: 200px;
      }
    }
  }
  @import "~@/assets/scss/media";
</style>
