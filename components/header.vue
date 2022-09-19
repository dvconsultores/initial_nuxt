<template>
  <div>
    <MenuHeader ref="menu"></MenuHeader>
    <v-app-bar id="header" color="transparent" fixed class="font2 isolate">
      <section class="acenter gap2" style="padding-left:calc(48px + 2em">
        <aside class="sidebar divcol acenter jspace isolate" :class="{active: sidebar}">
          <v-btn icon @click="toggleFunc()">
            <img :src="require(`~/assets/sources/icons/menu${positionFocus==0||positionFocus==16?'':'-active-sidebar'}.svg`)" alt="toggle">
          </v-btn>

          <div class="focus" :style="`--distanceInitial:${initialFocus};--distance:${positionFocus}px`" />

          <v-tooltip v-for="(item,i) in dataSidebar" :key="i" right color="var(--primary)">
            <template #activator="{ on, attrs}">
              <v-btn
                v-show="sidebar" :to="localePath('/')" icon :class="{openMenuMarket: item.key==='market', active: item.active}"
                v-bind="item.active?null:attrs" v-on="item.active?null:on" @click="positionFocus=item.position;activeSidebarIcons(item)">
                <img :src="require(`~/assets/sources/icons/${item.icon}${item.active?'-active':''}.svg`)" alt="side bar icons">
              </v-btn>
            </template>

            <span class="h9_em">{{item.name}}</span>
          </v-tooltip>
        </aside>

        <v-text-field id="search" hide-details solo style="--max-w: 14.6875em;--p: 0 1.5em" class="eliminarmobile">
          <template #append>
            <img src="~/assets/sources/icons/lupa.svg" alt="search">
          </template>
        </v-text-field>
      </section>

      <v-btn icon style="--p:2.3em;" @click="$router.push(localePath('/')); $scrollTo('home')">
        <img src="~/assets/sources/icons/records.svg" alt="records" style="--bs:drop-shadow(10px 5px 12px rgba(0, 0, 0, 0.25));--w:4.5em">
      </v-btn>

      <section class="acenter gap2">
        <v-btn v-show="!user" class="btn eliminarmobile" @click="$router.push(localePath('/login'))">LOG IN WITH NEAR</v-btn>

        <!-- console.log('abrir-menu-perfil') -->
        <div :class="{acenter: user, contents: !user}" class="openMenuLogin" style="cursor:pointer;border-radius:4vmax">
          <v-btn icon @click="user?null:$router.push(localePath('/login'))">
            <img
              :src="user?$store.state.user.img:require(`~/assets/sources/icons/account.svg`)" alt="account" class="eliminarmobile aspect"
              :style="`--w:3em;${user?'--br:50%;--b:2px solid var(--clr);--p:4px':null}`">
            <img
              :src="user?$store.state.user.img:require(`~/assets/sources/icons/account-mobile.svg`)" alt="account" class="vermobile aspect"
              :style="`--w:3em;${user?'--br:50%;--b:2px solid var(--clr);--p:4px':null}`">
          </v-btn>
          <v-icon v-show="user">mdi-menu-down</v-icon>
        </div>
      </section>
    </v-app-bar>
  </div>
</template>

<script>
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

export default {
  name: "HeaderComponent",
  data() {
    return {
      accountId: null,
      user: false,
      messages: 1,
      sidebar: false,
      initialFocus: 0,
      positionFocus: 0,
      dataSidebar: [
        { key:"market", icon: "market", name:"Marketplace", position: 120, active: false },
        { key:"stats", icon: "stats", name:"stats", to:"/stats", position: 240, active: false },
        { key:"chats", icon: "chats", name:"chats", to: "/chats", position: 360, active: false },
        { key:"settings", icon: "settings", name:"settings", position: 480, active: false  },
        { key:"faq", icon: "faq", name:"faq", position: 600, active: false  },
      ]
    };
  },
  computed: {
    perfil() {return this.$store.state.user.perfil},
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.dispatch("CambiarTheme", theme);
  //       this.$store.commit('OverlayMethod', theme)
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   if (theme === "dark") {this.themeButton = false}
  // },
  mounted() {
    this.isSigned()
    this.getData()
    this.LogState();
  },
  methods: {
    activeSidebarIcons(item) {
      this.dataSidebar.forEach(e=>{e.active=false});
      setTimeout(() => {
        item.active=true
      }, 500);
    },
    toggleFunc() {
      if (window.innerWidth <= 880) {
        this.$refs.menu.drawer=true
      } else {
        this.sidebar=!this.sidebar
        this.dataSidebar.forEach(e=>{e.active=false})
        this.positionFocus=0
        if (this.sidebar === false) {this.initialFocus=0}
        else {this.initialFocus=16}
      }
    },
    // CambiarTheme(theme) {
    //   this.$store.dispatch("CambiarTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
    async getData () {
      this.account = {}
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      this.accountId= wallet.getAccountId()

      if (wallet.isSignedIn()) {
        const url = "api/v1/profile/?wallet=" + this.accountId
        this.axios.defaults.headers.common.Authorization='token'
        this.axios.get(url)
          .then((response) => {
            if (response.data[0]){
              this.avatar = response.data[0].avatar
              this.$store.commit("Avatar", this.avatar)
            }
        }).catch((error) => {
          alert(error)
        })
      }
    },
    // use for update account log states
    LogState() {
      if (JSON.parse(localStorage.getItem('auth')) === true) {this.user = true}
      else {this.user = false}
    },
    async signIn () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      wallet.requestSignIn(
        'contract.nearbase.testnet'
      )
    },
    async isSigned () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      if (wallet.isSignedIn()) {
        localStorage.setItem('auth', true)
        this.user = true
      }
    },
    async signOut () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      wallet.signOut()
      localStorage.setItem('auth', false)
      this.user = false
      this.$router.push(this.localePath({ path: '/' }))
    },
  },
};
</script>

<style src="~/assets/styles/components/header.scss" lang="scss" />
