<template>
  <v-container>
    <v-row class="container-start">
      <v-navigation-drawer permanent absolute>
        <listUsers />
      </v-navigation-drawer>

      <template v-if="!round">
        <v-container v-if="!round" class="container-room">
          <waiting />
        </v-container>
      </template>

      <template v-else>
        <template v-if="!allAnswered">
          <v-container class="container-room">
            <question />
          </v-container>
        </template>

        <template v-else>
          <v-container v-if="!allChoseAnswer" class="container-room">
            <choose />
          </v-container>

          <v-container v-else-if="allChoseAnswer" class="container-room">
            <score />
          </v-container>
        </template>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListUsers from "./ListUsers";
import Question from "./Question";
import Waiting from "./Waiting";
import Choose from "./Choose";
import Score from "./Score";

export default {
  name: "Room",

  data: () => ({}),
  components: {
    ListUsers,
    Question,
    Waiting,
    Choose,
    Score
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
h1 {
  margin-bottom: 50px;
}

.container-room {
  margin-left: 256px;
}
</style>
