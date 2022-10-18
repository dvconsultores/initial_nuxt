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
    avatar: require('~/assets/sources/images/avatar.png'),
    accountId: undefined,
    username: undefined,
    email: undefined,
    discord: undefined,
    instagram: undefined,
    twitter: undefined,
    telegram: undefined,
    user: false,
    tier: 2,
    balance: 0,
    dataSocial: [],
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
      state.dataUser.banner = data.banner ? this.$axios.defaults.baseURL+data.banner : undefined;
      state.dataUser.avatar = data.avatar ? this.$axios.defaults.baseURL+data.avatar : require('~/assets/sources/images/avatar.png');
      state.dataUser.username = data.username;
      state.dataUser.email = data.email;
      state.dataUser.bio = data.bio;
      // find socials
      const [...arrSocials] = Object.entries(data)
      .filter(arr =>
        arr[0] === 'telegram' && arr[1] || arr[0] === 'discord' && arr[1]
        || arr[0] === 'instagram' && arr[1] || arr[0] === 'twitter' && arr[1])
      // set socials accounts
      arrSocials.forEach(arr => { state.dataUser[arr[0]] = arr[1] })
      // transform in object to push
      const socials = Object.fromEntries(arrSocials)
      Object.entries(socials).forEach(arr => {
        if (arr[0] === "telegram") {
          // telegram
          arr[1] = `https://t.me/${socials.telegram}`
        } else if (arr[0] === "discord") {
          // discord
          arr[1] = `https://discord.com/channels/${socials.discord}`
        } else if (arr[0] === "instagram") {
          // instagram
          arr[0] = 'mdi-instagram'
          arr[1] = `https://instagram.com/${socials.instagram}`
        } else if (arr[0] === "twitter") {
          // twitter
          arr[0] = 'mdi-twitter'
          arr[1] = `https://twitter.com/${socials.twitter}`
        }
        // push data socials
        state.dataUser.dataSocial.push({ icon: arr[0], link: arr[1] })
      })
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
  async getData({commit}) {
    try {
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      wallet = new WalletConnection(near);
      // get data user
      commit("setData", wallet.getAccountId()); /*  -->   if use only smart contract */
      /*           if use smart contract + backend            */
      // this.$axios.post(`${this.$axios.defaults.baseURL}api/v1/get-perfil-data/`, { "wallet": wallet.getAccountId() })
      // .then(fetch => {
      //   // set data profile
      //   fetch.data[0] ? commit("setData", fetch.data[0]) : commit("setData", wallet.getAccountId());
      // // catch error django
      // }).catch(error => {
      //   this.$alert("cancel", {desc: error.message})
      //   console.error(error);
      // })
    // catch error near
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
