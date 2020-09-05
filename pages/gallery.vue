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
          {{ loggedUser }}
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
    <div class="news-content">
      <div class="gallery-head">
        GALLERY
      </div>
      <div class="container">
        <div class="gallery-content">
          <div class="gallery-content__head">
            <div class="gallery-content__nav news-content__menu news-nav">
              <div
                class="news-nav__item"
                :class="{'news-nav__active': events}"
                @click="eventsActive"
              >
                Events
              </div>
              <div
                :class="{'news-nav__active': production}"
                class="news-nav__item"
                @click="productionActive"
              >
                Production
              </div>
              <div
                class="news-nav__item"
                :class="{'news-nav__active': lifeStyle}"
                @click="lifeStyleActive"
              >
                Lifestyle
              </div>
              <div
                class="news-nav__item"
                @click="sortNews('date')"
              >
                Date
                <svg xmlns="http://www.w3.org/2000/svg" width="12.318" height="15.568" viewBox="0 0 12.318 15.568"><defs><style>.a{fill:#787878;}</style></defs><path class="a" d="M65.231,9.176l-5.284,5.285V.324a.324.324,0,0,0-.649,0V14.461L54.014,9.176a.324.324,0,0,0-.459.459l5.838,5.838a.324.324,0,0,0,.459,0h0l5.838-5.838a.324.324,0,0,0-.459-.459Z" transform="translate(-53.463)" /><path class="a" d="M59.6,305.29a.324.324,0,0,1-.23-.095l-5.838-5.838a.324.324,0,0,1,.459-.459l5.609,5.608L65.21,298.9a.324.324,0,0,1,.459.459L59.83,305.2A.324.324,0,0,1,59.6,305.29Z" transform="translate(-53.443 -289.722)" /><path class="a" d="M245.646,15.568a.324.324,0,0,1-.324-.324V.324a.324.324,0,0,1,.649,0V15.243A.324.324,0,0,1,245.646,15.568Z" transform="translate(-239.488)" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="12.325" height="15.568" viewBox="0 0 12.325 15.568"><defs><style>.a{fill:#303030;}</style></defs><g transform="translate(0.001)"><path class="a" d="M59.722.1a.324.324,0,0,0-.459,0h0L53.425,5.936a.324.324,0,0,0,.459.459L59.168,1.11V15.246a.324.324,0,0,0,.649,0V1.11L65.1,6.394a.324.324,0,0,0,.467-.451l-.008-.008Z" transform="translate(-53.334 -0.002)" /><path class="a" d="M65.351,6.5a.324.324,0,0,1-.23-.095L59.513.8,53.9,6.405a.324.324,0,0,1-.459-.459L59.284.109a.324.324,0,0,1,.459,0l5.838,5.838a.324.324,0,0,1-.23.553Z" transform="translate(-53.355 -0.014)" /><path class="a" d="M245.537,15.568a.324.324,0,0,1-.324-.324V.324a.324.324,0,0,1,.649,0V15.243A.324.324,0,0,1,245.537,15.568Z" transform="translate(-239.379)" /></g></svg>
              </div>
            </div>
            <div class="feed__search">
              <input
                v-model="searchValue"
                type="search"
                placeholder="Search..."
                @keyup.enter="sendSearchValue"
              >
              <button @click="sendSearchValue" />
            </div>
          </div>
          <div
            v-if="showSearchResult"
            class="news-content__search-results"
          >
            Results for your query {{ '"' + searchValue +'"' }}
          </div>
          <div v-if="events">
            <div v-for="(item, itemIndex) in albums" :key="itemIndex">
              <div v-if="item[0].rubric === 'events'">
                <div v-if="item.length >= 6">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-first">
                      <div class="gallery-first__flexbox">
                        <div class="gallery-first-flexbox__block">
                          <img :src="item[0].image">
                          <img :src="item[1].image">
                        </div>
                        <div class="gallery-first-flexbox__block gallery-sign">
                          <img :src="item[2].image">
                          <div class="gallery-sign__content">
                            <div class="gallery-sign__head">
                              {{ item[0].album_name }}
                            </div>
                            <div
                              class="gallery-sign__more"
                            >
                              More photos
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                <defs>
                                  <clipPath id="clip-Web_1920_468">
                                    <rect width="16" height="12.52" />
                                  </clipPath>
                                </defs>
                                <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                  <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                    <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                      <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                    <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                      <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="gallery-first__flexbox">
                        <div class="gallery-first-flexbox__block gallery-first__last-row">
                          <img :src="item[3].image">
                          <img :src="item[4].image">
                          <img :src="item[5].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length < 3">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-second">
                      <img :src="item[0].image">
                      <div class="gallery-sign__content">
                        <div class="gallery-sign__head">
                          {{ item[0].album_name }}
                        </div>
                        <div
                          class="gallery-sign__more"
                        >
                          More photos
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                            <defs>
                              <clipPath id="clip-Web_1920_468">
                                <rect width="16" height="12.52" />
                              </clipPath>
                            </defs>
                            <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                              <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                  <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                </g>
                                <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                  <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length === 5">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-third">
                      <div class="gallery-third__flexbox">
                        <div class="gallery-third-flexbox__block">
                          <div class="gallery-third__flexbox small-photos">
                            <img :src="item[0].image">
                            <img :src="item[1].image">
                          </div>
                          <div class="gallery-sign">
                            <img :src="item[2].image">
                            <div class="gallery-sign__content">
                              <div class="gallery-sign__head">
                                {{ item[0].album_name }}
                              </div>
                              <div
                                class="gallery-sign__more"
                              >
                                More photos
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                  <defs>
                                    <clipPath id="clip-Web_1920_468">
                                      <rect width="16" height="12.52" />
                                    </clipPath>
                                  </defs>
                                  <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                    <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                      <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                        <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                      </g>
                                      <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                        <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="gallery-third-flexbox__block long-photos">
                          <img :src="item[3].image">
                          <img :src="item[4].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length >= 3 && item.length < 5">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-fourth">
                      <div class="gallery-fourth__flexbox">
                        <div class="gallery-fourth-flexbox__block gallery-sign">
                          <img :src="item[0].image">
                          <div class="gallery-sign__content">
                            <div class="gallery-sign__head">
                              {{ item[0].album_name }}
                            </div>
                            <div
                              class="gallery-sign__more"
                            >
                              More photos
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                <defs>
                                  <clipPath id="clip-Web_1920_468">
                                    <rect width="16" height="12.52" />
                                  </clipPath>
                                </defs>
                                <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                  <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                    <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                      <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                    <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                      <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div class="gallery-fourth-flexbox__block">
                          <img :src="item[1].image">
                          <img :src="item[2].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="production">
            <div v-for="(item, itemIndex) in albums" :key="itemIndex">
              <div v-if="item[0].rubric === 'production'">
                <div v-if="item.length >= 6">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-first">
                      <div class="gallery-first__flexbox">
                        <div class="gallery-first-flexbox__block">
                          <img :src="item[0].image">
                          <img :src="item[1].image">
                        </div>
                        <div class="gallery-first-flexbox__block gallery-sign">
                          <img :src="item[2].image">
                          <div class="gallery-sign__content">
                            <div class="gallery-sign__head">
                              {{ item[0].album_name }}
                            </div>
                            <div
                              class="gallery-sign__more"
                            >
                              More photos
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                <defs>
                                  <clipPath id="clip-Web_1920_468">
                                    <rect width="16" height="12.52" />
                                  </clipPath>
                                </defs>
                                <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                  <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                    <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                      <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                    <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                      <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="gallery-first__flexbox">
                        <div class="gallery-first-flexbox__block gallery-first__last-row">
                          <img :src="item[3].image">
                          <img :src="item[4].image">
                          <img :src="item[5].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length < 3">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-second">
                      <img :src="item[0].image">
                      <div class="gallery-sign__content">
                        <div class="gallery-sign__head">
                          {{ item[0].album_name }}
                        </div>
                        <div
                          class="gallery-sign__more"
                        >
                          More photos
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                            <defs>
                              <clipPath id="clip-Web_1920_468">
                                <rect width="16" height="12.52" />
                              </clipPath>
                            </defs>
                            <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                              <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                  <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                </g>
                                <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                  <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length === 5">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-third">
                      <div class="gallery-third__flexbox">
                        <div class="gallery-third-flexbox__block">
                          <div class="gallery-third__flexbox small-photos">
                            <img :src="item[0].image">
                            <img :src="item[1].image">
                          </div>
                          <div class="gallery-sign">
                            <img :src="item[2].image">
                            <div class="gallery-sign__content">
                              <div class="gallery-sign__head">
                                {{ item[0].album_name }}
                              </div>
                              <div
                                class="gallery-sign__more"
                              >
                                More photos
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                  <defs>
                                    <clipPath id="clip-Web_1920_468">
                                      <rect width="16" height="12.52" />
                                    </clipPath>
                                  </defs>
                                  <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                    <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                      <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                        <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                      </g>
                                      <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                        <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="gallery-third-flexbox__block long-photos">
                          <img :src="item[3].image">
                          <img :src="item[4].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length >= 3 && item.length < 5">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-fourth">
                      <div class="gallery-fourth__flexbox">
                        <div class="gallery-fourth-flexbox__block gallery-sign">
                          <img :src="item[0].image">
                          <div class="gallery-sign__content">
                            <div class="gallery-sign__head">
                              {{ item[0].album_name }}
                            </div>
                            <div
                              class="gallery-sign__more"
                            >
                              More photos
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                <defs>
                                  <clipPath id="clip-Web_1920_468">
                                    <rect width="16" height="12.52" />
                                  </clipPath>
                                </defs>
                                <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                  <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                    <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                      <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                    <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                      <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div class="gallery-fourth-flexbox__block">
                          <img :src="item[1].image">
                          <img :src="item[2].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="lifeStyle">
            <div v-for="(item, itemIndex) in albums" :key="itemIndex">
              <div v-if="item[0].rubric === 'lifestyle'">
                <div v-if="item.length >= 6">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-first">
                      <div class="gallery-first__flexbox">
                        <div class="gallery-first-flexbox__block">
                          <img :src="item[0].image">
                          <img :src="item[1].image">
                        </div>
                        <div class="gallery-first-flexbox__block gallery-sign">
                          <img :src="item[2].image">
                          <div class="gallery-sign__content">
                            <div class="gallery-sign__head">
                              {{ item[0].album_name }}
                            </div>
                            <div
                              class="gallery-sign__more"
                            >
                              More photos
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                <defs>
                                  <clipPath id="clip-Web_1920_468">
                                    <rect width="16" height="12.52" />
                                  </clipPath>
                                </defs>
                                <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                  <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                    <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                      <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                    <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                      <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="gallery-first__flexbox">
                        <div class="gallery-first-flexbox__block gallery-first__last-row">
                          <img :src="item[3].image">
                          <img :src="item[4].image">
                          <img :src="item[5].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length < 3">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-second">
                      <img :src="item[0].image">
                      <div class="gallery-sign__content">
                        <div class="gallery-sign__head">
                          {{ item[0].album_name }}
                        </div>
                        <div
                          class="gallery-sign__more"
                        >
                          More photos
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                            <defs>
                              <clipPath id="clip-Web_1920_468">
                                <rect width="16" height="12.52" />
                              </clipPath>
                            </defs>
                            <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                              <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                  <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                </g>
                                <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                  <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length === 5">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-third">
                      <div class="gallery-third__flexbox">
                        <div class="gallery-third-flexbox__block">
                          <div class="gallery-third__flexbox small-photos">
                            <img :src="item[0].image">
                            <img :src="item[1].image">
                          </div>
                          <div class="gallery-sign">
                            <img :src="item[2].image">
                            <div class="gallery-sign__content">
                              <div class="gallery-sign__head">
                                {{ item[0].album_name }}
                              </div>
                              <div
                                class="gallery-sign__more"
                              >
                                More photos
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                  <defs>
                                    <clipPath id="clip-Web_1920_468">
                                      <rect width="16" height="12.52" />
                                    </clipPath>
                                  </defs>
                                  <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                    <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                      <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                        <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                      </g>
                                      <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                        <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="gallery-third-flexbox__block long-photos">
                          <img :src="item[3].image">
                          <img :src="item[4].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.length >= 3 && item.length < 5">
                  <div
                    class="gallery-content__body gallery-item"
                    @click="showGalleryWindow(itemIndex)"
                  >
                    <div class="gallery-item__first gallery-fourth">
                      <div class="gallery-fourth__flexbox">
                        <div class="gallery-fourth-flexbox__block gallery-sign">
                          <img :src="item[1].image">
                          <div class="gallery-sign__content">
                            <div class="gallery-sign__head">
                              {{ item[0].album_name }}
                            </div>
                            <div
                              class="gallery-sign__more"
                            >
                              More photos
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="12.52" viewBox="0 0 16 12.52">
                                <defs>
                                  <clipPath id="clip-Web_1920_468">
                                    <rect width="16" height="12.52" />
                                  </clipPath>
                                </defs>
                                <g id="Web_1920_468" data-name="Web 1920 – 468" clip-path="url(#clip-Web_1920_468)">
                                  <g id="Сгруппировать_4188" data-name="Сгруппировать 4188" transform="translate(4.649 0.001)">
                                    <g id="ic_arrow_drop_down_36px" transform="translate(1.615 -0.001) rotate(90)">
                                      <path id="Контур_456" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                    <g id="ic_arrow_drop_down_36px-2" data-name="ic_arrow_drop_down_36px" transform="translate(4.906 12.523) rotate(-90)">
                                      <path id="Контур_456-2" data-name="Контур 456" d="M0,0,6.262,6.264,12.523,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div class="gallery-fourth-flexbox__block">
                          <img :src="item[2].image">
                          <img :src="item[3].image">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="news-content__feeds feed">
          <div class="feed__social">
            <div class="feed__head">
              Follow Us
            </div>
            <a
              href="https://www.facebook.com/pg/Baikal-Mining-Company-102531598212684/posts/?ref=page_internal"
              target="_blank"
              class="feed__icon"
            >
              <img src="../static/soc-4.svg">
            </a>
            <a
              href="https://t.me/BMC_chat"
              target="_blank"
              class="feed__icon"
            >
              <img src="../static/soc-3.svg">
            </a>
            <a
              href="https://www.instagram.com/bmcirk/"
              target="_blank"
              class="feed__icon"
            >
              <img src="../static/soc-2.svg">
            </a>
            <a
              href="https://www.youtube.com/channel/UCIUrtrAOxnFlSaVCPF3vdhQ/?guided_help_flow=5"
              target="_blank"
              class="feed__icon"
            >
              <img src="../static/soc-1.svg">
            </a>
          </div>
          <div class="feed__subscription">
            <div class="feed__head">
              SUBSCRIBE TO OUR NEWSLETTER
            </div>
            <div class="feed__form">
              <input type="email" placeholder="Email">
              <button>Submit</button>
            </div>
          </div>
          <div class="feed__head">
            Instagram Feed
          </div>
          <div class="feed__instagram">
            <div
              v-for="(inst, instIndex) in instArr"
              :key="instIndex"
              class="feed__item"
            >
              <img :src="inst">
            </div>
          </div>
          <div class="feed__head">
            Recommended post:
          </div>
          <div
            v-for="(item, itemIndex) in arrNews"
            :key="itemIndex"
            class="feed__recommended recommended"
          >
            <a
              v-if="item.recommend"
              :href="'news/'+(parseInt(item.id))"
              target="_blank"
              class="recommended__item"
            >
              <div class="recommended__img">
                <img :src="item.image">
              </div>
              <div class="recommended__content">
                <p class="recommended__text">
                  {{ item.title }}
                </p>
                <p class="recommended__date">
                  {{ item.date }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <main-footer />
    <transition name="fade">
      <div
        v-if="showGallery"
        class="gallery-modal"
      >
        <div
          class="gallery-modal__content"
        >
          <img
            class="gallery-modal__close"
            src="../static/close.svg"
            @click="showGallery = false"
          >
          <div class="gallery-modal__topic">
            {{ modalTopic }}
          </div>
          <div class="gallery-modal__head">
            {{ modalHead }}
          </div>
          <div class="gallery-modal__flexbox">
            <div class="gallery-modal__main-photo">
              <div
                class="gallery-modal__prev"
                @click="prevArrow(activePhoto)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="42" viewBox="0 0 42 42">
                  <defs>
                    <clipPath id="clip-Web_1920_467">
                      <rect width="42" height="42" />
                    </clipPath>
                  </defs>
                  <g id="Web_1920_467" data-name="Web 1920 – 467" clip-path="url(#clip-Web_1920_467)">
                    <g id="Сгруппировать_4186" data-name="Сгруппировать 4186">
                      <g id="ic_arrow_drop_down_36px" transform="translate(25.562 8.506) rotate(90)">
                        <path id="Контур_456" data-name="Контур 456" d="M0,0,12.569,12.571,25.138,0Z" fill="#ebebeb" />
                      </g>
                      <g id="Сгруппировать_4185" data-name="Сгруппировать 4185" transform="translate(0 0)">
                        <g id="Эллипс_41" data-name="Эллипс 41" fill="none" stroke="#fff" stroke-width="1">
                          <circle cx="21" cy="21" r="21" stroke="none" />
                          <circle cx="21" cy="21" r="20.5" fill="none" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <img :src="activePhoto.image">
              <div
                class="gallery-modal__next"
                @click="nextArrow(activePhoto)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="42" viewBox="0 0 42 42">
                  <defs>
                    <clipPath id="clip-Web_1920_469">
                      <rect width="42" height="42" />
                    </clipPath>
                  </defs>
                  <g id="Web_1920_469" data-name="Web 1920 – 469" clip-path="url(#clip-Web_1920_469)">
                    <g id="Сгруппировать_4186" data-name="Сгруппировать 4186" transform="translate(0 0)">
                      <g id="ic_arrow_drop_down_36px" transform="translate(29.009 8.506) rotate(90)">
                        <path id="Контур_456" data-name="Контур 456" d="M0,12.571,12.569,0,25.138,12.571Z" fill="#ebebeb" />
                      </g>
                      <g id="Сгруппировать_4185" data-name="Сгруппировать 4185">
                        <g id="Эллипс_41" data-name="Эллипс 41" fill="none" stroke="#fff" stroke-width="1">
                          <circle cx="21" cy="21" r="21" stroke="none" />
                          <circle cx="21" cy="21" r="20.5" fill="none" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div class="gallery-modal__slider">
              <vuescroll :ops="ops">
                <div
                  v-for="(item, itemIndex) in modalItems"
                  :key="itemIndex"
                  class="gallery-modal__item"
                >
                  <img
                    :src="item.image"
                    @click="changePhoto(item, itemIndex)"
                  >
                </div>
              </vuescroll>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
import axios from 'axios'
import vuescroll from 'vuescroll'
import mainFooter from '~/components/footer.vue'
import aboutHead from '~/components/about.vue'
import windowScrollPosition from '~/plugins/window-scroll-position'

export default {
  components: {
    mainFooter,
    aboutHead,
    vuescroll
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
      newsActive: false,
      events: true,
      production: false,
      lifeStyle: false,
      showGallery: false,
      showSearchResult: false,
      activePhoto:
      {
        id: '1',
        image: require('@/static/news-1.svg')
      },
      searchValue: '',
      sortValue: { value: '', type: 'asc' },
      modalTopic: '',
      modalHead: '',
      arrNews: [],
      teachTalkArr: [],
      lifeStyleArr: [],
      instArr: [],
      albumFirst: [],
      albumSecond: [],
      albumThird: [],
      albumFourth: [],
      albumFifth: [],
      albumSixth: [],
      albums: [],
      activeModalContent: [],
      ops: {
        onlyShowBarOnScroll: false,
        opacity: 1
      },
      modalItems: [],
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
    axios.get('https://core.bmc.ai/gallery/get', {
    })
      .then((data) => {
        this.albums = data.data
      })
    axios.get('https://core.bmc.ai/countries')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.countries.push(response.data[i])
        }
      })
    axios.get('https://core.bmc.ai/news/get', {
    })
      .then((data) => {
        console.log(data)
        this.arrNews = data.data.lifestyle.concat(data.data.techtalk)
      })
  },
  methods: {
    eventsActive () {
      this.events = true
      this.production = false
      this.lifeStyle = false
    },
    productionActive () {
      this.events = false
      this.production = true
      this.lifeStyle = false
    },
    lifeStyleActive () {
      this.events = false
      this.production = false
      this.lifeStyle = true
    },
    changePhoto (a, b) {
      this.activePhoto = {
        id: b,
        image: a.image
      }
    },
    prevArrow (p) {
      if (p.id >= 1) {
        this.activePhoto = {
          id: p.id - 1,
          image: this.modalItems[p.id - 1].image
        }
      }
    },
    nextArrow (p) {
      if (p.id < this.modalItems.length - 1) {
        this.activePhoto = {
          id: p.id + 1,
          image: this.modalItems[p.id + 1].image
        }
      }
    },
    sortNews (val) {
      if (val === this.sortValue.value) {
        this.sortValue.type === 'asc' ? this.sortValue.type = 'desc' : this.sortValue.type = 'asc'
      } else {
        this.sortValue.type = 'asc'
      }
      this.sortValue.value = val
      axios.get('https://core.bmc.ai/gallery/get?date=' + this.sortValue.type, {
      })
        .then((data) => {
          this.albums = data.data
          console.log(this.albums)
        })
    },
    showGalleryWindow (albumIndex) {
      this.modalItems = this.albums[albumIndex]
      this.activePhoto = {
        id: 0,
        image: this.albums[albumIndex][0].image
      }
      this.showGallery = true
      this.modalTopic = this.albums[albumIndex][0].rubric
      this.modalHead = this.albums[albumIndex][0].album_name
    },
    closeModal () {
      this.signIn = false
      this.showCreateAcc = false
      this.resetPass = false
      this.topicCountry = false
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
    sendSearchValue () {
      axios.get('https://core.bmc.ai/gallery/search?value=' + this.searchValue)
        .then((response) => {
          const arr = Object.values(response.data)
          const newAr = new Object()
          const eacher = (val) => {
            if (!newAr[val.album_id] && val.album_id !== undefined) { newAr[val.album_id] = [] }
            newAr[val.album_id].push(val)
          }
          arr.forEach(eacher)
          this.albums = newAr
          this.showSearchResult = true
        })
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
  .gallery-head {
    text-align: center;
    font-family: montserratbold, sans-serif;
    font-size: 66px;
    color: #787878;
    text-transform: uppercase;
    padding: 87px 0 42px;
  }
  .gallery-content {
    &__head {
      display: flex;
    }
  }
  .news-banner {
    background-image: url("../static/news-banner.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center top;
    padding-top: 171px;
    height: 975px;
    background-color: #F7F7F7;
    .container {
      padding-top: 112px;
    }
    &__head {
      font-family: montserratlight, sans-serif;
      font-size: 66px;
      line-height: 70px;
      color: #303030;
      text-transform: uppercase;
    }
    &__bold {
      font-family: montserratblack, sans-serif;
    }
  }
  .news {
    &-content {
      padding-bottom: 200px;
      background: #F7F7F7;
      padding-top: 112px;
      &__items {
        width: 100%;
        position: relative;
        @media (min-width: 1501px) {
          min-width: 905px;
        }
        &:before {
          content: '';
          position: absolute;
          left: -50px;
          top: -170px;
          width: 1px;
          bottom: -120px;
          background: rgba(178, 178, 178, 0.65);
          z-index: 0;
        }
      }
      &__feeds {
        margin-left: 80px;
        margin-top: 0!important;
        @media (max-width: 1500px) {
          margin-left: 30px;
        }
      }
      .container {
        display: flex;
        @media (max-width: 1300px) {
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      &__item {
        margin-top: 95px;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          background-color: #fafafa;
          left: -61px;
          top: 10px;
          border-radius: 10px;
          opacity: 1;
          box-shadow: -2px 0px 1px #FFFFFF, 2px 3px 9px -5px rgba(62, 62, 62, 0.9);
          transition: 0.4s;
        }
      }
    }
  }
  .news-nav {
    display: flex;
    margin-right: 40px;
    &__item {
      font-family: montserratlight, sans-serif;
      font-size: 22px;
      line-height: 45px;
      letter-spacing: 0.22px;
      color: #171717;
      margin-right: 60px;
      position: relative;
      cursor: pointer;
      white-space: nowrap;
      svg {
        margin-left: 20px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 12px;
        width: 0;
        height: 1px;
        background-color: #171717;
        transition: 0.3s;
      }
      &:hover {
        &:before {
          width: 100%;
        }
      }
    }
    &__active {
      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 12px;
        width: 100%;
        height: 1px;
        background-color: #171717;
      }
    }
  }
  .news-item {
    &__head {
      font-family: montserratblack, sans-serif;
      font-size: 40px;
      line-height: 45px;
      color: #303030;
    }
    &__img {
      img {
        width: 100%;
      }
    }
    &__text {
      font-family: montserratlight, sans-serif;
      font-size: 22px;
      line-height: 27px;
      letter-spacing: 0.22px;
      color: #171717;
      margin-top: 32px;
      a {
        color: #1877F2;
        text-decoration: none;
      }
    }
    &__buttons {
      display: flex;
      justify-content: stretch;
      align-items: flex-end;
      margin-top: 35px;
    }
    &__btn {
      font-family: montserrat, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 30px;
      border: 1px solid #E6B510;
      border-radius: 30px;
      text-decoration: none;
      color: #3E3E3E;
      letter-spacing: 0.3px;
      font-size: 15px;
      max-width: 185px;
      width: 100%;
      text-transform: uppercase;
      white-space: nowrap;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        background-color: #E6B510;
        color: white;
      }
    }
    &__hideBtn {
      font-family: montserrat, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 30px;
      border: 1px solid #303030;
      background-color: #303030;
      border-radius: 30px;
      text-decoration: none;
      color: white;
      letter-spacing: 0.3px;
      font-size: 15px;
      max-width: 185px;
      width: 100%;
      text-transform: uppercase;
      white-space: nowrap;
      transition: 0.4s;
      cursor: pointer;
    }
    &__date {
      display: flex;
      justify-content: stretch;
      font-family: Roboto,sans-serif;
      font-size: 18px;
      color: #3E3E3E;
      margin: 24px 0;
    }
  }
  .icon {
    display: flex;
    margin-left: auto;
    &__item {
      font-family: Roboto,sans-serif;
      font-size: 18px;
      color: #A2A2A2;
      display: flex;
      align-items: center;
      margin-left: 45px;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        filter: brightness(0.5);
      }
      img {
        margin-right: 10px;
      }
    }
  }
  .social-btns {
    display: flex;
    margin-left: auto;
    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      width: 100px;
      height: 35px;
      border-radius: 21px;
      font-family: montserratlight, sans-serif;
      font-size: 12px;
      letter-spacing: 0.12px;
      transition: 0.3s;
      margin-left: 30px;
      img {
        margin-right: 5px;
      }
    }
  }
  .btn-like {
    border: 1px solid #E6B510;
    color: #E6B510;
    &:hover {
      background-color: #E6B510;
      color: white;
      img {
        filter: saturate(0.1) grayscale(0.1) sepia(1) brightness(1) contrast(100);
      }
    }
  }
  .btn-facebook {
    border: 1px solid #1877F2;
    color: #1877F2;
    &:hover {
      background-color: #1877F2;
      color: white;
      img {
        filter: saturate(0.9) brightness(0) invert(1)
      }
    }
  }
  .btn-twitter {
    border: 1px solid #41ABE1;
    color: #41ABE1;
    &:hover {
      background-color: #41ABE1;
      color: white;
      img {
        filter: saturate(0.9) brightness(0) invert(1)
      }
    }
  }
  .btn-linkedin {
    border: 1px solid #0A66C2;
    color: #0A66C2;
    &:hover {
      background-color: #0A66C2;
      color: white;
      img {
        filter: saturate(0.9) brightness(0) invert(1)
      }
    }
  }
  .feed {
    &__social {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 74px;
    }
    &__subscription {
      margin-bottom: 74px;
    }
    &__form {
      display: flex;
      @media (max-width: 500px) {
        flex-wrap: wrap;
      }
      input {
        @media (max-width: 500px) {
          margin-right: 0!important;
        }
      }
    }
    &__head {
      font-family: robotolight,sans-serif;
      font-size: 18px;
      color: #3E3E3E;
      text-transform: uppercase;
      flex: 100%;
      margin-bottom: 20px;
    }
    &__icon {
      margin-right: 30px;
      transition: 0.3s;
      &:hover {
        filter: brightness(0.8);
      }
    }
    &__form {
      input {
        background: #ECECEC;
        border-radius: 2px;
        padding: 11px 18px;
        border: none;
        outline: none;
        width: 279px;
        font-family: montserratlight, sans-serif;
        font-size: 16px;
        letter-spacing: 0.16px;
        color: #303030;
        margin-right: 6px;
      }
      button {
        background: #303030;
        border-radius: 2px;
        padding: 11px 14px;
        font-family: montserratlight,sans-serif;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.3px;
        color: #FFFFFF;
        border: none;
        outline: none;
        margin-left: 1px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background: rgba(48, 48, 48, 0.85);
        }
      }
    }
    &__instagram {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 74px;
    }
    &__item {
      flex: calc(50% - 13px);
      width: 179px;
      height: 179px;
      margin-bottom: 10px;
      &:nth-child(1) {
        margin-right: 13px;
      }
      &:last-child {
        margin-left: 13px;
      }
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    &__search {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-top: 0!important;
      input {
        background: #ECECEC;
        border-radius: 2px;
        width: 318px;
        padding: 11px 18px;
        border: none;
        outline: none;
        font-family: montserratlight, sans-serif;
        font-size: 16px;
        letter-spacing: 0.16px;
        color: #303030;
      }
      button {
        width: 48px;
        height: 40px;
        padding: 9px 12px;
        background: #303030;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        background-position-y: center;
        background-position-x: center;
        margin-left: 5px;
        background-image: url("../static/search-icon.svg");
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-color: rgba(48, 48, 48, 0.85);
        }
      }
    }
  }
  .recommended {
    a {
      text-decoration: none;
    }
    &__item {
      display: flex;
      margin-bottom: 38px;
      cursor: pointer;
    }
    &__img {
      width: 111px;
      min-width: 111px;
      height: 111px;
      flex: 27%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__content {
      flex: 73%;
      display: flex;
      flex-wrap: wrap;
      margin-left: 16px;
      p {
        flex: 100%;
        max-width: 224px;
      }
    }
    &__text {
      font-family: robotolight, sans-serif;
      font-size: 18px;
      line-height: 22px;
      color: #3E3E3E;
    }
    &__date {
      font-family: robotolight, sans-serif;
      font-size: 14px;
      line-height: 22px;
      color: #787878;
      display: flex;
      align-items: flex-end;
    }
  }
  .active-news {
    &:before {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      background-color: #E6B510;
      left: -61px;
      top: 10px;
      border-radius: 10px;
      opacity: 1;
      box-shadow: -2px 0px 1px #FFFFFF, 2px 3px 9px -5px #e6b510;
    }
  }
  .container {
    @media (min-width: 1751px) {
      max-width: 1660px!important;
    }
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .gallery-content {
    max-width: 1085px;
  }
  .gallery-item {
    padding: 42px 0;
    border-bottom: 1px solid #707070;
    img {
      cursor: pointer;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .gallery-first {
    &__flexbox {
      display: flex;
      &:last-child {
        margin-top: 32px;
      }
    }
    &__last-row {
      img {
        margin-right: 32px;
        margin-bottom: 0!important;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &-flexbox__block {
      img {
        max-width: 714px;
        height: 100%;
        object-fit: cover;
        max-height: 481px;
        width: 100%;
      }
      &:first-child {
        max-width: 339px;
        margin-right: 32px;
        img {
          width: 100%;
          height: 225px;
          object-fit: cover;
          &:first-child {
            margin-bottom: 32px;
          }
        }
      }
      &:last-child {
        display: flex;
        flex: 100%;
        img {
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .gallery-second {
    position: relative;
    img {
      width: 100%;
      height: 743px;
      object-fit: cover;
    }
  }
  .gallery-third {
    &__flexbox {
      display: flex;
    }
    &-flexbox__block {
      &:first-child {
        max-width: 711px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      &:last-child {
        max-width: 340px;
        img {
          width: 100%;
        }
      }
    }
    .gallery-sign {
      img {
        height: 481px;
        margin-top: 32px;
      }
    }
  }
  .gallery-fourth {
    &__flexbox {
      display: flex;
    }
    &__last-row {
      img {
        margin-right: 32px;
        margin-bottom: 0!important;
        &:first-child {
          margin-right: 0;
        }
      }
    }
    &-flexbox__block {
      img {
        max-width: 714px;
        width: 100%;
        max-height: 490px;
        object-fit: cover;
      }
      &:last-child {
        max-width: 339px;
        margin-left: 32px;
        img {
          width: 100%;
          height: 225px;
          object-fit: cover;
          &:first-child {
            margin-bottom: 32px;
          }
        }
      }
      &:first-child {
        display: flex;
        flex: 100%;
        img {
          &:first-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .small-photos {
    height: 226px;
    img {
      max-width: 340px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-right: 32px;
    }
  }
  .long-photos {
    margin-left: 32px;
    img {
      object-fit: cover;
      &:first-child {
        height: 483px;
      }
      &:last-child {
        margin-top: 27px;
        height: 223px;
      }
    }
  }
  .gallery-sign {
    position: relative;
    &__content {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #303030;
      opacity: 0.68;
      padding: 14px 28px;
      cursor: pointer;
    }
    &__head {
      font-family: montserratlight, sans-serif;
      font-size: 22px;
      letter-spacing: 0.22px;
      color: #FFFFFF;
    }
    &__more {
      font-family: robotolight, sans-serif;
      font-size: 18px;
      color: #FFFFFF;
      cursor: pointer;
      svg {
        &:first-child {
          margin-left: 7px;
        }
      }
    }
  }
  .gallery-modal {
    display: flex;
    z-index: 10;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    top: 40px;
    &__topic {
      text-decoration: underline;
      font-family: montserratlight, sans-serif;
      font-size: 22px;
      letter-spacing: 0.22px;
      color: #FFFFFF;
      margin-left: 55px;
    }
    &__head {
      font-family: montserratbold, sans-serif;
      font-size: 36px;
      color: #FFFFFF;
      text-transform: uppercase;
      margin: 12px 0 16px 55px;
    }
    &__content {
      width: 90%;
      height: 87%;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      background: rgba(48, 48, 48, 0.67);
      border-radius: 23px;
      padding: 36px 22px 21px;
      position: relative;
    }
    &__prev {
      position: absolute;
      left: -55px;
      cursor: pointer;
      @media (max-width: 600px) {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    &__next {
      position: absolute;
      right: -55px;
      cursor: pointer;
      @media (max-width: 600px) {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    &__close {
      position: absolute;
      right: 25px;
      top: 25px;
      filter: invert(1);
      cursor: pointer;
    }
    &__main-photo {
      width: 1270px;
      margin-left: 55px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 100%;
        max-width: 1274px;
        max-height: 870px;
        width: auto;
        @media (max-width: 1030px) {
          width: 100%;
          height: 100%;
        }
      }
    }
    &__slider {
      margin-left: 77px;
    }
    &__flexbox {
      display: flex;
      max-height: 85%;
    }
    &__item {
      width: 253px;
      height: 162px;
      margin-top: 16px;
      cursor: pointer;
      &:first-child {
        margin-top: 0;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .gallery-modal__slider {
    .__panel.__hidebar {
      @media (min-width: 1031px) {
        overflow: hidden!important;
      }
    }
    .__view {
      @media (min-width: 1031px) {
        padding-right: 25px!important;
      }
    }
    .__rail-is-vertical {
      background-color: rgba(255, 255, 255, 0.62) !important;
      width: 1px!important;
      right: 3px!important;
      @media (max-width: 1030px) {
        display: none;
      }
    }
    .__bar-is-vertical {
      background-color: #EBEBEB!important;
      opacity: 1!important;
      width: 7px!important;
      display: flex;
      align-items: center;
      margin-left: -3px!important;
    }
  }
  .feed {
    @media (max-width: 900px) {
      max-width: 323px!important;
    }
  }
  .news-content__search-results {
    font-family: montserratlight, sans-serif;
    font-size: 22px;
    line-height: 45px;
    letter-spacing: 0.22px;
    color: #171717;
    margin-top: 15px;
  }
  @import "~@/assets/scss/media";
</style>
