<template>
  <v-card dark color="#512b58" :min-height="imageHeight">
    <v-list color="#512b58" dense>
      <v-subheader>Liste des joueurs</v-subheader>
      <v-list-item-group>
        <v-list-item
          v-for="user in users"
          :key="user.id"
          :class="{ answered: user.answer }"
          inactive
          v-ripple="false"
        >
          <v-list-item-icon>
            <v-icon v-text="user.avatar"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content v-if="!showScore && user.voteFor">
            <v-list-item-content class="overline">A voté</v-list-item-content>
          </v-list-item-content>

          <v-list-item-content v-if="showScore">
            <v-list-item-content class="overline"
              >Score : {{ user.score }}</v-list-item-content
            >
          </v-list-item-content>

          <v-list-item-action v-if="isHost">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon
                  v-text="'mdi-close-box'"
                  v-on="on"
                  @click="kickUser(user.id)"
                  small
                ></v-icon>
              </template>

              <span>Kick</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  name: "ListUsers",

  data: () => ({}),
  computed: {
    ...mapState(["currentUser", "currentRoom", "users", "isHost", "showScore"]),
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100";
        case "sm":
          return "100";
        case "md":
          return "450";
        case "lg":
          return "450";
        case "xl":
          return "450";
      }
      return true;
    }
  },
  created() {},
  methods: {
    kickUser(idUser) {
      const idRoom = this.currentRoom.toString();

      db.collection("rooms")
        .doc(idRoom)
        .collection("users")
        .doc(idUser.toString())
        .delete();
    }
  }
};
</script>

<style scoped>
.answered {
  background-color: #ea9085;
}
</style>
