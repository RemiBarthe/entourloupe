<template>
  <v-card color="#512b58">
    <v-card-title>
      <h2 v-if="!gameOver" class="display-1">Round {{ round }}/5</h2>

      <h2 v-else class="display-1">Partie terminée</h2>
    </v-card-title>

    <v-card-subtitle>
      Récapitulatif des scores
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text class="green">
      <p class="body-1 white--text">
        La bonne réponse :<br />
        <span class="font-weight-bold">{{ questions[round - 1].answer }}</span>
      </p>
    </v-card-text>

    <v-card-text v-if="!gameOver">
      <p class="overline">
        {{ bestScore.user }} est en tête est avec un score de
        {{ bestScore.score }}
      </p>
    </v-card-text>

    <v-card-text class="text-center" v-else>
      <v-icon color="#ffa372" x-large>mdi-trophy-variant</v-icon>

      <p class="overline">
        Le gagnant est {{ bestScore.user }} avec un score de
        {{ bestScore.score }}
      </p>
    </v-card-text>

    <v-card-text>
      <v-data-table
        dense
        class="tab-answer"
        :headers="headers"
        :items="choices"
        hide-default-footer
      ></v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-btn
        elevation="0"
        v-if="isHost && !gameOver"
        color="#ea9085"
        @click="nextRound"
      >
        Passer à la prochaine manche
      </v-btn>

      <v-btn elevation="0" v-if="gameOver" color="#ea9085" @click="newGame">
        Nouvelle partie
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "Score",

  data: () => ({
    headers: [
      {
        text: "",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "A écrit", value: "answer", sortable: false },
      { text: "A voté pour", value: "chose", sortable: false }
    ],
    choices: []
  }),
  computed: {
    ...mapState(["currentRoom", "isHost", "round", "users", "questions"]),
    gameOver() {
      return this.round === 5 ? true : false;
    },
    bestScore() {
      let bestScore = 0;
      let bestUser = "";
      this.users.forEach(user => {
        if (user.score > bestScore) {
          bestScore = user.score;
          bestUser = user.name;
        }
      });

      return { score: bestScore, user: bestUser };
    }
  },
  created() {
    this.$store.dispatch("setShowScore", true);
    this.users.forEach(user => {
      this.choices.push({
        name: user.name,
        answer: user.answer,
        chose: user.voteFor
      });
    });
  },
  methods: {
    nextRound() {
      const idRoom = this.currentRoom.toString();

      this.users.forEach(user => {
        db.collection("rooms")
          .doc(idRoom)
          .collection("users")
          .doc(user.id)
          .update({ answer: "", voteFor: "" });
      });

      const nextRound = this.round + 1;
      this.$store.dispatch("setRound", {
        round: nextRound,
        idRoom: this.currentRoom
      });
    },
    newGame() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.tab-answer {
  background-color: #512b58;
}

.tab-answer /deep/ tbody /deep/ tr:hover:not(.v-data-table__expanded__content) {
  background: #512b58 !important;
}
</style>
