<template>
  <v-container>
    <v-row class="text-center container-start" align="center" justify="center">
      <h1>Limitelimite maison</h1>

      <v-form class="text-center" v-on:submit="connect">
        <v-text-field label="Ton nom" v-model="name" />

        <div class="my-2">
          <v-btn color="primary" @click="connect" :disabled="isValid"
            >Valider</v-btn
          >
        </div>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StartGame",

  data: () => ({
    name
  }),
  computed: {
    isValid() {
      if (!this.name) {
        return true;
      }
      return false;
    }
  },
  methods: {
    connect() {
      this.$store.dispatch("isConnected", this.name);
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}

.container-start {
  height: 100vh;
  flex-flow: column wrap;
}
</style>
