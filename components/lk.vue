<template>
  <header class="header">
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
        >For investors</a>
        <a
          href="mining"
        >Mining</a>
        <a
          href="software"
        >Software</a>
        <a
          href="shop"
        >Shop</a>
      </div>
      <div class="header__panel">
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
          <div
            class="logout-dropdown__exit"
            @click="deleteAllCookies"
          >
            Logout
          </div>
        </div>
        <div v-if="userLoggedIn">
          <div
            class="header__person"
            @click="logoutDropdown = true"
          >
            <img
              :src="userImage"
            >
            {{ userLogin }}
          </div>
        </div>
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
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import { directive as onClickaway } from 'vue-clickaway'
export default {
  directives: {
    /* eslint-disable */
    onClickaway: onClickaway
    /* eslint-enable */
  },
  data () {
    return {
      dropdownLangOpen: false,
      langRU: false,
      userLogin: '',
      userEmail: '',
      userLoggedIn: false,
      logoutDropdown: false,
      userImage: ''
    }
  },
  mounted () {
    if (this.$cookies.get('token')) {
      setTimeout(() => {
        this.userLoggedIn = true
        this.userLogin = this.$store.state.user.name
        this.userEmail = this.$store.state.user.email
        this.userImage = 'https://core.bmc.ai/' + this.$store.state.user.image
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
      this.$router.push({ name: 'about' })
    }
  }
}
</script>

<style lang="scss">
  .header {
    padding: 30px 0 28px;
    font-family: montserrat, sans-serif;
    width: 100%;
    text-transform: uppercase;
    font-size: 17px;
    letter-spacing: 5.1px;
    position: relative!important;
    background-color: #222728;
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
      z-index: 100;
    }
    &__container {
      display: flex;
      flex-wrap: nowrap;
      max-width: 1660px;
      margin: 0 auto;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
    }
    &__background {
      background-color: #222728;
    }

    &__menu {
      display: flex;
      flex-wrap: nowrap;
      margin-left: auto;
      margin-right: 138px;
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
      align-items: flex-end;
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

    &__person {
      display: flex;
      align-items: flex-end;
      color: white;
      font-family: montserratlight, sans-serif;
      font-size: 14px;
      text-transform: none;
      font-weight: 100;
      letter-spacing: 0;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        margin-right: 14px;
      }
    }

    &__lang {
      position: relative;
      font-family: montserratlight, sans-serif;
      padding-left: 35px;
      cursor: pointer;
      transition: 0.3s;
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
</style>
