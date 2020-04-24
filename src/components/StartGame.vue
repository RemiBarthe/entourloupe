<template>
  <v-container class="container-start" align="center" justify="center">
    <v-card class="mx-auto" max-width="500">
      <v-card-title>
        <h2 class="display-1">Limitelimite maison</h2>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Ton nom" v-model="name" />
      </v-card-text>

      <v-card-text>
        <span class="subheading">Choisis un avatar</span>

        <v-chip-group
          v-model="avatarSelected"
          column
          active-class="primary"
          mandatory
        >
          <v-chip v-for="avatar in avatars" :key="avatar" name="avatar"
            ><v-icon>{{ avatar }}</v-icon></v-chip
          >
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn block color="primary" @click="connect" :disabled="isValid">
          Valider
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "StartGame",

  data: () => ({
    name,
    avatarSelected: "mdi-dice-6",
    avatars: [
      "mdi-account",
      "mdi-emoticon-devil",
      "mdi-emoticon-cool",
      "mdi-emoticon-sad",
      "mdi-emoticon-kiss",
      "mdi-alien",
      "mdi-apple",
      "mdi-flask",
      "mdi-baby",
      "mdi-bacteria",
      "mdi-baguette",
      "mdi-skull-crossbones",
      "mdi-basketball",
      "mdi-bat",
      "mdi-ice-cream",
      "mdi-bug",
      "mdi-cannabis",
      "mdi-jellyfish",
      "mdi-cards-heart",
      "mdi-microsoft-internet-explorer",
      "mdi-cat",
      "mdi-chess-king",
      "mdi-dice-6",
      "mdi-dice-d20"
    ]
  }),
  computed: {
    isValid() {
      if (!this.name) {
        return true;
      }
      return false;
    }
  },
  methods: {
    connect() {
      const idUser = Date.now();
      this.$store.dispatch("isConnected", {
        id: idUser,
        name: this.name,
        avatar: this.avatars[this.avatarSelected]
      });
    }
  }
};
</script>

<style scoped>
.container-start {
  height: 100vh;
  flex-flow: column wrap;
  display: flex;
  justify-content: center;
}
</style>
