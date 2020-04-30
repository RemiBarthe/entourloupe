<template>
  <v-container>
    <v-row class="container-start">
      <!-- <v-navigation-drawer dark permanent absolute color="#512b58">
        <listUsers />
      </v-navigation-drawer> -->

      <template v-if="!round">
        <v-container v-if="!round">
          <waiting />
        </v-container>
      </template>

      <template v-else>
        <template v-if="!allAnswered">
          <v-container>
            <question />
          </v-container>
        </template>

        <template v-else>
          <v-container v-if="!allChoseAnswer">
            <choose />
          </v-container>

          <v-container v-else-if="allChoseAnswer">
            <score />
          </v-container>
        </template>
      </template>

      <v-container>
        <v-bottom-navigation :value="activeBtn" class="mx-auto" dark fixed>
          <v-btn>
            <span>Recents</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn>
            <span>Favorites</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn>
            <span>Nearby</span>
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Question from "./Question";
import Waiting from "./Waiting";
import Choose from "./Choose";
import Score from "./Score";

export default {
  name: "Room",

  data: () => ({}),
  components: {
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

.container-start {
  flex-flow: column;
}
</style>
