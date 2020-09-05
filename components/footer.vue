<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__nav">
        <div class="footer__col contacts">
          <p>Contact Us</p>
          <div class="contacts__row">
            <a
              class="contacts__item"
              href="https://t.me/BMCru"
            >
              <img src="../static/telegram.svg">
            </a>
            <a
              class="contacts__item"
              href="https://wa.me/89242907575"
            >
              <img src="../static/wa.svg">
            </a>
            <a
              class="contacts__item"
              href="tel:89242907575"
            >
              <img src="../static/phone.svg">
            </a>
            <a
              class="contacts__item"
              href="tel:89242907575"
            >
              + 7 (924) 290-75-75
            </a>
          </div>
          <div class="contacts__row">
            <a
              class="contacts__item"
              href="#"
            >
              <img src="../static/mail.svg">
            </a>
            <a
              class="contacts__item"
              href="mailto:sales@bmc.ai"
            >
              sales@bmc.ai
            </a>
          </div>
          <div class="contacts__row">
            <nuxt-link :to="{path: '/contacts', hash: 'address'}">
              Lake Baikal, Irkutsk
            </nuxt-link>
          </div>
        </div>
        <div class="footer__col">
          <p>Social Contacts</p>
          <div class="contacts__row">
            <a
              href="https://www.facebook.com/pg/Baikal-Mining-Company-102531598212684/posts/?ref=page_internal"
              target="_blank"
            >
              Facebook
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="https://www.youtube.com/channel/UCIUrtrAOxnFlSaVCPF3vdhQ/?guided_help_flow=5"
              target="_blank"
            >
              Youtube
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="#"
            >
              Follow Us
            </a>
          </div>
          <div class="contacts__row network">
            <a
              class="network__item"
              href="https://www.facebook.com/pg/Baikal-Mining-Company-102531598212684/posts/?ref=page_internal"
              target="_blank"
            >
              <img src="../static/facebook.svg">
            </a>
            <a
              class="network__item"
              href="https://t.me/BMC_chat"
            >
              <img src="../static/telegram-thin.svg">
            </a>
            <a
              class="network__item"
              href="https://www.instagram.com/bmcirk/"
              target="_blank"
            >
              <img src="../static/instagram.svg">
            </a>
            <a
              class="network__item"
              href="https://www.youtube.com/channel/UCIUrtrAOxnFlSaVCPF3vdhQ/?guided_help_flow=5"
              target="_blank"
            >
              <img src="../static/youtube.svg">
            </a>
          </div>
        </div>
        <div class="footer__col">
          <p>Our Company</p>
          <div class="contacts__row">
            <a
              href="about"
            >
              About us
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="investment"
            >
              For Investors
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="software"
            >
              Software Development
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="mining"
            >
              Mining Solutions
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="shop"
            >
              Shop
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="news"
            >
              News
            </a>
          </div>
        </div>
        <div class="footer__col">
          <p>Legal</p>
          <div class="contacts__row">
            <a
              href="#"
            >
              Terms & Conditions
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="policy"
              target="_blank"
            >
              Privacy Policy
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="contacts"
            >
              Help
            </a>
          </div>
          <div class="contacts__row">
            <a
              href="contacts"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <div class="footer__copyright">
        Copyright@BMC2020
      </div>
    </div>
  </footer>
</template>

<script>
</script>

<style lang="scss">
  .footer {
    background-color: #303030;
    color: white;
    padding: 50px 10px 25px;
    @media (max-width: 1030px) {
      padding: 20px 35px;
    }
    @media (max-width: 410px) {
      padding: 20px 15px;
    }
  &__nav {
     display: flex;
     justify-content: space-between;
     padding-right: 360px;
     @media (max-width: 1030px) {
       flex-wrap: wrap;
     }
   }
  &__col {
    a {
      display: block;
      color: white;
      text-decoration: none;
      font-family: montserratlight, sans-serif;
      font-weight: 600;
      opacity: 0.8;
      transition: 0.3s;
      &:hover {
         opacity: 1;
       }
      @media (max-width: 1030px) {
        font-size: 14px;
      }
    }
    &:first-child {
      @media (max-width: 1030px) {
        flex: 100%;
        margin-bottom: 50px;
      }
    }
    &:nth-child(2) {
      @media (max-width: 1030px) {
        flex: 100%;
        order: 4;
        margin-top: 50px;
      }
    }
    &:nth-child(3) {
      @media (max-width: 1030px) {
        flex: 50%;
      }
    }
    &:last-child {
      @media (max-width: 1030px) {
        flex: 30%;
      }
      @media (max-width: 370px) {
        flex: 35%;
      }
      @media (max-width: 350px) {
        flex: 50%;
        padding-left: 7px;
      }
    }
  }
  &__copyright {
     width: 100%;
     display: flex;
     justify-content: center;
     font-family: montserratlight, sans-serif;
     font-size: 14px;
     padding-top: 67px;
   }
}
.contacts {
  &__row {
     display: flex;
     align-items: flex-start;
     margin-top: 20px;
      @media (max-width: 1030px) {
        margin-top: 15px;
        align-items: center;
      }
   }
  &__item {
     margin: 0 7px;
    img {
      filter: contrast(0.7);
      width: 26px;
      height: 24px;
    }
    &:hover {
      img {
       filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.9));;
      }
    }
  &:first-child {
     margin-left: 0;
   }
  }
  p {
    @media (max-width: 1030px) {
      text-align: center;
    }
  }
}
.network {
  &__item {
     margin: 0 13px;
     img {
      transition: 0.3s;
      filter: opacity(0.9);
    }
     &:hover {
       img {
         filter: drop-shadow(2px 4px 6px black);
       }
     }
  &:first-child {
     margin-left: 0;
   }
  }
}
@import "~@/assets/scss/media";
</style>
