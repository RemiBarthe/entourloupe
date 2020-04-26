<template>
  <v-container>
    <v-row class="container-start">
      <v-navigation-drawer permanent absolute>
        <listUsers />
      </v-navigation-drawer>

      <v-container v-if="!round" class="container-room">
        <v-card class="mx-auto" max-width="500">
          <v-card-title>
            <h2 class="display-1">En attente des joueurs</h2>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <p class="body-1">
              Code pour rejoindre la partie :
              <span class="font-weight-bold"> {{ currentRoom }} </span>
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="isHost" color="primary" @click="startGame">
              Lancer la partie
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>

      <v-container v-else class="container-room">
        <question />
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListUsers from "./ListUsers";
import Question from "./Question";

export default {
  name: "Room",

  data: () => ({}),
  components: {
    ListUsers,
    Question
  },
  computed: {
    ...mapState(["currentUser", "currentRoom", "isHost", "round"])
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
