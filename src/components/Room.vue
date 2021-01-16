<template>
  <v-item-group dark>
    <v-container>
      <v-row class="container-cosmos">
        <v-col md="3" cols="12">
          <listUsers />
        </v-col>

        <v-col md="9" cols="12">
          <template v-if="!round">
            <waiting />
          </template>

          <template v-else>
            <template v-if="!allAnswered">
              <question />
            </template>

            <template v-else>
              <template v-if="!allChoseAnswer">
                <choose />
              </template>

              <template v-else>
                <score />
              </template>
            </template>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { mapState } from "vuex";
import Question from "./Question";
import Waiting from "./Waiting";
import Choose from "./Choose";
import Score from "./Score";
import listUsers from "./ListUsers";

export default {
  name: "Room",

  data: () => ({}),
  components: {
    Question,
    Waiting,
    Choose,
    Score,
    listUsers
  },
  computed: {
    ...mapState(["currentUser", "currentRoom", "round", "users"]),
    allAnswered() {
      let answered = true;
      this.users.forEach(user => {
        if (!user.answer) {
          answered = false;
        }
      });
      return answered;
    },
    allChoseAnswer() {
      let chose = true;
      this.users.forEach(user => {
        if (!user.voteFor) {
          chose = false;
        }
      });
      return chose;
    }
  },
  created() {
    window.addEventListener("beforeunload", this.disconnectUser);
  },
  methods: {
    startGame() {
      const nextRound = this.round + 1;
      this.$store.dispatch("setRound", {
        round: nextRound,
        idRoom: this.currentRoom
      });
    },
    disconnectUser() {
      this.$store.dispatch("disconnectUser", {
        id: this.currentUser,
        idRoom: this.currentRoom
      });
      return true;
    }
  }
};
</script>

<style scoped>
.container-cosmos {
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
