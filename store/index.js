import * as nearAPI from 'near-api-js'
const { connect, keyStores, WalletConnection } = nearAPI
const keyStore = new keyStores.BrowserLocalStorageKeyStore()
const config = {
  networkId: "testnet",
  keyStore, 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
let wallet = null

export const state = () => ({
  theme: "light",
  overlay: { opacity: 0.2, color: "black" },
  dataUser: {
    avatar: '',
    accountId: null,
    user: false,
    tier: 3,
  },
});

export const mutations = {
  cambiarTheme(state, theme) {state.theme = theme},
  overlayMethod(state, theme) {
    if (theme === "dark") {state.overlay.opacity = "0.5"; state.overlay.color = "black"}
    if (theme === "light") {state.overlay.opacity = "0.2"; state.overlay.color = "white"}
  },
  getData(state) {
    state.dataUser.accountId = wallet.getAccountId()

    if (wallet.isSignedIn()) {
      // current conexion refused error 👇
      const url = `api/v1/profile/?wallet=${state.dataUser.accountId}`
      this.$axios.defaults.headers.common.Authorization = 'token'
      this.$axios.$get(url).then((response) => {
        // set avatar
        if (response.data[0]) {
          state.dataUser.avatar = response.data[0].avatar;
        }
      }).catch((error) => console.error(error));
    };
  },
  signIn() {
    wallet.requestSignIn(
      'contract.nearbase.testnet'
    )
  },
  isSigned(state) {
    if (wallet.isSignedIn()) {
      localStorage.setItem('auth', true)
      state.dataUser.user = true
    }
  },
  signOut(state) {
    wallet.signOut()
    localStorage.setItem('auth', false)
    state.dataUser.user = false
    this.$router.push(this.localePath({ path: '/' }))
  },
};

export const actions = {
  cambiarTheme({commit}, theme) {
    document.getElementById("theme").href = `/themes/${theme}/theme.css`;
    localStorage.setItem("theme", theme);
    commit( "cambiarTheme", theme)
  },
  async InicializeNear({commit}) {
    // connect to NEAR
    const near = await connect(config);
    // create wallet connection
    wallet = new WalletConnection(near)
    commit( "isSigned");
    commit( "getData");
  }
};

export const getters = {
};
