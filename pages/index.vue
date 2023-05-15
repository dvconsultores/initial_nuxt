<template>
  <div id="home" class="divcol">
    <div v-flex.column>
      <h1 v-font:3,5="16" class="tcenter">Template detextre4</h1>
      <div v-flex.space>
        <h2 v-font:2,5="16">this is a example</h2>
        <h2 v-font:2,5="16" class="tend">just a showcase</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
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
