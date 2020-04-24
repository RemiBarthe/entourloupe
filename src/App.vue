<template>
  <v-app>
    <v-content>
      <salon v-if="connected" />
      <startGame v-else />
    </v-content>
  </v-app>
</template>

<script>
import StartGame from "./components/StartGame";
import Salon from "./components/Salon";
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({}),
  components: {
    StartGame,
    Salon
  },
  created() {
    this.$store.dispatch("fetchUsers");
  },
  computed: {
    ...mapState(["connected"])
  }
};
</script>
