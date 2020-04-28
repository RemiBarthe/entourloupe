<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title>
      <h2 class="display-1">En attente des joueurs</h2>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <p class="body-1">
        Code pour rejoindre la partie :
        <span class="font-weight-bold"> {{ currentRoom }} </span>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="isHost" color="primary" @click="startGame">
        Lancer la partie
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Waiting",

  data: () => ({}),
  computed: {
    ...mapState(["currentRoom", "isHost", "round"])
  },
  methods: {
    startGame() {
      const nextRound = this.round + 1;
      this.$store.dispatch("setRound", {
        round: nextRound,
        idRoom: this.currentRoom
      });
    }
  }
};
</script>

<style scoped>
</style>
