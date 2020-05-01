<template>
  <v-card dark max-width="900" color="#512b58">
    <v-card-title>
      <h2 class="display-1">En attente des joueurs</h2>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <p class="body-1">
        Code pour rejoindre la partie :
        <span class="font-weight-bold join-numbers"> {{ currentRoom }} </span>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="isHost"
        color="#ffa372"
        @click="startGame"
        :disabled="!isValid"
      >
        Lancer la partie
      </v-btn>
    </v-card-actions>

    <v-card-text v-if="!isValid">
      <p class="overline">
        Minimum 2 joueurs pour commencer
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Waiting",

  data: () => ({}),
  computed: {
    ...mapState(["currentRoom", "isHost", "round", "users"]),
    isValid() {
      if (this.users.length > 1) {
        return true;
      }

      return false;
    }
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
.join-numbers {
  color: #ffa372;
}
</style>
