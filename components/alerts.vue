<template>
  <div id="alerts">
    <v-snackbar
      v-for="(item,i) in dataAlerts" :key="i"
      v-model="item.model"
      centered top
      transition="slide-Y-reverse-transition"
      :style="`--color-snackbar: ${item.color}`"
    >
      <!-- <v-icon :style="`color: ${item.color} !important`" size="2.5rem">{{ item.icon }}</v-icon> -->
      <img :src="require(`~/assets/sources/icons/${item.icon}.svg`)" :alt="`${item.key} Icon`">
      <div class="divcol">
        <h3 v-if="item.title_default" class="font1">{{$t(item.title_default)}}</h3>
        <h3 v-else class="font1">{{item.title}}</h3>
        <p v-if="item.desc_default" class="font2 p">{{$t(item.desc_default)}}</p>
        <p v-else class="font2 p">{{item.desc}}</p>
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
    GenerateAlert(key, title, desc) {
      // create alert
      let alert = {};
      if (title && desc) {
        alert = {
          key,
          title,
          desc,
          // icon: key === 'success' ? 'mdi-check-circle' : key === 'cancel' ? 'mdi-close-circle' : null,
          icon: key === 'success' ? 'success' : key === 'cancel' ? 'cancel' : null,
          color: key === 'success' ? '#A4FDDF' : key === 'cancel' ? 'rgb(200, 0, 0)' : null,
          model: true,
        }
      } else if (title) {
        alert = {
          key,
          title,
          desc_default: `text${key.replace(/^\w/, (c) => c.toUpperCase())}`,
          // icon: key === 'success' ? 'mdi-check-circle' : key === 'cancel' ? 'mdi-close-circle' : null,
          icon: key === 'success' ? 'success' : key === 'cancel' ? 'cancel' : null,
          color: key === 'success' ? '#A4FDDF' : key === 'cancel' ? 'rgb(200, 0, 0)' : null,
          model: true,
        }
      } else if (desc) {
        alert = {
          key,
          title_default: key,
          desc,
          // icon: key === 'success' ? 'mdi-check-circle' : key === 'cancel' ? 'mdi-close-circle' : null,
          icon: key === 'success' ? 'success' : key === 'cancel' ? 'cancel' : null,
          color: key === 'success' ? '#A4FDDF' : key === 'cancel' ? 'rgb(200, 0, 0)' : null,
          model: true,
        }
      } else {
        alert = {
          key,
          title_default: key,
          desc_default: `text${key.replace(/^\w/, (c) => c.toUpperCase())}`,
          // icon: key === 'success' ? 'mdi-check-circle' : key === 'cancel' ? 'mdi-close-circle' : null,
          icon: key === 'success' ? 'success' : key === 'cancel' ? 'cancel' : null,
          color: key === 'success' ? '#A4FDDF' : key === 'cancel' ? 'rgb(200, 0, 0)' : null,
          model: true,
        }
      };
      this.dataAlerts.push(alert);
      // clear alerts
      setTimeout(() => {
        this.dataAlerts.splice(this.dataAlerts.shift(), 0)
      }, 5000);
    },
  }
};
</script>

<style src="~/assets/styles/components/alerts.scss" lang="scss" />
