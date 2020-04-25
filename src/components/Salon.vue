<template>
  <v-container>
    <v-row class="text-center container-start" align="center" justify="center">
      <h1>Salon</h1>
      <p>Code pour rejoindre la partie : {{ currentRoom }}</p>
      <listUsers />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListUsers from "./ListUsers";

export default {
  name: "Salon",

  data: () => ({}),
  components: {
    ListUsers
  },
  computed: {
    ...mapState(["currentUser", "currentRoom"])
  },
  created() {
    window.addEventListener("beforeunload", this.disconnectUser);
  },
  methods: {
    disconnectUser() {
      this.$store.dispatch("disconnectUser", {
        id: this.currentUser,
        idRoom: this.currentRoom
      });
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}

.container-start {
  height: 100vh;
  flex-flow: column wrap;
}
</style>
