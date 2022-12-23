<template>
  <v-app>
    <Alerts ref="alerts" />
    <nuxt data-nuxt="childs" />
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
}
</script>
