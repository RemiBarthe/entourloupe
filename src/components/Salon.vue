<template>
  <v-container>
    <v-row class="text-center container-start" align="center" justify="center">
      <h1>Salon</h1>
      <p>{{ currentUser }}</p>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Salon",

  data: () => ({}),
  computed: {
    ...mapState(["currentUser"])
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
