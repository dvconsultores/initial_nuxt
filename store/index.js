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
  },
});

export const mutations = {
  switchTheme(state, theme) {state.theme = theme},
  overlayMethod(state, theme) {
    if (theme === "dark") {state.overlay.opacity = "0.5"; state.overlay.color = "black"}
    if (theme === "light") {state.overlay.opacity = "0.2"; state.overlay.color = "white"}
  },
  getData(state) {
    if (wallet.isSignedIn()) {
      state.dataUser.user = true;
      state.dataUser.accountId = wallet.getAccountId();
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
  switchTheme({commit}, theme) {
    document.getElementById("theme").href = `/themes/${theme}/theme.css`;
    localStorage.setItem("theme", theme);
    commit("switchTheme", theme)
  },
  async InicializeNear({commit}, consult) {
    try {
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      wallet = new WalletConnection(near);
      
      if (consult) {
        return wallet.getAccountId();
      } else {
        commit( "getData");
      }
    } catch (error) {
      this.$alert("cancel", {desc: error.message})
      console.error(error.message);
    }
  },
};

export const getters = {
};

export const modules = {
};
