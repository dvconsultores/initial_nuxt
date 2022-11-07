<template>
  <div id="home" class="divcol">
    <h1 class="hover_split maxsize_w">WHO ARE YOU?
      <span class="mask"><span>WHO ARE YOU?</span></span>
      <span class="mask"><span>WHO ARE YOU?</span></span>
    </h1>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "HomePage",
  mixins: [computeds],
  data() {
    return {
    }
  },
  head() {
    const title = 'Home';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/index.scss" lang="scss" />
