<template>
  <header class="header header-black">
    <div class="header__container">
      <a
        href="."
      >
        <img
          class="header__logo"
          src="../static/bmc-logo.svg"
        >
      </a>
      <div class="header__menu">
        <a
          href="investment"
          :class="{ 'color-yellow': curPage==='investment' }"
        >For investors</a>
        <a
          href="mining"
          :class="{ 'color-yellow': curPage==='mining' }"
        >Mining</a>
        <a
          href="software"
          :class="{ 'color-yellow': curPage==='software' }"
        >Software</a>
        <a
          href="about"
          :class="{ 'color-yellow': curPage==='about' }"
        >About us</a>
        <a
          href="shop"
          :class="{ 'color-yellow': curPage==='shop' }"
        >Shop</a>
      </div>
      <div
        class="header__panel"
        :class="{ 'header-logged' : userLogin }"
      >
        <div
          v-if="userLogin && logoutDropdown"
          v-on-clickaway="closeLogoutDropdown"
          class="header__logout-form logout-dropdown"
        >
          <div class="logout-dropdown__avatar">
            <img
              :src="userImage"
            >
          </div>
          <div class="logout-dropdown__user-login">
            {{ userLogin }}
          </div>
          <div class="logout-dropdown__user-email">
            {{ userEmail }}
          </div>
          <a
            href="lk"
          >
            Account Settings
          </a>
          <div
            class="logout-dropdown__exit"
            @click="deleteAllCookies"
          >
            Logout
          </div>
        </div>
        <div v-if="userLoggedIn">
          <a
            class="header__person"
            @click="logoutDropdown = true"
          >
            <img
              :src="userImage"
            >
            {{ userLogin }}
          </a>
        </div>
        <a
          v-else
          @click="showSignIn"
        >Sign in</a>
        <div
          v-on-clickaway="closeLang"
          class="header__lang"
          :class="{ activeLang: dropdownLangOpen}"
          @click="dropdownLangOpen = !dropdownLangOpen"
        >
          <div
            v-if="langRU"
          >
            ru
          </div>
          <div
            v-else
          >
            en
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="dropdownLangOpen"
            class="header__lang-dropdown dropdown-lang"
          >
            <div
              class="dropdown-lang__item"
              @click="langRU = true"
            >
              <img src="../static/ru.svg">
              Русский (RU)
            </div>
            <div
              class="dropdown-lang__item"
              @click="langRU = false"
            >
              <img src="../static/en.svg">
              English (UK)
            </div>
          </div>
        </transition>
      </div>
      <div
        class="header__burger"
        @click="dropdownOpen = true"
      >
        <img src="../static/burger.svg">
      </div>
      <transition name="fade">
        <div
          v-if="dropdownOpen"
          v-on-clickaway="closeDropdown"
          class="header__dropdown dropdown-menu"
        >
          <div
            class="dropdown-menu__close"
            @click="dropdownOpen = false"
          >
            <img src="../static/close.svg">
          </div>
          <div class="dropdown-menu__item">
            <a href="investment">
              For investors
            </a>
          </div>
          <div class="dropdown-menu__item desctop-none">
            <a href="about">
              About us
            </a>
          </div>
          <div class="dropdown-menu__item desctop-none">
            <a href="shop">
              Shop
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="mining">
              Mining
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="software">
              Software Development
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="#">
              Monitoring Platform for Mining
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="#">
              ERP (Organization management system)
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="news">
              News
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="gallery">
              Gallery
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="contacts">
              Contacts
            </a>
          </div>
          <div class="dropdown-menu__item">
            <a href="workwithus">
              Join Our Team
            </a>
          </div>
          <div
            class="dropdown-menu__item lang-mobile"
          >
            <div class="lang-mobile__head">
              Lang
            </div>
            <div
              class="lang-mobile__item"
              @click="langRU = true"
            >
              <img src="../static/ru.svg">
              Русский (RU)
            </div>
            <div
              class="lang-mobile__item"
              @click="langRU = false"
            >
              <img src="../static/en.svg">
              English (UK)
            </div>
          </div>
          <div
            v-if="!userLoggedIn"
            class="dropdown-menu__item sign-in-mobile"
            @click="showSignIn"
          >
            Sign in
          </div>
          <div v-else>
            <div
              class="header__person header__person-mobile"
            >
              <img src="../static/userprofile.png">
              {{ userLogin }}
            </div>
            <div class="person-mobile">
              <a href="lk">
                Account Settings
              </a>
              <div @click="deleteAllCookies">
                Logout
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
  directives: {
    /* eslint-disable */
    onClickaway: onClickaway
    /* eslint-enable */
  },
  data () {
    return {
      dropdownOpen: false,
      dropdownLangOpen: false,
      langRU: false,
      curPage: '',
      userLogin: '',
      userEmail: '',
      userLoggedIn: false,
      logoutDropdown: false,
      userImage: ''
    }
  },
  mounted () {
    this.curPage = this.$route.name
    if (this.$cookies.get('token')) {
      setTimeout(() => {
        this.userLoggedIn = true
        this.userLogin = this.$store.state.user.name
        this.userEmail = this.$store.state.user.email
        if ((this.$store.state.user.image === undefined) || (this.$store.state.user.image === null)) {
          this.userImage = '/userprofile.png'
        } else {
          this.userImage = 'https://core.bmc.ai/' + this.$store.state.user.image
        }
      }, 500)
    }
  },
  methods: {
    closeLang () {
      this.dropdownLangOpen = false
    },
    closeDropdown () {
      this.dropdownOpen = false
    },
    showSignIn () {
      this.$parent.showCreateAcc = true
      this.dropdownOpen = false
    },
    closeLogoutDropdown () {
      this.logoutDropdown = false
    },
    deleteAllCookies () {
      const cookies = document.cookie.split(';')

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss">
  .header {
    padding: 30px 0 35px;
    font-family: montserrat, sans-serif;
    width: 100%;
    text-transform: uppercase;
    font-size: 17px;
    letter-spacing: 5.1px;
    position: fixed;
    z-index: 10;
    transition: 0.5s;
    &__logout-form {
      position: absolute;
      background: #FFFFFF;
      border-radius: 16px;
      padding: 28px 18px 23px;
      top: calc(100% + 9px);
      color: black;
      width: 300px;
      height: 290px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      left: -100px;
      cursor: auto;
    }
    &__person {
      display: flex;
      align-items: flex-end;
      color: white;
      font-family: montserratlight, sans-serif;
      font-size: 14px;
      text-transform: none;
      font-weight: 100;
      letter-spacing: 0;
      text-decoration: none;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        margin-right: 14px;
      }
    }
    &__person-mobile {
      justify-content: center;
      color: #3E3E3E;
      @media (min-width: 500px) {
        display: none;
      }
    }
    &-black {
      background-color: #222728;
    }
    &-scrolled {
      opacity: .8;
      padding: 20px 0 25px;
    }
    &__container {
      display: flex;
      flex-wrap: nowrap;
      max-width: 1660px;
      margin: 0 auto;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      @media (min-width: 1751px) {
        min-width: 1660px;
      }
    }
    &__background {
      background-color: #222728;
    }
    &__burger {
      cursor: pointer;
    }

    &__menu {
      display: flex;
      flex-wrap: nowrap;
      a {
        margin: 0 30px;
        position: relative;
        overflow-x: hidden;
        color: white;
        text-decoration: none;
        transition: 0.3s;
        &:hover {
          color: #E6B510;
        }
      }
      .color-yellow {
        color: #E6B510;
      }
    }

    &__panel {
      display: flex;
      position: relative;
      @media (max-width: 500px) {
        display: none;
      }
      a {
        transition: 0.3s;
        cursor: pointer;
        color: white;
        &:hover {
          color: #E6B510;
        }
      }
    }

    &__lang {
      position: relative;
      font-family: montserratlight, sans-serif;
      padding-left: 35px;
      cursor: pointer;
      transition: 0.3s;
      color: white;
      &:hover {
        color: #FDD754;
        &:before {
          background-color: #FDD754;
        }
      }
      &::before {
        content: '';
        position: absolute;
        width: 2px;
        height: 13px;
        top: 4px;
        left: 25px;
        background-color: white;
        transition: 0.3s;
      }
    }
    &__dropdown {
      background: transparent linear-gradient(180deg, #FFFFFF 0%, #FFFFFFCE 100%) 0% 0% no-repeat padding-box;
      border-radius: 7px;
      font-family: montserratlight, sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0;
    }
    &__lang-dropdown {
      background: #FFFFFF;
      box-shadow: 0 0 10px #00000024;
      border-radius: 8px;
    }
  }
  .dropdown-menu {
    padding: 55px 32px 40px 45px;
    width: 390px;
    position: absolute;
    right: -30px;
    z-index: 2;
    top: -30px;
    @media (max-width: 1030px) {
      top: 0;
    }
    &__close {
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
    }
    &__item {
      padding: 10px 0;
      border-bottom: 1px solid rgba(62, 62, 62, 0.4);
      &:last-child {
        border-bottom: none;
      }
      a {
        color: #3E3E3E;
        text-decoration: none;
        transition: 0.3s;
        &:hover {
          color: rgba(230, 181, 16, 1);;
        }
      }
    }
  }
  .dropdown-lang {
    position: absolute;
    padding: 15px;
    font-family: montserratlight, sans-serif;
    font-size: 13px;
    color: #3E3E3E;
    letter-spacing: 0;
    top: 30px;
    right: -50px;
    z-index: 2;
    &__item {
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        color: #252525;
        font-weight: 700;
      }
      img {
        margin-right: 15px;
      }
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .activeLang {
    color: #FDD754;
    &:before {
      background-color: #FDD754;
    }
  }
.header .header-active {
  color: #E6B510;
}
.header-logged {
  align-items: flex-end;
}
</style>
