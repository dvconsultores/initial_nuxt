<template>
  <v-dialog v-model="modalConnect" content-class="modal-connect">
    <v-btn class="btn activeBtn" :ripple="false" @click="$store.commit('signIn', 'near')">near wallet</v-btn>
    <v-btn class="btn activeBtn" :ripple="false" @click="$store.commit('signIn', 'myNear')">my near wallet</v-btn>
  </v-dialog>
</template>

<script>
export default {
  name: "ConnectModal",
  data() {
    return {
      modalConnect: false,
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss">
.modal-connect {
  @include card;
  --min-w: 330px;
  --w: max-content;
  --br: 30px;
  --bg: #272727;
  --p: 40px;
  --tt: capitalize;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  gap: 30px;

  .v-btn {
    --fs: 20px;
    --w: 100%;
    --min-h: 50px;
  }
}
</style>
