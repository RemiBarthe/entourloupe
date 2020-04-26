<template>
  <v-container>
    <v-row class="container-start">
      <v-navigation-drawer permanent absolute>
        <listUsers />
      </v-navigation-drawer>

      <v-container v-if="!round" class="container-room">
        <waiting />
      </v-container>

      <v-container v-else-if="round && !allAnswered" class="container-room">
        <question />
      </v-container>

      <v-container v-else-if="round && allAnswered" class="container-room">
        <p>Coucou</p>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListUsers from "./ListUsers";
import Question from "./Question";
import Waiting from "./Waiting";

export default {
  name: "Room",

  data: () => ({}),
  components: {
    ListUsers,
    Question,
    Waiting
  },
  computed: {
    ...mapState(["currentUser", "currentRoom", "isHost", "round", "users"]),
    allAnswered() {
      let answered = true;
      this.users.forEach(user => {
        if (!user.answer) {
          answered = false;
        }
      });
      return answered;
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
