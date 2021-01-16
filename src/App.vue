<template>
  <v-app class="bluuue">
    <vue-particles
      color="#ea9085"
      :particleOpacity="0.7"
      :particlesNumber="110"
      shapeType="circle"
      :particleSize="3"
      linesColor="#ea9085"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.3"
      :linesDistance="100"
      :moveSpeed="1"
      :hoverEffect="false"
      :clickEffect="false"
      clickMode="false"
      class="container-center"
    >
    </vue-particles>
    <v-content style="background-color:#2C003E">
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
  created() {
    document.title = "ENTOURLOUPE - Jeu multijoueur gratuit";
  },
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>

<style scoped>
.container-center {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  min-height: 100vh;
}
</style>