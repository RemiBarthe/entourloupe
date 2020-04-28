<template>
  <v-card class="mx-auto" max-width="900" v-if="!chose">
    <v-card-title>
      <h2 class="display-1">Round {{ round }}/5</h2>
    </v-card-title>

    <v-card-subtitle>
      Clique sur la réponse te semblant être la bonne
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text>
      <p class="overline">
        Attention aux mauvaises réponses
      </p>
      <p class="body-1 font-weight-bold">
        {{ actualQuestion }}
      </p>
    </v-card-text>

    <v-item-group mandatory v-model="choice">
      <v-container>
        <v-row>
          <v-col
            v-for="answer in randomizedAnswers"
            :key="answer.submittedBy"
            cols="12"
            md="4"
          >
            <v-item
              v-slot:default="{ active, toggle }"
              :value="answer.submittedBy"
            >
              <v-card
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                @click="toggle"
                height="100%"
                dark
                outlined
              >
                <v-card-text>
                  <p
                    class="text-right overline"
                    v-if="answer.submittedBy == currentUser"
                  >
                    Ta réponse
                  </p>

                  <p class="text-center body-1">
                    {{ answer.value }}
                  </p>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <v-card-actions>
      <v-btn color="primary" @click="submitChoice">
        Choisir
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="checkCurrentAnswer">
      Choisis une autre réponse que la tienne
      <v-btn color="red" text @click="checkCurrentAnswer = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>

  <v-card class="mx-auto" max-width="500" v-else>
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
  name: "Choose",

  data: () => ({
    choice: null,
    checkCurrentAnswer: false,
    randomizedAnswers: [],
    chose: false
  }),
  computed: {
    ...mapState(["currentUser", "currentRoom", "users", "round", "questions"]),
    actualQuestion() {
      return this.questions[this.round - 1].question;
    }
  },
  created() {
    let arrayAnswers = [];
    this.users.forEach(user => {
      arrayAnswers.push({ value: user.answer, submittedBy: user.id });
    });

    arrayAnswers.push({
      value: this.questions[this.round - 1].answer,
      submittedBy: "computer"
    });

    let arrayLength = arrayAnswers.length,
      i;

    while (arrayLength) {
      i = Math.floor(Math.random() * arrayLength--);
      this.randomizedAnswers.push(arrayAnswers.splice(i, 1)[0]);
    }
  },
  methods: {
    submitChoice() {
      const idUser = this.currentUser.toString();
      let scoreUser = 0;
      let winningUser = null;

      if (this.choice === "computer") {
        this.users.forEach(user => {
          if (user.id === idUser) {
            scoreUser = user.score + 2;
            winningUser = user.id;
            this.changeScore(winningUser, scoreUser);
            this.voteFor("La bonne réponse");
            this.chose = true;
          }
        });
      } else {
        this.users.forEach(user => {
          if (user.id === this.choice && user.id != idUser) {
            scoreUser = user.score + 1;
            winningUser = this.choice;
            this.changeScore(winningUser, scoreUser);
            this.voteFor(user.name);
            this.chose = true;
          } else if (user.id === this.choice && user.id === idUser) {
            this.checkCurrentAnswer = true;
          }
        });
      }
    },
    changeScore(idUser, scoreUser) {
      const idRoom = this.currentRoom.toString();

      db.collection("rooms")
        .doc(idRoom)
        .collection("users")
        .doc(idUser)
        .update({ score: scoreUser });
    },
    voteFor(name) {
      const idUser = this.currentUser.toString();
      const idRoom = this.currentRoom.toString();

      db.collection("rooms")
        .doc(idRoom)
        .collection("users")
        .doc(idUser)
        .update({ voteFor: name });
    }
  }
};
</script>

<style scoped>
</style>
