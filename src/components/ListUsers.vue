<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list dense>
      <v-subheader>Liste des joueurs</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-icon>
            <v-icon v-text="user.avatar"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListUsers",

  data: () => ({
    // users: []
  }),
  computed: {
    ...mapState(["currentUser"]),
    users() {
      return this.$store.getters["getAllUsers"];
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
