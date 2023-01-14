<template>
  <v-app>
    <Alerts ref="alerts" />
    <ModalsConfirmMsg ref="confirmMsg" />
    <ModalsConnect ref="connect" />
    <nuxt data-nuxt="childs" />
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
}
</script>
