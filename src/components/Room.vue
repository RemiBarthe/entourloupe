<template>
  <v-container>
    <v-row class="container-start">
      <v-navigation-drawer permanent absolute>
        <listUsers />
      </v-navigation-drawer>

      <v-container class="container-room">
        <v-card class="mx-auto" max-width="500">
          <v-card-title>
            <h2 class="display-1">En attente des joueurs</h2>
          </v-card-title>

          <v-card-text>
            <p>Code pour rejoindre la partie : {{ currentRoom }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="isHost" color="primary" @click="startGame">
              Lancer la partie
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListUsers from "./ListUsers";

export default {
  name: "Room",

  data: () => ({}),
  components: {
    ListUsers
  },
  computed: {
    ...mapState(["currentUser", "currentRoom", "isHost"])
  },
  created() {
    window.addEventListener("beforeunload", this.disconnectUser);
  },
  methods: {
    startGame() {},
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
