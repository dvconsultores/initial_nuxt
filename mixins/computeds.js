export default {
  computed: {
    baseUrl() {
      return this.$axios.defaults.baseURL
    },
    isLogged() {
      return this.$wallet.isSignedIn()
    },
    user() {
      return this.$store.state.dataUser
    },
  }
}
