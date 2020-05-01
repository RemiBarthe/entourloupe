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
        Séduire... ? Tromper… ? Bluffer… ? Tous ces mots semblent similaires
        mais lequel d’entre vous y arrivera le mieux ? Bien entendu, on
        récompense les personnes cultivées pour ne pas faire de jaloux !
        <br />
        <br />
        Comment jouer au jeu : Le jeu se déroule en 5 rounds, alors attention ça
        peut aller très vite ! Tous les coups sont permis… Ou presque ! Lisez
        les questions. Inventez une réponse. Convaincre les autres que votre
        réponse est la bonne afin qu’ils puissent voter pour celle-ci. Voter
        pour la véritable réponse qui se cache parmi toutes les réponses.
        Remporter la partie.
        <br />
        <br />
        Résultat : si des joueurs votent pour la réponse que tu as créée… C’est
        gagné ! (+1 point) De plus si jamais toi tu votes pour la bonne réponse
        ! Alors là, c’est le JACKPOOT ! À chaque fois que tu votes pour une
        bonne réponse tu gagnes deux points bonus pour récompenser ton
        intelligence supérieure ! Victoire : Le joueur ayant le plus de points
        gagne la partie ! Alors, prépare-toi à séduire, tromper et bluffer si
        jamais tu veux être le grand vainqueur !
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
