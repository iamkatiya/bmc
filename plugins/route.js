export default ({ app }) => {
  app.router.afterEach((to, from) => {
    axios.get('/api/user', { headers: { Authorization: 'Bearer ' + this.$cookies.get('token') } })
      .then((response) => {
        this.$store.commit('USER_INFO', response.data)
      })
      .catch((error) => {
        if (error.response.data.message === 'Unauthenticated.') {
          this.errors = []
          this.unautorization = 'ERROR: Invalid email or password.'
        }
      })
  })
}
