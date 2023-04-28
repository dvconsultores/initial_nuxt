<template>
  <div>
    <MenuNavbar ref="menu"></MenuNavbar>
    
    <v-app-bar id="navbar" color="transparent" absolute class="isolate">
      <nuxt-link :to="localePath('/')">
        <img src="~/assets/sources/logos/logo.svg" alt="logo" style="--w: clamp(10em, 13vw, 13.414375em)">
      </nuxt-link>

      <!-- desktop -->
      <aside class="middle tcap deletemobile">
        <a
          v-for="(item, i) in dataNavbar" :key="i"
          :class="{active: item.to === $route.path}"
          @click="$router.push(localePath(item.to))">
          {{item.name}}
        </a>
      </aside>

      <!-- desktop -->
      <aside class="right deletemobile">
        <v-btn class="btn">
          <span>${{user.balance}}</span>
        </v-btn>

        <v-btn v-if="!isLogged" class="btn" @click="$store.dispatch('modalConnect')">Connect wallet</v-btn>
        
        <!-- menu login -->
        <v-menu v-else bottom offset-y nudge-bottom="10px">
          <template #activator="{ on, attrs }">
            <v-btn class="btn" v-bind="attrs" v-on="on">
              <span>{{user.accountId}}</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list class="font2" color="var(--secondary)" style="--c:#fff">
            <v-list-item-group active-class="activeClass">
              <v-list-item
                v-for="(item,i) in dataMenuLogin" :key="i"
                @click="item.key==='logout' ? $store.commit('signOut') : $router.push(localePath(key))">
                <v-list-item-title>{{item.name}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </aside>

      <!-- mobile -->
      <v-btn icon class="showmobile" @click="$refs.menu.drawer = true">
        <v-icon large>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      dataNavbar: [
        {
          name: "portfolio",
          to: "/"
        },
        {
          name: "swap",
          to: "/"
        },
        {
          name: "farm",
          to: "/"
        },
        {
          name: "pools",
          to: "/"
        },
        {
          name: "xhpot",
          to: "/"
        },
      ],
      dataMenuLogin: [
        { key:"logout", name:"Log out" },
      ],
    };
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.commit("switchTheme", theme);
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   else {this.themeButton = false}
  // },
  methods: {
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
