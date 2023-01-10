export default {
  // under testing
  data() {
    return {
      rules: {
        required: [(v) => !!v || "Field required"],
        email: [
          (v) => !!v || "Field required",
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    }
  },
  // under testing
  computed: {
    baseDomainUrl() {
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
