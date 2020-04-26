<template>
  <v-card class="mx-auto" max-width="500" v-if="!answered">
    <v-card-title>
      <h2 class="headline">Question {{ round }}/5</h2>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <p class="overline">
        Invente la meilleure réponse possible pour que les autres votent pour
        toi
      </p>
      <p class="body-1 font-weight-bold">
        {{ actualQuestion }}
      </p>
    </v-card-text>

    <v-card-text>
      <v-textarea v-model="answer" auto-grow label="Votre réponse"></v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="submitAnswer">
        Valider votre réponse
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="mx-auto" max-width="500" v-else>
    <v-card-title>
      <h2 class="headline">Question {{ round }}/5</h2>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <p class="overline">
        Merci, en attente des autres joueurs ..
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "Question",

  data: () => ({
    answered: false,
    answer: null
  }),
  computed: {
    ...mapState(["currentUser", "currentRoom", "round", "questions", "users"]),
    actualQuestion() {
      return this.questions[this.round].question;
    }
  },
  methods: {
    submitAnswer() {
      const idRoom = this.currentRoom.toString();
      const idUser = this.currentUser.toString();

      db.collection("rooms")
        .doc(idRoom)
        .collection("users")
        .doc(idUser)
        .update({ answer: this.answer });

      this.answered = true;
    }
  }
};
</script>

<style scoped>
</style>
