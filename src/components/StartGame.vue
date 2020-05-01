<template>
  <v-container class="container-start">
    <h1 class="text-center titre-cosmos">COSMOS</h1>

    <v-card class="mx-auto" max-width="500" dark color="#512b58">
      <v-card-title>
        <h2 class="headline">Créer ou rejoindre une partie</h2>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          label="Ton nom"
          v-model="nameUser"
          maxlength="20"
          counter="20"
        />
      </v-card-text>

      <v-card-text>
        <v-text-field label="Code de la partie à rejoindre" v-model="idRoom" />
      </v-card-text>

      <v-card-text>
        <span class="subheading">Choisis un avatar</span>

        <v-chip-group
          v-model="avatarSelected"
          column
          color="white"
          mandatory
          class="avatar-group"
        >
          <v-chip
            v-for="avatar in avatars"
            :key="avatar"
            name="avatar"
            class="chip-cosmos"
            ><v-icon>{{ avatar }}</v-icon></v-chip
          >
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          block
          color="#ea9085"
          @click="joinRoom"
          :disabled="!isValid"
          elevation="0"
        >
          Créer partie
        </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn
          block
          color="#ea9085"
          @click="joinRoom"
          :disabled="!isValidRoom"
          elevation="0"
        >
          Rejoindre partie
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { Avatars } from "../assets/avatars.js";

export default {
  name: "StartGame",

  data: () => ({
    nameUser: null,
    idRoom: null,
    avatarSelected: null,
    idUser: Date.now(),
    avatars: Avatars
  }),
  computed: {
    isValid() {
      if (this.nameUser && !this.idRoom) {
        if (this.nameUser.trim()) {
          return true;
        }
      }
      return false;
    },
    isValidRoom() {
      if (this.nameUser && this.idRoom) {
        if (this.nameUser.trim() && this.idRoom.trim()) {
          return true;
        }
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
        idRoom: this.idRoom ? this.idRoom : this.idUser,
        isHost: !this.idRoom
      });

      if (!this.idRoom) {
        this.$store.dispatch("setQuestions", this.idUser);
      } else {
        this.$store.dispatch("getQuestions", this.idRoom);
      }
    }
  }
};
</script>

<style scoped>
.container-start {
  min-height: 100vh;
  flex-flow: column wrap;
  display: flex;
  justify-content: center;
}
.titre-cosmos {
  color: #fff;
  font-size: 5rem;
  letter-spacing: 2.6rem;
  text-indent: 2.6rem;
  font-family: Teko, sans-serif;
  text-shadow: 8px 8px #000;
  text-transform: uppercase;
}

.chip-cosmos {
  background-color: #512b58 !important;
}

.avatar-group /deep/ .v-slide-group__content {
  justify-content: space-between;
}
</style>
