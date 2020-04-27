<template>
  <v-card class="mx-auto" max-width="900">
    <v-card-title>
      <h2 class="display-1">Question {{ round }}/5</h2>
    </v-card-title>

    <v-card-subtitle>
      Récapitulatif des scores
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="choices"
        hide-default-footer
      ></v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="isHost" color="primary" @click="nextRound">
        Passer à la prochaine manche
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
      { text: "A voté pour", value: "chose", sortable: false }
    ],
    choices: []
  }),
  computed: {
    ...mapState(["currentRoom", "isHost", "round", "users"])
  },
  created() {
    this.$store.dispatch("setShowScore", true);
    this.users.forEach(user => {
      this.choices.push({ name: user.name, chose: user.voteFor });
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
    }
  }
};
</script>

<style scoped>
</style>
