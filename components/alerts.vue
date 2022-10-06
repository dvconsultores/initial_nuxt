<template>
  <div id="alerts">
    <v-snackbar
      v-for="(item,i) in dataAlerts" :key="i"
      v-model="item.model"
      centered top
      transition="slide-Y-reverse-transition"
      :style="`--color-snackbar: ${item.color}`"
    >
      <!-- <v-icon :color="item.color" size="3.5em">{{ item.icon }}</v-icon> -->
      <img :src="require(`~/assets/sources/icons/${item.icon}.svg`)" :alt="`${item.icon} Icon`">
      <div class="divcol">
        <h3 class="font1">{{item.title === item.key ? $t(item.title) : item.title}}</h3>
        <p class="font2 p">{{item.desc === `text${item.key.replace(/^\w/, (c) => c.toUpperCase())}` ? $t(item.desc) : item.desc}}</p>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AlertsComponent",
  data() {
    return {
      dataAlerts: []
    };
  },
  methods: {
    GenerateAlert(key, title = key, desc = `text${key.replace(/^\w/, c => c.toUpperCase())}`) {
      // // construct alert
      function Alert() {
        this.key = key;
        this.title = title;
        this.desc = desc;
        // this.icon = key === 'success' ? 'mdi-check-circle' : 'mdi-close-circle'; // --> if mdi icon
        this.icon = key; // --> if img tag
        this.color = key === 'success' ? '#A4FDDF' : 'rgb(200, 0, 0)';
        this.model = true;
      }
      this.dataAlerts.push(new Alert)
      // clear alerts
      setTimeout(() => this.dataAlerts.splice(this.dataAlerts.shift(), 0), 5000);
    },
  }
};
</script>

<style src="~/assets/styles/components/alerts.scss" lang="scss" />
