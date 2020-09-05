<template>
  <div class="overflow-hidden">
    <lk-head />
    <div class="lk">
      <div class="container">
        <div class="lk__account account-data">
          <div class="account-data__head">
            Account data
          </div>
          <div class="account-data__photo">
            <img
              class="account-img"
              :src="photoSrc"
            >
            <div class="account-change">
              <img src="../static/pen.svg">
              <input ref="file" name="attachment" type="file" @change="signalChange">
            </div>
          </div>
          <div class="account-data__form account-form">
            <p class="account-form__sign">
              Login
            </p>
            <input
              v-model="accEmail"
              type="text"
              placeholder="JELLATTO2020"
            >
            <p class="account-form__sign">
              New Password
            </p>
            <input v-model="newPass" type="password" placeholder="•••••••••">
            <p class="account-form__sign">
              Repeat Password
            </p>
            <input v-model="repeatNewPass" type="password" placeholder="•••••••••">
            <div
              v-if="passwordMismatch"
              class="pass-mismatch"
            >
              Your passwords don't match
            </div>
            <div
              v-if="successfulChangePass"
              class="successful-reset-pass"
            >
              Your password has been successfully changed
            </div>
          </div>
          <button
            class="account-data__btn"
            @click="changePass"
          >
            Save changes
          </button>
        </div>
        <div class="lk__content">
          <div
            class="lk__menu lk-nav"
          >
            <div
              v-for="(item, itemIndex) in lkNav"
              :key="itemIndex"
              class="lk-nav__item"
              :class="{ 'lk-nav__active' : activeLkValue === item.name }"
              @click="changeActiveItem(itemIndex)"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            v-if="activeLkValue === 'Personal data'"
            class="lk__data personal-data"
          >
            <div class="personal-data__head">
              Your Account Settings
            </div>
            <div class="personal-data__description">
              Easily update account information and enable options that enhance your BMC Online Store shopping experience
            </div>
            <div class="personal-data__form account-form">
              <div class="account-form__item">
                <p class="account-form__sign">
                  First Name
                </p>
                <input
                  v-model="accName"
                  type="text"
                  placeholder="First name"
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
                  {{ countryValue.name }}
                </div>
                <div
                  v-if="countryMenu"
                  v-on-clickaway="closeMenuCountry"
                  class="account-form__list"
                >
                  <template v-for="(item, itemIndex) in countryItems">
                    <p
                      :key="itemIndex"
                      @click="changeCountry(item)"
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
                  placeholder="Last name"
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
                <input
                  v-model="accBirth"
                  v-mask="'####/##/##'"
                  type="text"
                  placeholder="YYYY/MM/DD"
                >
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
              <div
                v-if="successfulChangePersonalData"
                class="successful-reset-pass"
              >
                Your personal data has been successfully changed
              </div>
              <button
                class="account-form__btn account-data__btn"
                @click="changePersonalData"
              >
                Save changes
              </button>
            </div>
          </div>
          <div
            v-else-if="activeLkValue === 'Payment Information'"
            class="lk__data payment-info"
          >
            <!--            <div class="payment-info__about">-->
            <!--              <div class="payment-info__head">-->
            <!--                Credit Card-->
            <!--              </div>-->
            <!--              <div class="payment-info__radiobutton">-->
            <!--                <input-->
            <!--                  id="radio-1"-->
            <!--                  v-model="defaultCardAdd"-->
            <!--                  type="radio"-->
            <!--                  name="radio"-->
            <!--                  value="firstCard"-->
            <!--                >-->
            <!--                <label for="radio-1"></label>-->
            <!--              </div>-->
            <!--              <div class="payment-info__card">-->
            <!--                <img src="../static/visa.svg">-->
            <!--              </div>-->
            <!--              <div class="payment-info__date">-->
            <!--                Visa …9422 <br>-->
            <!--                Exp: 05 / 2022-->
            <!--              </div>-->
            <!--              <button class="payment-info__delete account-data__btn">-->
            <!--                Delete-->
            <!--              </button>-->
            <!--            </div>-->
            <!--            <div class="payment-info__about">-->
            <!--              <div class="payment-info__radiobutton">-->
            <!--                <input-->
            <!--                  id="radio-6"-->
            <!--                  v-model="cardAdd"-->
            <!--                  type="radio"-->
            <!--                  name="radio"-->
            <!--                  checked-->
            <!--                  value="secondCard"-->
            <!--                >-->
            <!--                <label for="radio-6"></label>-->
            <!--              </div>-->
            <!--              <div class="payment-info__card">-->
            <!--                <img src="../static/visa.svg">-->
            <!--              </div>-->
            <!--              <div class="payment-info__date">-->
            <!--                Visa …9422 <br>-->
            <!--                Exp: 05 / 2022-->
            <!--              </div>-->
            <!--              <button class="payment-info__delete account-data__btn">-->
            <!--                Delete-->
            <!--              </button>-->
            <!--            </div>-->
            <div class="payment-info__add add-payment">
              <div class="add-payment__head">
                add a new payment method
              </div>
              <div class="add-payment__row">
                <div class="add-payment__radiobutton">
                  <input
                    id="radio-2"
                    v-model="cardAdd"
                    type="radio"
                    name="radio"
                    value="creditCard"
                    @click="cardAdd =! cardAdd"
                  >
                  <label for="radio-2" />
                </div>
                <div class="add-payment__type">
                  Credit card
                </div>
                <div class="add-payment__card">
                  <img src="../static/visa.svg">
                </div>
                <div class="add-payment__card">
                  <img src="../static/mastercard.svg">
                </div>
                <div class="add-payment__card">
                  <img src="../static/american-express.svg">
                </div>
                <div
                  v-if="cardAdd === 'creditCard'"
                  class="add-payment__form add-input"
                >
                  <p class="add-input__name">
                    Name on card
                  </p>
                  <input
                    type="text"
                    class="add-input__cardName"
                    onkeyup="this.value=this.value.replace(/[^a-z ]/gi,'')"
                  >
                  <p class="add-input__name">
                    Credit Card Number
                  </p>
                  <input
                    type="text"
                    class="add-input__cardNumber"
                    onkeyup="this.value=this.value.replace(/[^0-9.]/g, '')"
                  >
                  <div class="add-input__flexbox">
                    <p class="add-input__name">
                      Expiration Date
                    </p>
                    <p class="add-input__name">
                      Security code
                    </p>
                    <input
                      v-mask="'##/##'"
                      type="text"
                      class="add-input__cardDate"
                    >
                    <input
                      v-mask="'###'"
                      type="text"
                      class="add-input__cardCode"
                    >
                  </div>
                  <div class="add-input__checkbox">
                    <input id="savePaymentInfo" type="checkbox">
                    <label for="savePaymentInfo" />
                    Save my payment information for my next purchase
                  </div>
                </div>
              </div>
              <div class="add-payment__row">
                <div class="add-payment__radiobutton">
                  <input id="radio-3" v-model="cardAdd" type="radio" name="radio" value="payPal">
                  <label for="radio-3" />
                </div>
                <div class="add-payment__type">
                  Pay with PayPal
                </div>
                <div class="add-payment__card">
                  <img src="../static/paypal.svg">
                </div>
              </div>
              <div class="add-payment__row">
                <div class="add-payment__radiobutton">
                  <input id="radio-8" v-model="cardAdd" type="radio" name="radio" value="applePay">
                  <label for="radio-8" />
                </div>
                <div class="add-payment__type">
                  Pay with Apple Pay
                </div>
                <div class="add-payment__card">
                  <img src="../static/applepay.svg">
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="activeLkValue === 'Address Info'"
            class="lk__data address-info"
          >
            <div
              v-for="(item, itemIndex) in savedAddresses"
              :key="itemIndex"
              class="address-info__content"
            >
              <div class="payment-info__radiobutton">
                <input
                  :id="'radio-' + item.address_id"
                  type="radio"
                  name="radio"
                >
                <label :for="'radio-' + item.address_id" />
              </div>
              <div class="payment-info__text">
                {{ accName }} {{ accLastname }} <br>
                {{ item.street }} str <br>
                {{ item.city }} <br>
                {{ item.region }} <br>
                {{ item.country }} <br>
                {{ item.other }} <br>
                {{ item.zip_code }} <br>
              </div>
              <button
                class="address-info__delete account-data__btn"
                @click="deleteAddress(item.address_id)"
              >
                Delete
              </button>
            </div>
            <!--            <div class="address-info__content">-->
            <!--              <div class="payment-info__radiobutton">-->
            <!--                <input id="radio-5" type="radio" name="radio" checked>-->
            <!--                <label for="radio-5"></label>-->
            <!--              </div>-->
            <!--              Kolochegova Aleksandra TRILISSERA STR 115 IRKUTSK Irkutskaya obl. 664023 Russia 664023-->
            <!--            </div>-->
            <!--            <button class="address-info__delete account-data__btn">-->
            <!--              Delete-->
            <!--            </button>-->
            <div
              class="address-info__add"
              @click="addressInfo =! addressInfo"
            >
              <img src="../static/plus-address.svg">
              Add a new address
            </div>
            <div
              v-if="addressInfo"
              class="personal-data__form account-form"
            >
              <div class="account-form__item account-form__nested">
                <p class="account-form__sign">
                  Country
                </p>
                <div
                  class="account-form__value"
                  @click="countryMenu = true"
                >
                  {{ countryValue.name }}
                </div>
                <div
                  v-if="countryMenu"
                  v-on-clickaway="closeMenuCountry"
                  class="account-form__list"
                >
                  <template v-for="(item, itemIndex) in countryItems">
                    <p
                      :key="itemIndex"
                      @click="changeCountry(item)"
                    >
                      {{ item.name }}
                    </p>
                  </template>
                </div>
              </div>
              <div class="account-form__item">
                <p class="account-form__sign">
                  Apt / Suite / Other
                </p>
                <input
                  v-model="addressApt"
                  type="text"
                  placeholder="8/13"
                  :class="{ 'invalidField' : invalidApt }"
                >
              </div>
              <div class="account-form__item">
                <p class="account-form__sign">
                  Street address
                </p>
                <input
                  v-model="addressStreet"
                  type="text"
                  placeholder="Trilissera str."
                  :class="{ 'invalidField' : invalidStreet }"
                >
              </div>
              <div class="account-form__item account-form__shortItem">
                <p class="account-form__sign">
                  State
                </p>
                <input
                  v-model="addressOblast"
                  type="text"
                  placeholder="Irkutskaya obl."
                  :class="{ 'invalidField' : invalidOblast }"
                >
              </div>
              <div class="account-form__item">
                <p class="account-form__sign">
                  City
                </p>
                <input
                  v-model="addressCity"
                  type="email"
                  placeholder="Irkutsk"
                  :class="{ 'invalidField' : invalidCity }"
                >
              </div>
              <div class="account-form__item account-form__shortItem">
                <p class="account-form__sign">
                  ZIP code
                </p>
                <input
                  v-model="addressZip"
                  type="text"
                  placeholder="664023"
                  onkeyup="this.value=this.value.replace(/[^0-9.]/g, '')"
                  :class="{ 'invalidField' : invalidZip }"
                >
              </div>
              <button
                class="account-form__btn account-data__btn"
                @click="changeAddress"
              >
                Save changes
              </button>
            </div>
          </div>
          <div
            v-else-if="activeLkValue === 'Purchase history'"
            class="lk__data purchase-history"
          >
            <div class="purchase-history__none">
              You have no purchases yet
            </div>
            <!--            <div class="purchase-history__table-head table-head">-->
            <!--              <div class="table-head__quantity">-->
            <!--                Showing-->
            <!--                <div class="quantity-menu">-->
            <!--                  10-->
            <!--                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                    <defs>-->
            <!--                      <clipPath id="clip-Web_1920_370">-->
            <!--                        <rect width="8.7" height="4.35"/>-->
            <!--                      </clipPath>-->
            <!--                    </defs>-->
            <!--                    <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                      <g id="ic_arrow_drop_down_36px">-->
            <!--                        <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                      </g>-->
            <!--                    </g>-->
            <!--                  </svg>-->
            <!--                </div>-->
            <!--                entries-->
            <!--              </div>-->
            <!--              <div class="table-head__search">-->
            <!--                <input type="search" placeholder="Search">-->
            <!--                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 15 15">-->
            <!--                  <defs>-->
            <!--                    <clipPath id="clip-Web_1920_374">-->
            <!--                      <rect width="15" height="15"/>-->
            <!--                    </clipPath>-->
            <!--                  </defs>-->
            <!--                  <g id="Web_1920_374" data-name="Web 1920 – 374" clip-path="url(#clip-Web_1920_374)">-->
            <!--                    <g id="zoom-2">-->
            <!--                      <path id="Path_457" data-name="Path 457" d="M15,13.65,11.213,9.863a6.231,6.231,0,1,0-1.35,1.35L13.65,15ZM.955,6.207A5.252,5.252,0,1,1,6.207,11.46,5.259,5.259,0,0,1,.955,6.207Z" transform="translate(0 0)" fill="#171717"/>-->
            <!--                    </g>-->
            <!--                  </g>-->
            <!--                </svg>-->

            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="purchase-history__table-body table-body">-->
            <!--              <div class="table-body__row head-row">-->
            <!--                <div class="head-row__item">-->
            <!--                  #-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="head-row__item">-->
            <!--                  PRODUCT-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="head-row__item">-->
            <!--                  AMOUNT-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="head-row__item">-->
            <!--                  DATE-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div-->
            <!--                v-for="(item, itemIndex) in history"-->
            <!--                :key="itemIndex"-->
            <!--              >-->
            <!--                <div class="table-body__row body-row">-->
            <!--                  <div class="body-row__item">-->
            <!--                    {{ item.id }}-->
            <!--                  </div>-->
            <!--                  <div class="body-row__item">-->
            <!--                    {{ item.product }}-->
            <!--                  </div>-->
            <!--                  <div class="body-row__item">-->
            <!--                    {{ item.amount }}-->
            <!--                  </div>-->
            <!--                  <div class="body-row__item">-->
            <!--                    {{ item.date }}-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="table-body__dropdown table-dropdown">-->
            <!--                  <div class="table-dropdown__row">-->
            <!--                    <div class="table-dropdown__left-head">-->
            <!--                      Order no.-->
            <!--                    </div>-->
            <!--                    <div class="table-dropdown__details text-bold">-->
            <!--                      738-74-N-69-mk-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="table-dropdown__row">-->
            <!--                    <div class="table-dropdown__left-head">-->
            <!--                      description-->
            <!--                    </div>-->
            <!--                    <div class="table-dropdown__details">-->
            <!--                      <span class="text-bold">Bitfury Tardis B9/</span> 8 Hashboards version: 80 TH/s | 79 J/TH-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="table-dropdown__row">-->
            <!--                    <div class="table-dropdown__left-head">-->
            <!--                      unit price-->
            <!--                    </div>-->
            <!--                    <div class="table-dropdown__details">-->
            <!--                      $121.04-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="table-dropdown__row">-->
            <!--                    <div class="table-dropdown__left-head">-->
            <!--                      quantity-->
            <!--                    </div>-->
            <!--                    <div class="table-dropdown__details">-->
            <!--                      1-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="table-dropdown__row">-->
            <!--                    <div class="table-dropdown__left-head">-->
            <!--                      amount status-->
            <!--                    </div>-->
            <!--                    <div class="table-dropdown__details text-bold text-yellow">-->
            <!--                      Completed-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="table-dropdown__row">-->
            <!--                    <div class="table-dropdown__left-head">-->
            <!--                      subtotal/total-->
            <!--                    </div>-->
            <!--                    <div class="table-dropdown__details">-->
            <!--                      $121.04<span class="text-bold">/$121.04</span>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="table-body__row head-row footer-row">-->
            <!--                <div class="head-row__item">-->
            <!--                  #-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="head-row__item">-->
            <!--                  PRODUCT-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="head-row__item">-->
            <!--                  AMOUNT-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="head-row__item">-->
            <!--                  DATE-->
            <!--                  <div class="table-arrows">-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_369">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_369" data-name="Web 1920 – 369" clip-path="url(#clip-Web_1920_369)">-->
            <!--                        <g id="ic_arrow_drop_down_36px" transform="translate(8.7 4.352) rotate(180)">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M0,0,4.35,4.351,8.7,0Z" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8.7" height="4.35" viewBox="0 0 8.7 4.35">-->
            <!--                      <defs>-->
            <!--                        <clipPath id="clip-Web_1920_370">-->
            <!--                          <rect width="8.7" height="4.35"/>-->
            <!--                        </clipPath>-->
            <!--                      </defs>-->
            <!--                      <g id="Web_1920_370" data-name="Web 1920 – 370" clip-path="url(#clip-Web_1920_370)">-->
            <!--                        <g id="ic_arrow_drop_down_36px">-->
            <!--                          <path id="Path_456" data-name="Path 456" d="M10.5,15l4.35,4.351L19.2,15Z" transform="translate(-10.5 -15)" fill="#171717"/>-->
            <!--                        </g>-->
            <!--                      </g>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="purchase-history__table-head table-head table-footer">-->
            <!--              <div class="table-head__quantity">-->
            <!--                Showing 1 to 10 of 90 entries-->
            <!--              </div>-->
            <!--              <div class="table-footer__pagination table-pagination">-->
            <!--                <div class="table-pagination__arrow">-->
            <!--                  Previous-->
            <!--                </div>-->
            <!--                <div class="table-pagination__item">-->
            <!--                  1-->
            <!--                </div>-->
            <!--                <div class="table-pagination__item">-->
            <!--                  2-->
            <!--                </div>-->
            <!--                <div class="table-pagination__item">-->
            <!--                  3-->
            <!--                </div>-->
            <!--                <div class="table-pagination__item">-->
            <!--                  4-->
            <!--                </div>-->
            <!--                <div class="table-pagination__item">-->
            <!--                  5-->
            <!--                </div>-->
            <!--                <div class="table-pagination__arrow">-->
            <!--                  Next-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <main-footer />
  </div>
</template>
<script>
import axios from 'axios'
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
      savedAddresses: [],
      addressCountry: [],
      addressStreet: '',
      addressCity: '',
      addressApt: '',
      addressOblast: '',
      addressZip: '',
      invalidStreet: false,
      invalidCity: false,
      invalidApt: false,
      invalidOblast: false,
      invalidZip: false,
      addressAdd: false,
      successfulChangePersonalData: false,
      successfulChangePass: false,
      newPass: '',
      accBirth: '',
      photoSrc: '',
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
      history: [
        {
          id: 1,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 2,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 3,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 4,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 5,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 6,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 7,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 8,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 9,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        },
        {
          id: 10,
          product: 'Intel Xeon X5650, 2.60Ghz',
          amount: '$121.04',
          date: '12, Jan 2020'
        }
      ],
      lkNav: [
        {
          name: 'Personal data',
          id: 0
        },
        {
          name: 'Payment Information',
          id: 1
        },
        {
          name: 'Address Info',
          id: 2
        },
        {
          name: 'Purchase history',
          id: 3
        }
      ],
      countryValue: { name: '' },
      countryItems: [],
      bindProps: {
        enabledFlags: false,
        enabledCountryCode: true,
        validCharactersOnly: true
      }
    }
  },
  mounted () {
    if (this.$cookies.get('token')) {
      setTimeout(() => {
        this.accName = this.$store.state.user.name
        this.accEmail = this.$store.state.user.email
        this.accLastname = this.$store.state.user.lastName
        if (this.$store.state.user.phone !== null) {
          this.accNumber = this.$store.state.user.phone
        }
        console.log(this.$store.state.user.birth)
        this.accBirth = this.$store.state.user.birth
        this.countryValue.id = this.$store.state.user.country
        if ((this.$store.state.user.image === undefined) || (this.$store.state.user.image === null)) {
          this.photoSrc = '/userprofile.png'
        } else {
          this.photoSrc = 'https://core.bmc.ai/' + this.$store.state.user.image
        }
        axios.get('https://core.bmc.ai/countries', {
        })
          .then((data) => {
            this.countryItems = data.data
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].id === this.$store.state.user.country) {
                this.countryValue.name = data.data[i].name
              }
            }
          })
        const userId = (this.$store.state.user.id).toString()
        axios.get('https://core.bmc.ai/users/get/' + userId, { headers: { Authorization: 'Bearer ' + this.$cookies.get('token') } })
          .then((response) => {
            this.savedAddresses = response.data.address_info
          })
      }, 500)
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
        setTimeout(() => {
          this.passwordMismatch = false
        }, 2000)
        this.passwordMismatch = true
      } else {
        this.passwordMismatch = false
        const token = this.$cookies.get('token')
        const userId = (this.$store.state.user.id).toString()
        axios.post('https://core.bmc.ai/users/set/' + userId + '/password', { password: this.newPass, password_confirmation: this.repeatNewPass }, { headers: { Authorization: 'Bearer ' + this.$cookies.get('token') } })
          .then((response) => {
          })
        setTimeout(() => {
          this.successfulChangePass = false
        }, 2000)
        this.successfulChangePass = true
      }
    },
    changePersonalData () {
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
      if ((this.invalidEmial === false)&&(this.invalidName === false)&&(this.invalidLastname === false)) {
        let token = this.$cookies.get("token")
        let userId = (this.$store.state.user.id).toString()
        axios.post('https://core.bmc.ai/users/set/'+userId+'/account', {first_name: this.accName, last_name: this.accLastname, email: this.accEmail, phone: this.accNumber, birth: this.accBirth, country: this.countryValue.id}, {headers: { Authorization: 'Bearer ' + this.$cookies.get("token") }} )
          .then((response) => {
            console.log(response)
          })
        setTimeout(()=>{
          this.successfulChangePersonalData = false
        }, 2000)
        this.successfulChangePersonalData = true
      }
    },
    changeAddress () {
      if (this.addressStreet === '') {
        this.invalidStreet = true
      } else {
        this.invalidStreet = false
      }
      if (this.addressCity === '') {
        this.invalidCity = true
      } else {
        this.invalidCity = false
      }
      if (this.addressApt === '') {
        this.invalidApt = true
      } else {
        this.invalidApt = false
      }
      if (this.addressOblast === '') {
        this.invalidOblast = true
      } else {
        this.invalidOblast = false
      }
      if (this.addressZip === '') {
        this.invalidZip = true
      } else {
        this.invalidZip = false
      }
      if ((this.invalidStreet === false)&&(this.invalidCity === false)&&(this.invalidApt === false)&&(this.invalidOblast === false)&&(this.invalidZip === false)) {
        let country = this.countryValue.name
        this.addressInfo = false
        let userId = (this.$store.state.user.id).toString()
        axios.post('https://core.bmc.ai/users/set/'+userId+'/address', {street: this.addressStreet, country: country, city: this.addressCity, other: this.addressApt, region: this.addressOblast, zip_code: this.addressZip}, {headers: { Authorization: 'Bearer ' + this.$cookies.get("token") }} )
          .then((response) => {
            axios.get('https://core.bmc.ai/users/get/'+userId, { headers: { Authorization: 'Bearer ' + this.$cookies.get("token") } })
              .then((response) => {
                this.savedAddresses = response.data.address_info
              })
          })
      }
    },
    deleteAddress(address) {
      let userId = (this.$store.state.user.id).toString()
      axios.post('https://core.bmc.ai/users/delete_address', {id: address}, {headers: { Authorization: 'Bearer ' + this.$cookies.get("token") }} )
        .then((response) => {
          axios.get('https://core.bmc.ai/users/get/'+userId, { headers: { Authorization: 'Bearer ' + this.$cookies.get("token") } })
            .then((response) => {
              this.savedAddresses = response.data.address_info
            })
        })
    },
    signalChange (evt) {
      // console.log(this.$refs.file.files[0])
      let img = this.$refs.file.files[0]
      let testFormData = new FormData()
      testFormData.append('image', img)
      let token = this.$cookies.get("token")
      let userId = (this.$store.state.user.id).toString()
      axios.post('https://core.bmc.ai/users/set/'+userId+'/image', testFormData,
        {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get("token"),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          var reader = new FileReader()
          reader.readAsDataURL(this.$refs.file.files[0])
          reader.onload = () => {
            this.photoSrc = reader.result
          }
        })
    },
  }
}
</script>

<style lang="scss">
  @import "~@/assets/scss/fonts";
  @import "~@/assets/scss/main";
  .invalidField {
    border: 1px solid rgba(255, 0, 0, 0.49) !important;
  }
  .lk {
    background-color: #F7F7F7;
    padding: 100px 0 277px;
    .container {
      max-width: 1660px;
      display: flex;
    }
    &__account {
      padding: 21px 49px 37px;
      background-color: #F5F5F5;
      box-shadow: 2px 5px 10px #E6E6E6;
      border-radius: 15px;
      max-width: 297px;
      height: 634px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__menu {
      display: flex;
      align-items: flex-start;
    }
    &__content {
      margin-left: 90px;
      padding-top: 21px;
    }
  }
  .account-data {
    &__head {
      font-family: montserratbold, sans-serif;
      font-size: 18px;
      text-align: center;
      letter-spacing: 0.36px;
      color: #000000;
      text-transform: uppercase;
      padding-bottom: 48px;
      flex: 100%;
    }
    &__photo {
      width: 150px;
      height: 150px;
      position: relative;
      margin-bottom: 23px;
      overflow: hidden;
      border-radius: 80px;
    }
    &__btn {
      width: 100%;
      height: 40px;
      padding: 11px 40px;
      border: 1px solid #171717;
      border-radius: 30px;
      font-family: montserratbold, sans-serif;
      font-size: 14px;
      letter-spacing: 0.28px;
      color: #303030;
      text-transform: uppercase;
      white-space: nowrap;
      outline: none;
      transition: 0.4s;
      cursor: pointer;
      background-color: transparent;
      &:hover {
        background-color: #171717;
        color: white;
      }
    }
  }
  .account-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
      height: 40px;
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
  .account-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .lk-nav {
    &__item {
      margin-right: 75px;
      font-family: montserratbold, sans-serif;
      font-size: 18px;
      letter-spacing: 0.36px;
      color: #A2A2A2;
      text-transform: uppercase;
      padding-bottom: 15px;
      position: relative;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        color: #000;
        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: 0;
          background: #E6B510;
        }
      }
      &:before {
        content: '';
        position: absolute;
        width: 50px;
        height: 2px;
        left: 0;
        bottom: 0;
        background: #A2A2A2;
        transition: 0.4s;
      }
    }
    &__active {
      color: #000;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        left: 0;
        bottom: 0;
        background: #E6B510;
      }
    }
  }
  .personal-data {
    &__head {
      margin-top: 71px;
      text-align: center;
      font-family: montserratsemibold, sans-serif;
      font-size: 24px;
      letter-spacing: 0.24px;
      color: #303030;
      padding-right: 345px;
    }
    &__description {
      text-align: center;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.16px;
      color: #171717;
      padding-top: 25px;
      padding-bottom: 67px;
      padding-right: 345px;
    }
    &__form {
      padding-right: 245px;
    }
  }
  .vue-tel-input {
    width: 100%;
    border: 0.4px solid rgba(112, 112, 112, 0.42)!important;
    border-radius: 30px!important;
    background-color: transparent;
    padding-left: 20px;
    font-family: montserratlight, sans-serif;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #3E3E3E;
    text-transform: uppercase;
    max-width: 363px;
    max-height: 40px;
    &:focus-within {
      box-shadow: none!important;
    }
    input {
      border: none;
      padding-left: 15px;
      margin-bottom: 0;
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
  .account-change {
    position: absolute;
    right: 6px;
    top: 4px;
    width: 48px;
    height: 53px;
    background-image: url("../static/change-backgr.svg");
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    img {
      margin-right: 15px;
      margin-top: 18px;
    }
    &:hover {
      filter: brightness(0.7);
    }
  }
  .payment-info {
    margin-top: 52px;
    &__about {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      max-width: 600px;
      padding-bottom: 20px;
    }
    &__head {
      flex: 100%;
      font-family: montserratlight, sans-serif;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.32px;
      color: #171717;
      padding-bottom: 15px;
    }
    &__delete {
      max-width: 200px;
    }
    &__text {
      width: 184px;
    }
    &__radiobutton {
      margin-right: 32px;
       input[type=radio] {
        display: none;
      }
       label {
         display: inline-block;
         cursor: pointer;
         position: relative;
         margin-right: 0;
         width: 20px;
         height: 20px;
         border: 1px solid #3E3E3E;
         border-radius: 5px;
         padding: 3px;
      }
      label:before {
        content: "";
        display: inline-block;
        opacity: 0;
        position: absolute;
        left: 2px;
        bottom: 2px;
        width: 14px;
        height: 14px;
        background: #E6B510;
        border-radius: 5px;
        transition: 0.3s;
      }
      input[type=radio]:checked + label:before {
        opacity: 1;
      }
    }
    &__card {
      margin-right: 32px;
    }
    &__date {
      font-family: montserratlight, sans-serif;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.32px;
      color: #171717;
      margin-right: 40px;
    }
    &__add {
      margin-top: 78px;
      max-width: 629px;
    }
  }
  .add-payment {
    &__head {
      font-family: montserratbold, sans-serif;
      font-size: 22px;
      letter-spacing: 0.44px;
      color: #000000;
      text-transform: uppercase;
    }
    &__row {
      display: flex;
      flex-wrap: wrap;
      padding: 35px 0;
      border-bottom: 1px solid #E6E6E6;
    }
    &__radiobutton {
      margin-right: 32px;
      input[type=radio] {
        display: none;
      }
      label {
        display: inline-block;
        cursor: pointer;
        position: relative;
        margin-right: 0;
        width: 20px;
        height: 20px;
        border: 1px solid #3E3E3E;
        border-radius: 5px;
        padding: 3px;
      }
      label:before {
        content: "";
        display: inline-block;
        opacity: 0;
        position: absolute;
        left: 2px;
        bottom: 2px;
        width: 14px;
        height: 14px;
        background: #E6B510;
        border-radius: 5px;
        transition: 0.3s;
      }
      input[type=radio]:checked + label:before {
        opacity: 1;
      }
    }
    &__type {
      font-family: montserratlight, sans-serif;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.32px;
      color: #171717;
      width: 165px;
      margin-right: 30px;
    }
    &__card {
      margin-right: 25px;
    }
    &__form {
      flex: 100%;
    }
    &__form {
      padding-left: 52px;
    }
  }
  .add-input {
    &__name {
      font-family: montserratlight, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.14px;
      color: #171717;
      padding-top: 10px;
      padding-bottom: 7px;
      &:nth-child(2) {
        padding-left: 18px;
      }
    }
    input {
      border: 0.3px solid rgba(23, 23, 23, 0.41);
      border-radius: 30px;
      height: 40px;
      padding: 10px 35px 10px 15px;
      outline: none;
      background-color: transparent;
      font-family: montserratlight, sans-serif;
      font-size: 14px;
      font-weight: 700;
    }
    &__cardName {
      width: 363px;
    }
    &__cardNumber {
      width: 363px;
      background-image: url("../static/lock.svg");
      background-repeat: no-repeat;
      background-size: auto;
      background-position: 95% 12px;
    }
    &__cardDate {
      margin-right: 20px;
    }
    &__cardCode {
      margin-left: 20px;
      background-image: url("../static/lock.svg");
      background-repeat: no-repeat;
      background-size: auto;
      background-position: 90% 12px;
    }
    &__flexbox {
      display: flex;
      flex-wrap: wrap;
      width: 363px;
      p {
        flex: 50%;
      }
      input {
        flex: calc(50% - 20px);
        max-width: 160px;
      }
    }
    &__checkbox {
      display: flex;
      align-items: center;
      font-family: montserratlight, sans-serif;
      font-size: 10px;
      letter-spacing: 0.2px;
      color: #303030;
      margin-top: 13px;
      input[type=checkbox] {
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
        opacity: 0;
        position: absolute;
        top: 2px;
        bottom: 2px;
        right: 2px;
        left: 2px;
        border: 1px solid #E6B510;
        border-radius: 50px;
        transition: 0.3s;
      }
      input[type=checkbox]:checked + label:before {
        opacity: 1;
      }
    }
  }
  .address-info {
    display: flex;
    flex-wrap: wrap;
    margin-top: 87px;
    &__content {
      display: flex;
      flex: 100%;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.32px;
      color: #171717;
      margin-bottom: 10px;
    }
    &__delete {
      max-width: 200px;
      margin-left: 90px;
    }
    &__add {
      flex: 100%;
      display: flex;
      align-items: center;
      text-decoration: underline;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.32px;
      color: #171717;
      margin-top: 35px;
      margin-bottom: 32px;
      cursor: pointer;
      img {
        margin-right: 32px;
        border-radius: 50px;
      }
    }
  }
  .purchase-history {
    font-family: montserratlight, sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.28px;
    color: #171717;
    &__none {
      margin-top: 20px;
    }
  }
  .table-head {
    display: flex;
    margin-top: 40px;
    position: relative;
    margin-bottom: 36px;
    align-items: center;
    &__quantity {
      display: flex;
      align-items: center;
    }
    &__search {
      margin-left: auto;
      position: relative;
      svg {
        position: absolute;
        right: 22px;
        top: 9px;
      }
      input {
        width: 315px;
        height: 34px;
        background-color: #ECECEC;
        border-radius: 5px;
        padding: 8px 15px;
        border: none;
        outline: none;
        font-family: montserratlight, sans-serif;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.28px;
      }
    }
  }
  .table-footer {
    &__pagination {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
  }
  .head-row {
    display: flex;
    padding: 13px 0;
    border-bottom: 2px solid #303030;
    &__item {
      display: flex;
      width: 360px;
      &:first-child {
        width: 150px;
        padding-left: 30px;
      }
    }
  }
  .footer-row {
    border-top: 2px solid #303030;
    border-bottom: transparent;
  }
  .body-row {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid rgba(48, 48, 48, 0.41);
    &__item {
      display: flex;
      width: 360px;
      &:first-child {
        width: 150px;
        padding-left: 30px;
      }
    }
  }
  .table-arrows {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 12px;
    svg {
      flex: 100%;
      &:first-child {
        margin-top: 3px;
      }
      &:last-child {
        margin-bottom: 3px;
      }
    }
  }
  .table-pagination {
    &__item {
      padding: 4px 15px;
      transition: 0.3s;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #E6B510;
      }
    }
    &__arrow {
      cursor: pointer;
      &:first-child {
        padding-right: 50px;
      }
      &:last-child {
        padding-left: 50px;
      }
    }
  }
  .quantity-menu {
    background: #ECECEC;
    border-radius: 5px;
    margin: 0 20px;
    padding: 8px 11px;
    display: flex;
    align-items: center;
    svg {
      margin-left: 18px;
    }
  }
  .table-dropdown {
    padding: 23px 140px 37px 150px;
    background: #F1F2F3;
    border-bottom: 1px solid rgba(48, 48, 48, 0.41);
    &__row {
      display: flex;
      padding-bottom: 15px;
      &:last-child {
        padding-top: 50px;
        padding-bottom: 0;
      }
    }
    &__left-head {
      width: 127px;
      margin-right: 47px;
      text-transform: uppercase;
    }
  }
  .text-bold {
    font-family: montserratbold, sans-serif;
  }
  .text-yellow {
    color: #E6B510;
  }
  .pass-mismatch {
    color: red;
    font-weight: 100;
    font-size: 12px;
    margin-bottom: 15px;
  }
  .successful-reset-pass {
    flex: 100%;
    font-size: 12px;
    letter-spacing: 0.1px;
    color: #34A853;
    margin-top: 1px;
    margin-bottom: 1px;
  }
  @import "~@/assets/scss/media";
</style>
