<template>
  <v-app>
    <v-content style="background-color:#f4f4f4">
      <room v-if="currentUser" />
      <startGame v-else />
    </v-content>
  </v-app>
</template>

<script>
import StartGame from "./components/StartGame";
import Room from "./components/Room";
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({}),
  components: {
    StartGame,
    Room
  },
  created() {},
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>
