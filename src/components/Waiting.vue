<template>
  <v-card dark color="#512b58">
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

    <v-card-text>
      <p class="body-1">
        Les règles du jeu sont praesent at pretium diam. Pellentesque
        consectetur risus tellus, quis elementum quam rutrum ut. Mauris vel
        scelerisque turpis. Quisque tempor varius sagittis. Aliquam sagittis ac
        nulla ultrices egestas. Praesent gravida magna non turpis malesuada
        sagittis. Vestibulum elit arcu, venenatis ac dignissim et, bibendum a
        mauris.
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="isHost"
        color="#ea9085"
        @click="startGame"
        :disabled="!isValid"
        elevation="0"
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
  color: #ea9085;
}
</style>
