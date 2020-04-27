<template>
  <v-card class="mx-auto" max-width="900">
    <v-card-title>
      <h2 class="display-1">Question {{ round }}/5</h2>
    </v-card-title>

    <v-card-text>
      <p class="overline">
        Attention aux mauvaises réponses
      </p>
      <p class="body-1 font-weight-bold">
        {{ actualQuestion }}
      </p>
    </v-card-text>

    <v-item-group mandatory>
      <v-container>
        <v-row>
          <v-col
            v-for="answer in answers"
            :key="answer.submitedBy"
            cols="12"
            md="4"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                :color="active ? 'primary white--text' : ''"
                class="d-flex align-center"
                @click="toggle"
                min-height="50px"
              >
                <div class="body-1 flex-grow-1 text-center">
                  {{ answer.value }}
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <v-card-text>
      <p class="overline">
        Clique sur la réponse te semblant être la bonne
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary">
        Choisir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Choose",

  data: () => ({}),
  computed: {
    ...mapState(["users", "round", "questions"]),
    actualQuestion() {
      return this.questions[this.round].question;
    },
    answers() {
      let arrayAnswers = [];
      this.users.forEach(user => {
        arrayAnswers.push({ value: user.answer, submitedBy: user.id });
      });

      arrayAnswers.push({
        value: this.questions[this.round].answer,
        submitedBy: "computer"
      });

      let randomizedArray = [],
        arrayLength = arrayAnswers.length,
        i;

      while (arrayLength) {
        i = Math.floor(Math.random() * arrayLength--);
        randomizedArray.push(arrayAnswers.splice(i, 1)[0]);
      }

      return randomizedArray;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
