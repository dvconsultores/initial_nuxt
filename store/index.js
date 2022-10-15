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
    banner: undefined,
    avatar: undefined,
    accountId: undefined,
    user: false,
  },
});

export const mutations = {
  switchTheme(state, theme) {
    // theme
    state.theme = theme
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme;
    // overlay
    if (theme === "light") { state.overlay.opacity = 0.2; state.overlay.color = "white" }
    else { state.overlay.opacity = 0.5; state.overlay.color = "black" }
  },
  setData(state, data) {
    if (wallet.isSignedIn() && typeof data === 'string') {
      state.dataUser.accountId = data;
      state.dataUser.user = true;
    } else if (wallet.isSignedIn() && typeof data === 'object') {
      state.dataUser.accountId = data.wallet;
      state.dataUser.banner = this.$axios.defaults.baseURL+data.banner;
      state.dataUser.avatar = this.$axios.defaults.baseURL+data.avatar;
      state.dataUser.user = true;
    };
  },
  signIn() {
    wallet.requestSignIn(
      'contract.nearbase.testnet'
    );
  },
  signOut(state) {
    wallet.signOut();
    state.dataUser.user = false;
    this.$router.push(this.localePath('/'));
  },
};

export const actions = {
  async getData({commit}, {fetch, get} = {}) {
    try {
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      wallet = new WalletConnection(near);
      
      if (get === "wallet") {
        // return near wallet
        return wallet.getAccountId();
      } else {
        // set data profile
        commit("setData", wallet.getAccountId()); // if use only smart contract
        // fetch.data[0].wallet ? commit("setData", fetch.data[0]) : commit("setData", wallet.getAccountId()); // if use smart contract + backend
      }
    } catch (error) {
      this.$alert("cancel", {desc: error.message})
      console.error(error);
    }
  },
};

export const getters = {
};

export const modules = {
};
