<template>
  <v-card class="mx-auto" max-width="500">
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
      <v-textarea auto-grow label="Votre réponse"></v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="submitAnswer">
        Valider votre réponse
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Question",

  data: () => ({}),
  computed: {
    ...mapState(["currentUser", "currentRoom", "round", "questions"]),
    actualQuestion() {
      return this.questions[this.round - 1].question;
    }
  },
  methods: {
    submitAnswer() {},
  }
};
</script>

<style scoped>
</style>
