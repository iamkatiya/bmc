// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)
//
// const store = () => new Vuex.Store({
//   state: {
//     token: '',
//     user: ''
//   },
//   mutations: {
//     SET_TOKEN: (state, token) => {
//       state.token = token
//     },
//     USER_INFO: (state, user) => {
//       state.token = user
//     }
//   }
// })
//
// export default store

export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  USER_INFO (state, user) {
    state.user = user
  }
}
