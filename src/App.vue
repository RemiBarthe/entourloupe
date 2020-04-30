<template>
  <v-app>
    <v-content style="background-color:#2C003E">
      <vue-particles
        color="#FFA372"
        :particleOpacity="0.7"
        :particlesNumber="110"
        shapeType="circle"
        :particleSize="3"
        linesColor="#FFA372"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.3"
        :linesDistance="100"
        :moveSpeed="1"
        :hoverEffect="false"
        :clickEffect="false"
        clickMode="false"
      >
      </vue-particles>
      <room class="container-center" v-if="currentUser" />
      <startGame class="container-center" v-else />
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

<style scoped>
.container-center {
  position: absolute;
  top: 0;
  max-width: 100%;
  height: 100vh;
}
</style>