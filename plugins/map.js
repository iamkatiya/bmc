import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'
const settings = {
  apiKey: '',
  lang: 'en',
  coordorder: 'latlong',
  version: '2.1'
}
Vue.use(YmapPlugin, settings)
