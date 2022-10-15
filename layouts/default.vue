<template>
  <v-app id="layout" class="relative">
    <Alerts ref="alerts"></Alerts>
    <Header ref="header" />
    <v-main :class="wrapperSpace?'with':'without'" class="parent">
      <nuxt-child />
    </v-main>
    <Footer ref="footer"></Footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  // middleware: ['authenticated'],
  data() {
    return {
      wrapperSpace: true,
    }
  },
  created() {
    // this.getData();  // if use smart contract + backend
    this.$store.dispatch("getData"); // if use only smart contract
  },
  mounted() {
    /* scroll horizontal (simple) */
    const scrollableDesktop = document.querySelectorAll('.scrollx');
    const scrollableMobile = document.querySelectorAll('.scrollxmobile');
    function scrollX(node) {
      node.forEach(el =>
        el.addEventListener("wheel", e => {
          if (node === scrollableDesktop) {
            e.preventDefault(); el.scrollLeft += e.deltaY
          } else if (node === scrollableMobile && window.innerWidth <= 880) {
            e.preventDefault(); el.scrollLeft += e.deltaY
          }
        })
      );
    }
    scrollX(scrollableDesktop);
    scrollX(scrollableMobile);
    
    /* footer height listener */
    const footerHeightListener = () => {
      const footer = document.querySelector('#footer');
      setTimeout(() => {
        document.documentElement.style.setProperty(
          '--h-footer', `${footer.getBoundingClientRect().height}px`
        );
      }, 100);
    }
    footerHeightListener();
    window.onresize = () => footerHeightListener();
  },
  methods: {
    // async getData() {
    //   const baseUrl = this.$axios.defaults.baseURL;
    //   const accountId = await this.$store.dispatch("getData", {get: "wallet"})
    //   // get data user
    //   await this.$axios.post(`${baseUrl}api/v1/get-perfil-data/`, { "wallet": accountId })
    //   .then(fetch => {
    //     this.$store.dispatch("getData", {fetch});
    //   })
    //   .catch(error => {
    //     this.$alert("cancel", {desc: error.message})
    //     console.error(error);
    //   })
    // }
  },
}
</script>

<style src="~/assets/styles/layouts/default.scss" lang="scss" />
