<template>
  <v-card class="mx-auto" max-width="900" v-if="!answered">
    <v-card-title>
      <h2 class="headline">Round {{ round }}/5</h2>
    </v-card-title>

    <v-card-subtitle>
      Invente la meilleure réponse possible pour que les autres votent pour toi
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text>
      <p class="overline">
        Question :
      </p>
      <p class="body-1 font-weight-bold">
        {{ actualQuestion }}
      </p>
    </v-card-text>

    <v-card-text>
      <v-textarea
        v-model="answer"
        auto-grow
        counter="160"
        maxlength="160"
        label="Votre réponse"
      ></v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="submitAnswer" :disabled="!isValid">
        Valider votre réponse
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="mx-auto" max-width="900" v-else>
    <v-card-title>
      <h2 class="headline">Round {{ round }}/5</h2>
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
      if (this.round > 0 && this.questions) {
        return this.questions[this.round - 1].question;
      }
      return "Chargement ..";
    },
    isValid() {
      if (this.answer) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.$store.dispatch("setShowScore", false);
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
