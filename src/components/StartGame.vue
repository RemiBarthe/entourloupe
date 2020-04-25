<template>
  <v-container class="container-start" align="center" justify="center">
    <v-card class="mx-auto" max-width="500">
      <v-card-title>
        <h2 class="display-1">Jeu confinement</h2>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Ton nom" v-model="nameUser" />
      </v-card-text>

      <v-card-text>
        <v-text-field label="Code de la partie à rejoindre" v-model="idRoom" />
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
        <v-btn block color="primary" @click="joinRoom" :disabled="!isValid">
          Créer partie
        </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn block color="primary" @click="joinRoom" :disabled="!isValidRoom">
          Rejoindre partie
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "StartGame",

  data: () => ({
    nameUser: null,
    idRoom: null,
    idUser: Date.now(),
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
      if (this.nameUser && !this.idRoom) {
        return true;
      }
      return false;
    },
    isValidRoom() {
      if (this.nameUser && this.idRoom) {
        return true;
      }
      return false;
    }
  },
  methods: {
    joinRoom() {
      this.$store.dispatch("joinRoom", {
        id: this.idUser,
        name: this.nameUser,
        avatar: this.avatars[this.avatarSelected],
        idRoom: this.idRoom ? this.idRoom : this.idUser
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
