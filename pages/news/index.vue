<template>
  <div class="overflow-hidden">
    <about-head
      :class="{ 'header-scrolled' : position[1] > 0 }"
    />
    <div class="news-banner">
      <h1 class="news-banner__head">
        <div class="container">
          BMC<br> <span class="news-banner__bold">GLOBAL<br> NEWSROOM</span>
        </div>
      </h1>
    </div>
    <div class="news-content">
      <div class="container">
        <div
          class="news-content__items"
        >
          <div
            v-if="newsRubricsNav"
            class="news-content__menu news-nav"
          >
            <div
              class="news-nav__item"
              :class="{'news-nav__active': newsRubric}"
              @click="newsRubricActive"
            >
              News
            </div>
            <div
              class="news-nav__item"
              :class="{'news-nav__active': teachTalk}"
              @click="techTalkActive"
            >
              Tech Talk
            </div>
            <div
              class="news-nav__item"
              :class="{'news-nav__active': lifeStyle}"
              @click="lifeStyleActive"
            >
              Lifestyle
            </div>
          </div>
          <div
            v-else
            class="news-content__search-results"
          >
            Results for your query {{ '"' + searchValue +'"' }}
          </div>
          <div
            v-if="newsRubric"
          >
            <div
              v-for="(item, itemIndex) in arrNews"
              :key="itemIndex"
              :class="newsActive === itemIndex?'active-news':''"
              class="news-content__item news-item"
            >
              <div class="news-item__head">
                <div v-html="item.title" />
              </div>
              <div class="news-item__date">
                <div>{{ item.date }}</div>
                <div class="news-item__icons icon">
                  <div class="icon__item">
                    <img src="../../static/heart.svg">
                    {{ item.likes }}
                  </div>
                  <div class="icon__item">
                    <img src="../../static/eye.svg">
                    {{ item.views }}
                  </div>
                  <div class="icon__item">
                    <img src="../../static/share.svg">
                    {{ item.shared }}
                  </div>
                </div>
              </div>
              <div class="news-item__img">
                <img :src="item.image">
              </div>
              <div
                v-if="newsActive===itemIndex"
                class="news-item__text"
                v-html="item.body"
              />
              <div
                v-else
                class="news-item__text"
                v-html="item.body"
              />
              <div class="news-item__buttons">
                <a
                  v-if="newsActive===itemIndex"
                  class="news-item__hideBtn"
                  @click="newsActive= -1"
                >
                  hide
                </a>
                <a
                  v-else
                  class="news-item__btn"
                  @click="newsActive=itemIndex"
                >
                  details
                </a>
                <transition name="fade">
                  <div
                    v-if="newsActive===itemIndex"
                    class="social-btns"
                  >
                    <a
                      href="#"
                      class="social-btns__btn btn-like"
                    >
                      <img src="../../static/like.svg">
                      Like
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-facebook"
                    >
                      <img src="../../static/facebook2.svg">
                      Share
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-twitter"
                    >
                      <img src="../../static/twitter.svg">
                      Tweet
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-linkedin"
                    >
                      <img src="../../static/lnin.svg">
                      Share
                    </a>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div
            v-else-if="teachTalk"
          >
            <div
              v-for="(item, itemIndex) in teachTalkArr"
              :key="itemIndex"
              :class="newsActive === itemIndex?'active-news':''"
              class="news-content__item news-item"
            >
              <div class="news-item__head">
                <div v-html="item.title" />
              </div>
              <div class="news-item__date">
                <div>{{ item.date }}</div>
                <div class="news-item__icons icon">
                  <div class="icon__item">
                    <img src="../../static/heart.svg">
                    {{ item.likes }}
                  </div>
                  <div class="icon__item">
                    <img src="../../static/eye.svg">
                    {{ item.views }}
                  </div>
                  <div class="icon__item">
                    <img src="../../static/share.svg">
                    {{ item.shares }}
                  </div>
                </div>
              </div>
              <div class="news-item__img">
                <img :src="item.image">
              </div>
              <div
                v-if="newsActive===itemIndex"
                class="news-item__text"
                v-html="item.body"
              />
              <div
                v-else
                class="news-item__text"
                v-html="item.body"
              />
              <div class="news-item__buttons">
                <a
                  v-if="newsActive===itemIndex"
                  class="news-item__hideBtn"
                  @click="newsActive= -1"
                >
                  hide
                </a>
                <a
                  v-else
                  class="news-item__btn"
                  @click="newsActive=itemIndex"
                >
                  details
                </a>
                <transition name="fade">
                  <div
                    v-if="newsActive===itemIndex"
                    class="social-btns"
                  >
                    <a
                      href="#"
                      class="social-btns__btn btn-like"
                    >
                      <img src="../../static/like.svg">
                      Like
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-facebook"
                    >
                      <img src="../../static/facebook2.svg">
                      Share
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-twitter"
                    >
                      <img src="../../static/twitter.svg">
                      Tweet
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-linkedin"
                    >
                      <img src="../../static/lnin.svg">
                      Share
                    </a>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div
            v-else-if="lifeStyle"
          >
            <div
              v-for="(item, itemIndex) in lifeStyleArr"
              :key="itemIndex"
              :class="newsActive === itemIndex?'active-news':''"
              class="news-content__item news-item"
            >
              <div class="news-item__head">
                <div v-html="item.title" />
              </div>
              <div class="news-item__date">
                <div>{{ item.date }}</div>
                <div class="news-item__icons icon">
                  <div class="icon__item">
                    <img src="../../static/heart.svg">
                    {{ item.likes }}
                  </div>
                  <div class="icon__item">
                    <img src="../../static/eye.svg">
                    {{ item.views }}
                  </div>
                  <div class="icon__item">
                    <img src="../../static/share.svg">
                    {{ item.shares }}
                  </div>
                </div>
              </div>
              <div class="news-item__img">
                <img :src="item.image">
              </div>
              <div
                v-if="newsActive===itemIndex"
                class="news-item__text"
                v-html="item.body"
              />
              <div
                v-else
                class="news-item__text"
                v-html="item.body"
              />
              <div class="news-item__buttons">
                <a
                  v-if="newsActive===itemIndex"
                  class="news-item__hideBtn"
                  @click="newsActive= -1"
                >
                  hide
                </a>
                <a
                  v-else
                  class="news-item__btn"
                  @click="newsActive=itemIndex"
                >
                  details
                </a>
                <transition name="fade">
                  <div
                    v-if="newsActive===itemIndex"
                    class="social-btns"
                  >
                    <a
                      href="#"
                      class="social-btns__btn btn-like"
                    >
                      <img src="../../static/like.svg">
                      Like
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-facebook"
                    >
                      <img src="../../static/facebook2.svg">
                      Share
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-twitter"
                    >
                      <img src="../../static/twitter.svg">
                      Tweet
                    </a>
                    <a
                      href="#"
                      class="social-btns__btn btn-linkedin"
                    >
                      <img src="../../static/lnin.svg">
                      Share
                    </a>
                  </div>
                </transition>
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
              <img src="../../static/soc-4.svg">
            </a>
            <a
              href="https://t.me/BMC_chat"
              target="_blank"
              class="feed__icon"
            >
              <img src="../../static/soc-3.svg">
            </a>
            <a
              href="https://www.instagram.com/bmcirk/"
              target="_blank"
              class="feed__icon"
            >
              <img src="../../static/soc-2.svg">
            </a>
            <a
              href="https://www.youtube.com/channel/UCIUrtrAOxnFlSaVCPF3vdhQ/?guided_help_flow=5"
              target="_blank"
              class="feed__icon"
            >
              <img src="../../static/soc-1.svg">
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
              <a :href="inst.post_link" target="_blank">
                <img :src="inst.image">
              </a>
            </div>
          </div>
          <div class="feed__head">
            Recommended post:
          </div>
          <div
            v-for="(item, itemIndex) in recommendedArr"
            :key="itemIndex"
            class="feed__recommended recommended"
          >
            <a
              v-if="item.recommend"
              :href="'news/' + (parseInt(item.id))"
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
      </div>
    </div>
    <main-footer />
  </div>
</template>
<script>
import axios from 'axios'
import mainFooter from '~/components/footer.vue'
import aboutHead from '~/components/about.vue'
import windowScrollPosition from '~/plugins/window-scroll-position'

export default {
  components: {
    mainFooter,
    aboutHead
  },
  mixins: [windowScrollPosition('position')],
  data () {
    return {
      newsRubricsNav: true,
      newsActive: false,
      newsRubric: true,
      teachTalk: false,
      lifeStyle: false,
      searchValue: '',
      arrNews: [],
      teachTalkArr: [],
      lifeStyleArr: [],
      instArr: [],
      recommendedArr: []
    }
  },
  created () {
    axios.get('https://core.bmc.ai/news/get', {
    })
      .then((data) => {
        console.log(data)
        this.recommendedArr = data.data.lifestyle.concat(data.data.techtalk)
        this.arrNews = data.data.lifestyle.concat(data.data.techtalk)
        this.teachTalkArr = data.data.techtalk
        this.lifeStyleArr = data.data.lifestyle
        this.instArr = data.data.inst_links
      })
  },
  methods: {
    newsRubricActive () {
      this.newsRubric = true
      this.teachTalk = false
      this.lifeStyle = false
    },
    techTalkActive () {
      this.newsRubric = false
      this.teachTalk = true
      this.lifeStyle = false
    },
    lifeStyleActive () {
      this.newsRubric = false
      this.teachTalk = false
      this.lifeStyle = true
    },
    sendSearchValue () {
      axios.get('https://core.bmc.ai/news/search?value=' + this.searchValue)
        .then((response) => {
          this.newsRubricsNav = false
          this.arrNews = response.data
          if (this.arrNews !== []) {
            const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
            if (top > 0) {
              window.scrollBy(0, (-(top) + 500))
            }
          }
        })
    }
  }
}
</script>

<style lang="scss">
  .news-banner {
    background-image: url("../../static/news-banner.svg");
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
      &__items {
        margin-top: -120px;
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
        margin-top: -40px;
        margin-left: 80px;
      }
      .container {
        display: flex;
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
    &__item {
      font-family: montserratlight, sans-serif;
      font-size: 22px;
      line-height: 45px;
      letter-spacing: 0.22px;
      color: #171717;
      margin-right: 80px;
      position: relative;
      cursor: pointer;
      white-space: nowrap;
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
        object-fit: cover;
      }
    }
    &__search {
      display: flex;
      align-items: center;
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
        background-image: url("../../static/search-icon.svg");
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
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .news-content__search-results {
      font-family: montserratlight, sans-serif;
      font-size: 22px;
      line-height: 45px;
      letter-spacing: 0.22px;
      color: #171717;
  }
  @import "~@/assets/scss/media";
</style>
