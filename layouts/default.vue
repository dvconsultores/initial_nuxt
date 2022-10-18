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
    // get data profile
    this.$store.dispatch("getData");
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
  },
}
</script>

<style src="~/assets/styles/layouts/default.scss" lang="scss" />
