import Vue from 'vue'
import vuescroll from 'vuescroll'
Vue.use(vuescroll, {
  ops: {
    onlyShowBarOnScroll: false,
    opacity: 1
  },
  name: 'myScroll'
})
